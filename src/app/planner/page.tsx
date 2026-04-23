"use client";

import { useMemo, useState } from "react";

import { MountAttributesCard } from "@/components/mount-attributes-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mountItemsByLevel } from "@/const/mounts";
import { getFeedTimelineEstimate } from "@/lib/feed-time";
import { simulateManualFeedOrder, type AttributeInput, type MountItemOption } from "@/lib/mount-calculator";
import { Plus } from "lucide-react";

const defaultAttributes: AttributeInput[] = [
   { name: "Speed", current: 10, max: 30 },
   { name: "Acceleration", current: 10, max: 30 },
   { name: "Altitude", current: 10, max: 30 },
   { name: "Energy", current: 10, max: 30 },
   { name: "Handling", current: 10, max: 30 },
   { name: "Toughness", current: 10, max: 30 },
   { name: "Boost", current: 10, max: 30 },
   { name: "Training", current: 10, max: 30 },
];

const tierOptions = [...mountItemsByLevel].sort((a, b) => a.minLevel - b.minLevel);

export default function PlannerPage() {
   const [attributes, setAttributes] = useState(defaultAttributes);
   const [selectedTier, setSelectedTier] = useState<number>(tierOptions[0]?.minLevel ?? 1);
   const [manualPlan, setManualPlan] = useState<MountItemOption[]>([]);

   const selectedTierGroup = useMemo(
      () => tierOptions.find((group) => group.minLevel === selectedTier) ?? tierOptions[0],
      [selectedTier],
   );

   const manualSimulation = useMemo(
      () =>
         simulateManualFeedOrder(
            attributes,
            manualPlan.map((item) => ({
               itemName: item.name,
               tierMinLevel: item.tierMinLevel,
            })),
         ),
      [attributes, manualPlan],
   );

   const totalCurrent = attributes.reduce((sum, attribute) => sum + attribute.current, 0);
   const currentAverage = totalCurrent / attributes.length;

   const feedTimeline = useMemo(
      () =>
         getFeedTimelineEstimate(
            attributes.map((attribute) => Math.max(0, Math.floor(attribute.current))),
            manualSimulation.steps.map((step) => step.totalsAfterStep),
         ),
      [attributes, manualSimulation.steps],
   );

   const updateValue = (index: number, key: "current" | "max", value: string) => {
      const parsed = Number.parseInt(value, 10);
      const safeValue = Number.isNaN(parsed) ? 0 : Math.max(0, parsed);

      setAttributes((previous) =>
         previous.map((attribute, currentIndex) =>
            currentIndex === index ? { ...attribute, [key]: safeValue } : attribute,
         ),
      );
   };

   const addManualItem = (item: MountItemOption) => {
      setManualPlan((previous) => [...previous, item]);
   };

   const removeManualItem = (indexToRemove: number) => {
      setManualPlan((previous) => previous.filter((_, index) => index !== indexToRemove));
   };

   const moveManualItem = (index: number, direction: "up" | "down") => {
      setManualPlan((previous) => {
         const target = direction === "up" ? index - 1 : index + 1;
         if (target < 0 || target >= previous.length) {
            return previous;
         }

         const copy = [...previous];
         [copy[index], copy[target]] = [copy[target], copy[index]];
         return copy;
      });
   };

   const clearManualPlan = () => {
      setManualPlan([]);
   };

   return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
         <header>
            <h1 className="text-2xl font-semibold text-white">Manual planner</h1>
            <p className="mt-2 text-sm text-muted-foreground">
               Select a tier, add any of its eight items, and build the exact feed order you want.
            </p>
         </header>

         <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
               <MountAttributesCard attributes={attributes} onValueChange={updateValue} />

               <Card>
                  <CardHeader>
                     <CardTitle>Pick a tier</CardTitle>
                     <CardDescription>
                        All eight items from the chosen tier are shown below all the time.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <Select value={String(selectedTier)} onValueChange={(value) => setSelectedTier(Number(value))}>
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                           {tierOptions.map((group) => (
                              <SelectItem key={group.minLevel} value={String(group.minLevel)}>
                                 Tier {group.minLevel}+
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>

                     <div className=" gap-2 flex flex-col">
                        {selectedTierGroup?.items.map((item) => (
                           <div
                              key={`${selectedTierGroup.minLevel}:${item.name}`}
                              className="rounded-xl border bg-background p-2 shadow-sm flex items-center gap-2"
                           >
                              <p className="text-sm font-medium grow">{item.name}</p>

                              <div className="  flex flex-wrap gap-1">
                                 {item.bonuses.map((bonus, index) => (
                                    <Badge key={`${item.name}-${index}`} variant="secondary">
                                       {bonus}
                                    </Badge>
                                 ))}
                              </div>

                              <Button
                                 variant={"ghost"}
                                 className="size-7 -m-1"
                                 onClick={() =>
                                    addManualItem({
                                       id: `${selectedTierGroup.minLevel}:${item.name}`,
                                       name: item.name,
                                       tierMinLevel: selectedTierGroup.minLevel,
                                       bonuses: item.bonuses,
                                    })
                                 }
                              >
                                 <Plus />
                              </Button>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </div>

            <div className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Feed time (step-by-step)</CardTitle>
                     <CardDescription>
                        Recalculates after each feed based on current totals, then sums all step times.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">Start avg: {currentAverage.toFixed(1)}</Badge>
                        <Badge variant="default">Total: {feedTimeline.totalMinutes} min</Badge>
                        <Badge variant="secondary">{feedTimeline.totalHours.toFixed(1)} hours</Badge>
                     </div>

                     {feedTimeline.steps.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Add items to calculate cumulative feed time.</p>
                     ) : (
                        <ul className="space-y-1 text-sm">
                           {feedTimeline.steps.map((step) => (
                              <li
                                 key={`feed-time-step-${step.feedNumber}`}
                                 className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/30 px-3 py-2"
                              >
                                 <span>
                                    #{step.feedNumber} Avg {step.average.toFixed(1)} (rounded {step.roundedAverage})
                                 </span>
                                 <strong>
                                    {step.minutes}m (total {step.cumulativeMinutes}m)
                                 </strong>
                              </li>
                           ))}
                        </ul>
                     )}
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Manual order</CardTitle>
                     <CardDescription>Reorder the sequence to see the exact capped result.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground">Planned sequence: {manualPlan.length} items</p>
                        <Button
                           type="button"
                           variant="outline"
                           size="sm"
                           disabled={manualPlan.length === 0}
                           onClick={clearManualPlan}
                        >
                           Clear all
                        </Button>
                     </div>

                     {manualPlan.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No items in plan yet.</p>
                     ) : (
                        <ul className="space-y-2">
                           {manualPlan.map((item, index) => (
                              <li key={`${item.id}-${index}`} className="rounded-lg border p-2">
                                 <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                       <Badge variant="secondary">#{index + 1}</Badge>
                                       <p className="text-sm font-medium">{item.name}</p>
                                       <Badge variant="outline">Tier {item.tierMinLevel}+</Badge>
                                    </div>
                                    <div className="flex items-center gap-1">
                                       <Button
                                          type="button"
                                          variant="outline"
                                          size="xs"
                                          onClick={() => moveManualItem(index, "up")}
                                          disabled={index === 0}
                                       >
                                          Up
                                       </Button>
                                       <Button
                                          type="button"
                                          variant="outline"
                                          size="xs"
                                          onClick={() => moveManualItem(index, "down")}
                                          disabled={index === manualPlan.length - 1}
                                       >
                                          Down
                                       </Button>
                                       <Button
                                          type="button"
                                          variant="destructive"
                                          size="xs"
                                          onClick={() => removeManualItem(index)}
                                       >
                                          Remove
                                       </Button>
                                    </div>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     )}
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Manual outcome</CardTitle>
                     <CardDescription>Result for your exact order, with caps applied at each step.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">Feeds: {manualSimulation.steps.length}</Badge>
                        <Badge variant="default">
                           Avg total gain/feed: {manualSimulation.overallAverageGainPerFeed.toFixed(2)}
                        </Badge>
                     </div>

                     <div className="overflow-x-auto rounded-lg border">
                        <table className="w-full min-w-155 text-sm">
                           <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                              <tr>
                                 <th className="px-3 py-2">Stat</th>
                                 <th className="px-3 py-2">Start</th>
                                 <th className="px-3 py-2">Cap</th>
                                 <th className="px-3 py-2">Final</th>
                                 <th className="px-3 py-2">Gain</th>
                                 <th className="px-3 py-2">Avg/feed</th>
                              </tr>
                           </thead>
                           <tbody>
                              {attributes.map((attribute, index) => {
                                 const start = Math.max(0, Math.floor(attribute.current));
                                 const cap = Math.max(start, Math.max(0, Math.floor(attribute.max)));
                                 const finalValue = manualSimulation.finalValues[index] ?? start;
                                 const gain = manualSimulation.totalApplied[index] ?? 0;
                                 const average = manualSimulation.averageGainPerFeed[index] ?? 0;

                                 return (
                                    <tr key={attribute.name} className="border-t">
                                       <td className="px-3 py-2 font-medium">{attribute.name}</td>
                                       <td className="px-3 py-2">{start}</td>
                                       <td className="px-3 py-2">{cap}</td>
                                       <td className="px-3 py-2">{finalValue}</td>
                                       <td className="px-3 py-2">+{gain}</td>
                                       <td className="px-3 py-2">{average.toFixed(2)}</td>
                                    </tr>
                                 );
                              })}
                           </tbody>
                        </table>
                     </div>

                     <div className="rounded-lg border bg-muted/30 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                           Applied order log
                        </p>
                        {manualSimulation.steps.length === 0 ? (
                           <p className="mt-1 text-sm text-muted-foreground">
                              Add items to see order-based step results.
                           </p>
                        ) : (
                           <ul className="mt-2 space-y-1 text-sm">
                              {manualSimulation.steps.map((step) => {
                                 const effectiveGain = step.appliedBonuses.reduce((sum, value) => sum + value, 0);

                                 return (
                                    <li
                                       key={`${step.itemName}-${step.order}`}
                                       className="flex items-center justify-between gap-2"
                                    >
                                       <span>
                                          #{step.order} {step.itemName} (Tier {step.tierMinLevel}+)
                                       </span>
                                       <strong>+{effectiveGain}</strong>
                                    </li>
                                 );
                              })}
                           </ul>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </div>
         </section>
      </main>
   );
}
