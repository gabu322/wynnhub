"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeedTimeEstimate } from "@/lib/feed-time";

interface FeedTimeCardProps {
   average: number;
   title?: string;
   description?: string;
}

export function FeedTimeCard({
   average,
   title = "Feed time",
   description = "Rounded up from the current general average.",
}: FeedTimeCardProps) {
   const estimate = getFeedTimeEstimate(average);

   return (
      <Card>
         <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
         </CardHeader>
         <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
               <Badge variant="secondary">Average: {estimate.average.toFixed(1)}</Badge>
               <Badge variant="outline">Rounded: {estimate.roundedAverage}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
               <Badge variant="default">{estimate.minutes} minutes</Badge>
               <Badge variant="secondary">{estimate.hours.toFixed(1)} hours</Badge>
            </div>
         </CardContent>
      </Card>
   );
}
