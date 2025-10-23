"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateMerchantPerformance, type MerchantPerformance } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function MerchantPerformanceTable() {
  const [merchants, setMerchants] = useState<MerchantPerformance[]>(generateMerchantPerformance(10))
  const [sortBy, setSortBy] = useState<keyof MerchantPerformance>("riskScore")

  useEffect(() => {
    const interval = setInterval(() => {
      setMerchants(generateMerchantPerformance(10))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const sortedMerchants = [...merchants].sort((a, b) => {
    if (sortBy === "riskScore") return b[sortBy] - a[sortBy]
    if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
      return (b[sortBy] as number) - (a[sortBy] as number)
    }
    return 0
  })

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Merchant Performance</h3>
        <p className="text-sm text-muted-foreground">Top merchants by risk score</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Merchant</th>
              <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Category</th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Transactions</th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Approval Rate</th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Chargebacks</th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedMerchants.map((merchant) => (
              <tr key={merchant.merchantId} className="border-b border-border last:border-0">
                <td className="py-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">{merchant.merchantName}</div>
                    <div className="text-xs text-muted-foreground">{merchant.merchantId}</div>
                  </div>
                </td>
                <td className="py-3">
                  <Badge variant="secondary">{merchant.category}</Badge>
                </td>
                <td className="py-3 text-right text-sm text-foreground">
                  {merchant.totalTransactions.toLocaleString()}
                </td>
                <td className="py-3 text-right text-sm text-foreground">{merchant.approvalRate.toFixed(1)}%</td>
                <td className="py-3 text-right text-sm text-foreground">{merchant.chargebackCount}</td>
                <td className="py-3 text-right">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      merchant.riskScore > 70
                        ? "text-destructive"
                        : merchant.riskScore > 40
                          ? "text-warning"
                          : "text-success",
                    )}
                  >
                    {merchant.riskScore.toFixed(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
