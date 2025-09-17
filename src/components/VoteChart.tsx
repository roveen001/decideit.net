"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
    color: "hsl(var(--chart-1))",
  },
  against: {
    label: "Against",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function VoteChart({ data }: VoteChartProps) {
    const chartData = [
        { voteType: "For", votes: data.for, fill: "var(--color-for)" },
        { voteType: "Against", votes: data.against, fill: "var(--color-against)" },
    ];
    const totalVotes = data.for + data.against;

  return (
    <div className="w-full">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 10, right: 10 }}>
                <CartesianGrid horizontal={false} />
                <YAxis
                    dataKey="voteType"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    className="font-medium"
                />
                <XAxis dataKey="votes" type="number" hide />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        labelKey="votes"
                        indicator="dot"
                        formatter={(value, name, item) => (
                            <div className="flex flex-col">
                                <span>{item.payload.voteType}: {value.toLocaleString()} votes</span>
                                <span className="text-xs text-muted-foreground">{((Number(value) / totalVotes) * 100).toFixed(1)}% of total</span>
                            </div>
                        )}
                    />}
                />
                <Bar dataKey="votes" layout="vertical" radius={5} />
            </BarChart>
        </ChartContainer>
        <div className="flex justify-between text-sm font-medium mt-2 px-4">
            <span>{data.for.toLocaleString()} For</span>
            <span>{data.against.toLocaleString()} Against</span>
        </div>
         <p className="text-center text-xs text-muted-foreground mt-2">Total Votes: {totalVotes.toLocaleString()}</p>
    </div>
  );
}
