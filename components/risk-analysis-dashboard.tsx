"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { KpiCard } from "@/components/kpi-card"
import { ChargebackChart } from "@/components/chargeback-chart"
import { FraudDetectionChart } from "@/components/fraud-detection-chart"
import { generateMockKPIs } from "@/lib/mock-data"
import { AlertTriangle, Shield, TrendingDown } from "lucide-react"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function RiskAnalysisDashboard() {
  const [kpis, setKpis] = useState(generateMockKPIs())

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(generateMockKPIs())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const highRiskMerchants = [
    { name: "Quick Shop", riskScore: 78, chargebacks: 12, fraudIncidents: 5 },
    { name: "Digital Services Ltd", riskScore: 72, chargebacks: 8, fraudIncidents: 3 },
    { name: "Global Electronics", riskScore: 65, chargebacks: 6, fraudIncidents: 2 },
  ]

  const riskDistribution = [
    { name: "Low Risk", value: 72, color: "hsl(var(--chart-3))" },
    { name: "Medium Risk", value: 21, color: "hsl(var(--chart-4))" },
    { name: "High Risk", value: 7, color: "hsl(var(--chart-5))" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Risk Analysis</h2>
        <p className="text-sm text-muted-foreground">Monitor merchant risk metrics and fraud detection</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          title="Chargeback Ratio"
          value={`${kpis.chargebackRatio.toFixed(3)}%`}
          change={kpis.chargebackRatioChange}
          icon={AlertTriangle}
          trend={kpis.chargebackRatioChange <= 0 ? "up" : "down"}
          invertTrend
        />
        <KpiCard
          title="Fraud Rate"
          value={`${kpis.fraudRate.toFixed(3)}%`}
          change={kpis.fraudRateChange}
          icon={Shield}
          trend={kpis.fraudRateChange <= 0 ? "up" : "down"}
          invertTrend
        />
        <KpiCard title="Risk Mitigation" value="98.7%" change={2.3} icon={TrendingDown} trend="up" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChargebackChart />
        <FraudDetectionChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Merchant Risk Distribution</h3>
            <p className="text-sm text-muted-foreground">Percentage by risk category</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">High-Risk Merchants</h3>
            <p className="text-sm text-muted-foreground">Merchants requiring immediate attention</p>
          </div>
          <div className="space-y-4">
            {highRiskMerchants.map((merchant) => (
              <div
                key={merchant.name}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{merchant.name}</h4>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                    <span>Chargebacks: {merchant.chargebacks}</span>
                    <span>Fraud Incidents: {merchant.fraudIncidents}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-destructive">{merchant.riskScore}</div>
                  <div className="text-xs text-muted-foreground">Risk Score</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
