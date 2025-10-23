"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { generateSystemMetrics } from "@/lib/mock-data"

export function SystemHealthChart() {
  const [data, setData] = useState(generateSystemMetrics(24))

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateSystemMetrics(24))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Resource Usage</h3>
        <p className="text-sm text-muted-foreground">CPU and Memory utilization</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="memoryGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).getHours() + ":00"}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelFormatter={(value) => new Date(value).toLocaleTimeString()}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="cpuUsage"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill="url(#cpuGradient)"
            name="CPU Usage"
          />
          <Area
            type="monotone"
            dataKey="memoryUsage"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            fill="url(#memoryGradient)"
            name="Memory Usage"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
