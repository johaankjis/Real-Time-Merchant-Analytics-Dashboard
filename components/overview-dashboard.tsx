"use client"

import { useEffect, useState } from "react"
import { KpiCard } from "@/components/kpi-card"
import { TransactionChart } from "@/components/transaction-chart"
import { ApprovalRateChart } from "@/components/approval-rate-chart"
import { ChargebackChart } from "@/components/chargeback-chart"
import { FraudDetectionChart } from "@/components/fraud-detection-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { AlertsPanel } from "@/components/alerts-panel"
import { MerchantPerformanceTable } from "@/components/merchant-performance-table"
import { generateMockKPIs } from "@/lib/mock-data"
import { AlertTriangle, CheckCircle, DollarSign } from "lucide-react"

export function OverviewDashboard() {
  const [kpis, setKpis] = useState(generateMockKPIs())
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Update KPIs every 30 seconds to simulate real-time updates
    const interval = setInterval(() => {
      setKpis(generateMockKPIs())
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Last Update Indicator */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()} (refreshes every 30s)
          </p>
        </div>
        <div className="text-sm text-muted-foreground">Processing 1M+ transactions daily</div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Approval Rate"
          value={`${kpis.approvalRate.toFixed(2)}%`}
          change={kpis.approvalRateChange}
          icon={CheckCircle}
          trend={kpis.approvalRateChange >= 0 ? "up" : "down"}
        />
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
          icon={AlertTriangle}
          trend={kpis.fraudRateChange <= 0 ? "up" : "down"}
          invertTrend
        />
        <KpiCard
          title="Transaction Volume"
          value={`$${(kpis.transactionVolume / 1000000).toFixed(2)}M`}
          change={kpis.transactionVolumeChange}
          icon={DollarSign}
          trend={kpis.transactionVolumeChange >= 0 ? "up" : "down"}
        />
      </div>

      <AlertsPanel />

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <TransactionChart />
        <ApprovalRateChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChargebackChart />
        <FraudDetectionChart />
      </div>

      <MerchantPerformanceTable />

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  )
}
