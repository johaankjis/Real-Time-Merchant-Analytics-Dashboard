"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

export function ApprovalRateChart() {
  const [data, setData] = useState(generateApprovalData())

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateApprovalData())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Approval vs Decline Rate</h3>
        <p className="text-sm text-muted-foreground">By merchant category</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
          <Legend />
          <Bar dataKey="approved" fill="hsl(var(--chart-3))" name="Approved" radius={[4, 4, 0, 0]} />
          <Bar dataKey="declined" fill="hsl(var(--chart-5))" name="Declined" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

function generateApprovalData() {
  const categories = ["Retail", "E-commerce", "Travel", "Food & Dining", "Entertainment"]
  return categories.map((category) => ({
    category,
    approved: 85 + Math.random() * 12,
    declined: 3 + Math.random() * 7,
  }))
}
