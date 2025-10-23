"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { generateChargebackData } from "@/lib/mock-data"

export function ChargebackChart() {
  const [data, setData] = useState(generateChargebackData(24))

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateChargebackData(24))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Chargeback Ratio Trend</h3>
        <p className="text-sm text-muted-foreground">Last 24 hours (Target: {"<"}0.5%)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).getHours() + ":00"}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 1]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelFormatter={(value) => new Date(value).toLocaleTimeString()}
            formatter={(value: number) => [`${value.toFixed(3)}%`, "Chargeback Ratio"]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--chart-4))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
