"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateMockTransactions, type Transaction } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(generateMockTransactions(10))

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(generateMockTransactions(10))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground">Live transaction stream</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Transaction ID</th>
              <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Merchant</th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Amount</th>
              <th className="pb-3 text-center text-sm font-medium text-muted-foreground">Status</th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Risk Score</th>
              <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-border last:border-0">
                <td className="py-3 text-sm font-mono text-foreground">{transaction.id}</td>
                <td className="py-3 text-sm text-foreground">{transaction.merchant}</td>
                <td className="py-3 text-right text-sm font-medium text-foreground">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="py-3 text-center">
                  <Badge
                    variant={
                      transaction.status === "approved"
                        ? "default"
                        : transaction.status === "declined"
                          ? "destructive"
                          : transaction.status === "flagged"
                            ? "outline"
                            : "secondary"
                    }
                    className={cn(
                      transaction.status === "approved" && "bg-success text-success-foreground",
                      transaction.status === "flagged" && "border-warning text-warning",
                    )}
                  >
                    {transaction.status}
                  </Badge>
                </td>
                <td className="py-3 text-right text-sm text-foreground">
                  <span
                    className={cn(
                      "font-medium",
                      transaction.riskScore > 70
                        ? "text-destructive"
                        : transaction.riskScore > 40
                          ? "text-warning"
                          : "text-success",
                    )}
                  >
                    {transaction.riskScore.toFixed(1)}
                  </span>
                </td>
                <td className="py-3 text-right text-sm text-muted-foreground">
                  {transaction.timestamp.toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
