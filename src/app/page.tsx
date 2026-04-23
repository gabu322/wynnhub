import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
   return (
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-12 sm:px-6">
         <div className="space-y-8">
            <div className="space-y-2">
               <Badge variant="secondary" className="w-fit">
                  Wynnhub
               </Badge>
               <h1 className="text-4xl font-semibold tracking-tight">Mount feed tools</h1>
               <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                  Pick the automatic calculator when you want the solver to choose the best item mix, or use the manual
                  planner when you want to control the order yourself. The planner recalculates feed time at every step,
                  so changing order can change total time.
               </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
               <Card>
                  <CardHeader>
                     <CardTitle>Automatic calculator</CardTitle>
                     <CardDescription>
                        Set your stats and mount level to find the smallest item count that closes the gap.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">
                        Best for quick planning when you want the solver to choose the tier and item mix for you.
                     </p>
                     <Button asChild>
                        <Link href="/calculator">Open calculator</Link>
                     </Button>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>Manual planner</CardTitle>
                     <CardDescription>
                        Pick a tier, add any of its eight items, and test the exact order you want to feed.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <p className="text-sm text-muted-foreground">
                        Good when you already know what materials you want to use and only need to check the outcome.
                     </p>
                     <Button asChild variant="outline">
                        <Link href="/planner">Open planner</Link>
                     </Button>
                  </CardContent>
               </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
               <Card>
                  <CardHeader>
                     <CardTitle>How the time estimate works</CardTitle>
                     <CardDescription>
                        The current average is rounded up before mapping to minutes, so 11.5 behaves like 12.
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ul className="space-y-2 text-sm text-muted-foreground">
                        {[
                           "10 or less -> 1 minute",
                           "11-12 -> 5 minutes",
                           "13 -> 15 minutes",
                           "14 -> 30 minutes",
                           "15 -> 60 minutes",
                           "16 -> 120 minutes",
                           "17 -> 180 minutes",
                           "18 -> 240 minutes",
                           "19 -> 300 minutes",
                           "20+ -> 360 minutes",
                        ].map((band) => (
                           <li key={band} className="rounded-lg border bg-muted/30 px-3 py-2">
                              {band}
                           </li>
                        ))}
                     </ul>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>What changed</CardTitle>
                     <CardDescription>Separate pages and time logic by workflow.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                     <p>The landing page is now informational only.</p>
                     <p>The calculator and planner each have their own dedicated route.</p>
                     <p>The planner now uses per-step recalculation and cumulative timing by order.</p>
                  </CardContent>
               </Card>
            </div>
         </div>
      </main>
   );
}
