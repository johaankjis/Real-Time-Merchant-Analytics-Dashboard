"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { KpiCard } from "@/components/kpi-card"
import { TransactionChart } from "@/components/transaction-chart"
import { ApprovalRateChart } from "@/components/approval-rate-chart"
import { generateMockKPIs } from "@/lib/mock-data"
import { DollarSign, TrendingUp, Users, CreditCard } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

export function BusinessMetricsDashboard() {
  const [kpis, setKpis] = useState(generateMockKPIs())

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(generateMockKPIs())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const revenueData = [
    { month: "Jan", revenue: 3.2, target: 3.0 },
    { month: "Feb", revenue: 3.5, target: 3.2 },
    { month: "Mar", revenue: 3.8, target: 3.5 },
    { month: "Apr", revenue: 4.1, target: 3.8 },
    { month: "May", revenue: 4.5, target: 4.0 },
    { month: "Jun", revenue: 4.8, target: 4.5 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Business Metrics</h2>
        <p className="text-sm text-muted-foreground">Revenue and performance indicators</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard
          title="Transaction Volume"
          value={`$${(kpis.transactionVolume / 1000000).toFixed(2)}M`}
          change={kpis.transactionVolumeChange}
          icon={DollarSign}
          trend={kpis.transactionVolumeChange >= 0 ? "up" : "down"}
        />
        <KpiCard
          title="Approval Rate"
          value={`${kpis.approvalRate.toFixed(2)}%`}
          change={kpis.approvalRateChange}
          icon={TrendingUp}
          trend={kpis.approvalRateChange >= 0 ? "up" : "down"}
        />
        <KpiCard title="Active Merchants" value="1,247" change={5.2} icon={Users} trend="up" />
        <KpiCard title="Avg Transaction" value="$342.50" change={3.1} icon={CreditCard} trend="up" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TransactionChart />
        <ApprovalRateChart />
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Revenue vs Target</h3>
          <p className="text-sm text-muted-foreground">Monthly performance (in millions)</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => `$${value.toFixed(1)}M`}
            />
            <Legend />
            <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="hsl(var(--chart-2))" name="Target" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
