import { mountItemsByLevel } from "@/const/mounts";

export interface AttributeInput {
   name: string;
   current: number;
   max: number;
}

export interface SolverItemCount {
   name: string;
   count: number;
}

export interface SolverResult {
   minFeeds: number | null;
   items: SolverItemCount[];
   impossibleReason?: string;
   tierMinLevel: number | null;
}

export interface MountItemOption {
   id: string;
   name: string;
   tierMinLevel: number;
   bonuses: number[];
}

export interface ManualFeedSelection {
   itemName: string;
   tierMinLevel: number;
}

export interface ManualSimulationStep {
   order: number;
   itemName: string;
   tierMinLevel: number;
   appliedBonuses: number[];
   totalsAfterStep: number[];
}

export interface ManualSimulationResult {
   finalValues: number[];
   totalApplied: number[];
   averageGainPerFeed: number[];
   overallAverageGainPerFeed: number;
   steps: ManualSimulationStep[];
}

const MAX_FEEDS_TO_SEARCH = 14;

function clampToNonNegativeInteger(value: number) {
   return Math.max(0, Math.floor(value));
}

function buildItemId(tierMinLevel: number, itemName: string) {
   return `${tierMinLevel}:${itemName}`;
}

export function getAllMountItems(): MountItemOption[] {
   return [...mountItemsByLevel]
      .sort((a, b) => a.minLevel - b.minLevel)
      .flatMap((group) =>
         group.items
            .map((item) => ({
               id: buildItemId(group.minLevel, item.name),
               name: item.name,
               tierMinLevel: group.minLevel,
               bonuses: item.bonuses,
            }))
            .sort((a, b) => a.name.localeCompare(b.name)),
      );
}

function getTierForMaxLevel(maxLevel: number) {
   return (
      [...mountItemsByLevel]
         .sort((a, b) => a.minLevel - b.minLevel)
         .filter((group) => group.minLevel <= maxLevel)
         .at(-1) ?? null
   );
}

function isEnough(totalBonuses: number[], requiredBonuses: number[]) {
   return requiredBonuses.every((required, index) => totalBonuses[index] >= required);
}

function searchFirstCombinationWithItemCount(itemBonuses: number[][], requiredBonuses: number[], itemCount: number) {
   const itemKinds = itemBonuses.length;
   const bonusLength = requiredBonuses.length;
   const counts = Array.from({ length: itemKinds }, () => 0);
   const totals = Array.from({ length: bonusLength }, () => 0);

   const recurse = (itemIndex: number, remainingItems: number): number[] | null => {
      if (itemIndex === itemKinds - 1) {
         const lastCount = remainingItems;
         counts[itemIndex] = lastCount;

         for (let bonusIndex = 0; bonusIndex < bonusLength; bonusIndex += 1) {
            totals[bonusIndex] += itemBonuses[itemIndex][bonusIndex] * lastCount;
         }

         const valid = isEnough(totals, requiredBonuses);

         for (let bonusIndex = 0; bonusIndex < bonusLength; bonusIndex += 1) {
            totals[bonusIndex] -= itemBonuses[itemIndex][bonusIndex] * lastCount;
         }

         return valid ? [...counts] : null;
      }

      for (let currentCount = remainingItems; currentCount >= 0; currentCount -= 1) {
         counts[itemIndex] = currentCount;

         for (let bonusIndex = 0; bonusIndex < bonusLength; bonusIndex += 1) {
            totals[bonusIndex] += itemBonuses[itemIndex][bonusIndex] * currentCount;
         }

         const found = recurse(itemIndex + 1, remainingItems - currentCount);
         if (found) {
            return found;
         }

         for (let bonusIndex = 0; bonusIndex < bonusLength; bonusIndex += 1) {
            totals[bonusIndex] -= itemBonuses[itemIndex][bonusIndex] * currentCount;
         }
      }

      return null;
   };

   return recurse(0, itemCount);
}

export function solveMountFeed(attributes: AttributeInput[], maxLevel: number): SolverResult {
   const normalizedMax = clampToNonNegativeInteger(maxLevel);
   const tier = getTierForMaxLevel(normalizedMax);

   if (!tier) {
      return {
         minFeeds: null,
         items: [],
         impossibleReason: "No item tier is available for the selected max level.",
         tierMinLevel: null,
      };
   }

   const requiredBonuses = attributes.map((attribute) => {
      const current = clampToNonNegativeInteger(attribute.current);
      const target = clampToNonNegativeInteger(attribute.max);
      return Math.max(target - current, 0);
   });

   if (requiredBonuses.every((value) => value === 0)) {
      return {
         minFeeds: 0,
         items: [],
         tierMinLevel: tier.minLevel,
      };
   }

   const itemBonuses = tier.items.map((item) => item.bonuses);

   for (let feedCount = 1; feedCount <= MAX_FEEDS_TO_SEARCH; feedCount += 1) {
      const counts = searchFirstCombinationWithItemCount(itemBonuses, requiredBonuses, feedCount);

      if (!counts) {
         continue;
      }

      const items = counts
         .map((count, index) => ({
            name: tier.items[index].name,
            count,
         }))
         .filter((entry) => entry.count > 0);

      return {
         minFeeds: feedCount,
         items,
         tierMinLevel: tier.minLevel,
      };
   }

   return {
      minFeeds: null,
      items: [],
      impossibleReason: "Not feasible: requires 15 or more items.",
      tierMinLevel: tier.minLevel,
   };
}

export function simulateManualFeedOrder(
   attributes: AttributeInput[],
   selectedItems: ManualFeedSelection[],
): ManualSimulationResult {
   const startValues = attributes.map((attribute) => clampToNonNegativeInteger(attribute.current));
   const caps = attributes.map((attribute) =>
      Math.max(clampToNonNegativeInteger(attribute.current), clampToNonNegativeInteger(attribute.max)),
   );

   const currentTotals = [...startValues];
   const totalApplied = Array.from({ length: attributes.length }, () => 0);
   const itemsById = new Map(getAllMountItems().map((item) => [buildItemId(item.tierMinLevel, item.name), item]));
   const steps: ManualSimulationStep[] = [];

   selectedItems.forEach((selection, index) => {
      const item = itemsById.get(buildItemId(selection.tierMinLevel, selection.itemName));
      if (!item) {
         return;
      }

      const appliedBonuses = item.bonuses.map((bonus, bonusIndex) => {
         const safeBonus = clampToNonNegativeInteger(bonus);
         const before = currentTotals[bonusIndex];
         const after = Math.min(caps[bonusIndex], before + safeBonus);
         const applied = Math.max(after - before, 0);
         currentTotals[bonusIndex] = after;
         totalApplied[bonusIndex] += applied;
         return applied;
      });

      steps.push({
         order: index + 1,
         itemName: item.name,
         tierMinLevel: item.tierMinLevel,
         appliedBonuses,
         totalsAfterStep: [...currentTotals],
      });
   });

   const divisor = Math.max(steps.length, 1);
   const averageGainPerFeed = totalApplied.map((value) => value / divisor);
   const overallAverageGainPerFeed = totalApplied.reduce((sum, value) => sum + value, 0) / divisor;

   return {
      finalValues: currentTotals,
      totalApplied,
      averageGainPerFeed,
      overallAverageGainPerFeed,
      steps,
   };
}
