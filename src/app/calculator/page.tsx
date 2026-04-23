"use client";

import { useMemo, useState } from "react";

import { MountAttributesCard } from "@/components/mount-attributes-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeedTimeEstimate, getFeedTimelineEstimate } from "@/lib/feed-time";
import {
   simulateManualFeedOrder,
   solveMountFeed,
   type AttributeInput,
   type SolverResult,
} from "@/lib/mount-calculator";

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

export default function CalculatorPage() {
   const [attributes, setAttributes] = useState(defaultAttributes);
   const [level, setLevel] = useState(30);
   const [result, setResult] = useState<SolverResult | null>(null);

   const totalCurrent = attributes.reduce((sum, attribute) => sum + attribute.current, 0);
   const currentAverage = totalCurrent / attributes.length;
   const timeEstimate = useMemo(() => getFeedTimeEstimate(currentAverage), [currentAverage]);

   const autoFeedTimeline = useMemo(() => {
      if (!result || result.impossibleReason || result.minFeeds === null || result.tierMinLevel === null) {
         return null;
      }

      const selectedItems = (result.items ?? []).flatMap((item) =>
         Array.from({ length: item.count }, () => ({
            itemName: item.name,
            tierMinLevel: result.tierMinLevel as number,
         })),
      );

      const simulation = simulateManualFeedOrder(attributes, selectedItems);

      return getFeedTimelineEstimate(
         attributes.map((attribute) => Math.max(0, Math.floor(attribute.current))),
         simulation.steps.map((step) => step.totalsAfterStep),
      );
   }, [attributes, result]);

   const updateValue = (index: number, key: "current" | "max", value: string) => {
      const parsed = Number.parseInt(value, 10);
      const safeValue = Number.isNaN(parsed) ? 0 : Math.max(0, parsed);

      setAttributes((previous) =>
         previous.map((attribute, currentIndex) =>
            currentIndex === index ? { ...attribute, [key]: safeValue } : attribute,
         ),
      );
   };

   const runCalculation = () => {
      setResult(solveMountFeed(attributes, level));
   };

   return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
         <header>
            <h1 className="text-2xl font-semibold text-white">Automatic calculator</h1>
            <p className="mt-2 text-sm text-muted-foreground">
               Pick current values, target values, and a mount level to solve the feed plan.
            </p>
         </header>

         <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Level setup</CardTitle>
                     <CardDescription>The solver uses the highest tier available for this level.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="level">
                           Level (1-115)
                        </label>
                        <input
                           id="level"
                           type="number"
                           min={1}
                           max={115}
                           value={level}
                           onChange={(event) => {
                              const parsed = Number.parseInt(event.target.value, 10);
                              setLevel(Number.isNaN(parsed) ? 1 : Math.max(1, parsed));
                           }}
                           className="flex h-8 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        />
                     </div>
                     <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">Current total: {totalCurrent}</Badge>
                        <Badge variant="outline">Average: {timeEstimate.average.toFixed(1)}</Badge>
                        <Badge variant="default">{timeEstimate.minutes} min</Badge>
                     </div>
                  </CardContent>
                  <CardFooter>
                     <Button type="button" onClick={runCalculation} className="w-full">
                        Calculate
                     </Button>
                  </CardFooter>
               </Card>

               <MountAttributesCard attributes={attributes} onValueChange={updateValue} />
            </div>

            <div className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Feed time (per recommended item)</CardTitle>
                     <CardDescription>
                        Calculated step-by-step from the solver output, recalculating after each item.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {!autoFeedTimeline ? (
                        <p className="text-sm text-muted-foreground">
                           Click Calculate to generate per-item feed-time steps.
                        </p>
                     ) : (
                        <>
                           <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline">Feeds: {autoFeedTimeline.steps.length}</Badge>
                              <Badge variant="default">Total: {autoFeedTimeline.totalMinutes} min</Badge>
                              <Badge variant="secondary">{autoFeedTimeline.totalHours.toFixed(1)} hours</Badge>
                           </div>
                           <ul className="space-y-1 text-sm">
                              {autoFeedTimeline.steps.map((step) => (
                                 <li
                                    key={`auto-feed-time-step-${step.feedNumber}`}
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
                        </>
                     )}
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Result</CardTitle>
                     <CardDescription>
                        Best recommendation based on your selected tier and stat targets.
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     {result === null ? (
                        <p className="text-sm text-muted-foreground">Set values, then click Calculate.</p>
                     ) : result.impossibleReason ? (
                        <p className="text-sm text-red-700">{result.impossibleReason}</p>
                     ) : result.minFeeds === null ? (
                        <p className="text-sm text-amber-700">No solution found in the configured search range.</p>
                     ) : (
                        <div className="space-y-3">
                           <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline">Tier min level: {result.tierMinLevel}</Badge>
                              <Badge variant="default">Items needed: {result.minFeeds}</Badge>
                           </div>
                           <div className="rounded-lg border bg-muted/30 p-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                 Recommended items
                              </p>
                              {(result.items?.length ?? 0) === 0 ? (
                                 <p className="mt-1 text-sm text-muted-foreground">No items needed.</p>
                              ) : (
                                 <ul className="mt-2 space-y-1 text-sm">
                                    {(result.items ?? []).map((item) => (
                                       <li key={item.name} className="flex items-center justify-between gap-2">
                                          <span>{item.name}</span>
                                          <strong>x{item.count}</strong>
                                       </li>
                                    ))}
                                 </ul>
                              )}
                           </div>
                        </div>
                     )}
                  </CardContent>
               </Card>
            </div>
         </section>
      </main>
   );
}
