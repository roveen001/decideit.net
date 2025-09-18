
"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

type VoteChartProps = {
  data: {
    for: number;
    against: number;
  };
};

const chartConfig = {
  votes: {
    label: "Votes",
  },
  for: {
    label: "For",
    color: "hsl(120 76.2% 36.3%)",
  },
  against: {
    label: "Against",
    color: "hsl(0 84.2% 60.2%)",
  },
} satisfies ChartConfig;

export default function VoteChart({ data }: VoteChartProps) {
  const chartData = [
    { name: "for", votes: data.for, fill: "var(--color-for)" },
    { name: "against", votes: data.against, fill: "var(--color-against)" },
  ];

  const totalVotes = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.votes, 0);
  }, [chartData]);

  const forPercentage = totalVotes > 0 ? (data.for / totalVotes) * 100 : 0;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="votes"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {forPercentage.toFixed(1)}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="fill-muted-foreground"
                    >
                      For
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
        <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
            className="-mt-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}

