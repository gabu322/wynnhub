const TIME_BREAKPOINTS = [
   { maxAverage: 10, minutes: 1 },
   { maxAverage: 12, minutes: 5 },
   { maxAverage: 13, minutes: 15 },
   { maxAverage: 14, minutes: 30 },
   { maxAverage: 15, minutes: 60 },
   { maxAverage: 16, minutes: 120 },
   { maxAverage: 17, minutes: 180 },
   { maxAverage: 18, minutes: 240 },
   { maxAverage: 19, minutes: 300 },
] as const;

export function getFeedingTimeMinutes(average: number) {
   const roundedAverage = Math.ceil(Math.max(0, average));
   const match = TIME_BREAKPOINTS.find((breakpoint) => roundedAverage <= breakpoint.maxAverage);
   return match?.minutes ?? 360;
}

export function getFeedTimeEstimate(average: number) {
   const roundedAverage = Math.ceil(Math.max(0, average));
   const minutes = getFeedingTimeMinutes(roundedAverage);

   return {
      average,
      roundedAverage,
      minutes,
      hours: minutes / 60,
   };
}

export interface FeedTimelineStepEstimate {
   feedNumber: number;
   average: number;
   roundedAverage: number;
   minutes: number;
   cumulativeMinutes: number;
   hours: number;
   cumulativeHours: number;
}

export interface FeedTimelineEstimate {
   steps: FeedTimelineStepEstimate[];
   totalMinutes: number;
   totalHours: number;
}

export function getFeedTimelineEstimate(
   initialTotals: number[],
   totalsAfterEachStep: number[][],
): FeedTimelineEstimate {
   const safeInitialTotals = initialTotals.map((value) => Math.max(0, Math.floor(value)));
   const attributeCount = Math.max(safeInitialTotals.length, 1);

   let runningTotals = [...safeInitialTotals];
   let cumulativeMinutes = 0;

   const steps = totalsAfterEachStep.map((totalsAfterStep, index) => {
      const average = runningTotals.reduce((sum, value) => sum + value, 0) / attributeCount;
      const roundedAverage = Math.ceil(Math.max(0, average));
      const minutes = getFeedingTimeMinutes(average);
      cumulativeMinutes += minutes;

      runningTotals = totalsAfterStep.map((value) => Math.max(0, Math.floor(value)));

      return {
         feedNumber: index + 1,
         average,
         roundedAverage,
         minutes,
         cumulativeMinutes,
         hours: minutes / 60,
         cumulativeHours: cumulativeMinutes / 60,
      };
   });

   return {
      steps,
      totalMinutes: cumulativeMinutes,
      totalHours: cumulativeMinutes / 60,
   };
}
