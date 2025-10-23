"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { generateSystemMetrics } from "@/lib/mock-data"

export function ProcessingTimeChart() {
  const [data, setData] = useState(generateSystemMetrics(12))

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateSystemMetrics(12))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Processing Time Breakdown</h3>
        <p className="text-sm text-muted-foreground">Spark vs SQL query times (ms)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).getHours() + ":00"}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelFormatter={(value) => new Date(value).toLocaleTimeString()}
            formatter={(value: number) => `${value.toFixed(1)}ms`}
          />
          <Legend />
          <Bar dataKey="sparkProcessingTime" fill="hsl(var(--chart-1))" name="Spark Processing" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sqlQueryTime" fill="hsl(var(--chart-2))" name="SQL Query" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
