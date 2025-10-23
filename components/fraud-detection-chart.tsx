"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { generateFraudData } from "@/lib/mock-data"

export function FraudDetectionChart() {
  const [data, setData] = useState(generateFraudData(12))

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateFraudData(12))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Fraud Detection & Prevention</h3>
        <p className="text-sm text-muted-foreground">Last 12 hours</p>
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
          />
          <Legend />
          <Bar dataKey="detected" fill="hsl(var(--chart-5))" name="Detected" radius={[4, 4, 0, 0]} />
          <Bar dataKey="prevented" fill="hsl(var(--chart-3))" name="Prevented" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
