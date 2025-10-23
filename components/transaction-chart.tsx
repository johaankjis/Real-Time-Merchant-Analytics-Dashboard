"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { generateTimeSeriesData } from "@/lib/mock-data"

export function TransactionChart() {
  const [data, setData] = useState(generateTimeSeriesData(24))

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateTimeSeriesData(24))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Transaction Approval Rate</h3>
        <p className="text-sm text-muted-foreground">Last 24 hours</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="approvalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).getHours() + ":00"}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[80, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelFormatter={(value) => new Date(value).toLocaleTimeString()}
            formatter={(value: number) => [`${value.toFixed(2)}%`, "Approval Rate"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill="url(#approvalGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
