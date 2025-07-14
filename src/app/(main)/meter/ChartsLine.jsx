"use client"

import * as React from "react"
import {CartesianGrid, Line, LineChart, XAxis} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive line chart"

const chartData = [
  // {date: "2024-04-01", desktop: 222, mobile: 150},
  // {date: "2024-04-02", desktop: 97, mobile: 180},
  // {date: "2024-04-03", desktop: 167, mobile: 120},
  // {date: "2024-04-04", desktop: 242, mobile: 260},
  // {date: "2024-04-05", desktop: 373, mobile: 290},
  // {date: "2024-04-06", desktop: 301, mobile: 340},
  // {date: "2024-04-07", desktop: 245, mobile: 180},
  // {date: "2024-04-08", desktop: 409, mobile: 320},
  // {date: "2024-04-09", desktop: 59, mobile: 110},
  // {date: "2024-04-10", desktop: 261, mobile: 190},

  {id: 276, meterId: 5, date: "2024-07-04T21:00:00.000Z", kWh: 9.67},
  {id: 277, meterId: 5, date: "2024-07-05T21:00:00.000Z", kWh: 12},
  {id: 278, meterId: 5, date: "2024-07-06T21:00:00.000Z", kWh: 11.89},
  {id: 279, meterId: 5, date: "2024-07-07T21:00:00.000Z", kWh: 10.13},
  {id: 280, meterId: 5, date: "2024-07-08T21:00:00.000Z", kWh: 10.26},

]

const chartConfig = {
  views: {
    label: "Consumption(kWh)",
  },
  kWh: {
    label: "kWh",
    color: "var(--chart-1)",
  },

}

export function ChartLineInteractive({chartDataPrep = []}) {
  const [activeChart, setActiveChart] =
    React.useState("kWh")

  console.log("dataPrep charts", chartDataPrep)

  const chartData = chartDataPrep.map((entry) => ({
    date: entry.date,
    kWh: entry.kWh
  })) || []

  // const total = React.useMemo(
  //   () => ({
  //     kWh: chartData.reduce((acc, curr) => acc + curr.kWh, 0)
  //   }),
  //   []
  // )
  //
  // function calculateTotalKWh(data) {
  //   let total = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     total += data[i].kWh;
  //   }
  //   return total;
  // }

  const total = ()=>{
    let summ = 0
    for (let i = 0; i < chartData.length; i++) {
      summ += chartData[i].kWh;
    }
    return summ
  }

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total Consumption for the last {chartData.length/30} months
          </CardDescription>
        </div>
        <div className="flex">
          {["kWh"].map((chart) => (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                {/*{total[chart].toLocaleString()}*/}
                {total()}
                </span>
              </button>
            )
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
