"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AttributeInput } from "@/lib/mount-calculator";

interface MountAttributesCardProps {
   attributes: AttributeInput[];
   onValueChange: (index: number, key: "current" | "max", value: string) => void;
   title?: string;
   description?: string;
}

export function MountAttributesCard({
   attributes,
   onValueChange,
   title = "Attributes",
   description = "Enter current and target values for each stat.",
}: MountAttributesCardProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="grid grid-cols-3 gap-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
               <span>Stat</span>
               <span>Current</span>
               <span>Max</span>
            </div>
            <div className="space-y-2">
               {attributes.map((attribute, index) => (
                  <div key={attribute.name} className="grid grid-cols-3 items-center gap-2">
                     <span className="text-sm font-medium">{attribute.name}</span>
                     <Input
                        type="number"
                        min={0}
                        value={attribute.current}
                        onChange={(event) => onValueChange(index, "current", event.target.value)}
                     />
                     <Input
                        type="number"
                        min={0}
                        value={attribute.max}
                        onChange={(event) => onValueChange(index, "max", event.target.value)}
                     />
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
