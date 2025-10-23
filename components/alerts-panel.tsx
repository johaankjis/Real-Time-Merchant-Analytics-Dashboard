"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { generateAlerts, type Alert } from "@/lib/mock-data"
import { AlertTriangle, Info, XCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts(5))

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(generateAlerts(5))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const getAlertIcon = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return XCircle
      case "warning":
        return AlertTriangle
      case "info":
        return Info
    }
  }

  const getAlertColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-destructive"
      case "warning":
        return "text-warning"
      case "info":
        return "text-accent"
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
          <p className="text-sm text-muted-foreground">Real-time anomaly detection</p>
        </div>
        <Badge variant="outline">{alerts.filter((a) => !a.resolved).length} Active</Badge>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.severity)
          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3",
                alert.resolved ? "border-border opacity-60" : "border-border",
              )}
            >
              <Icon className={cn("h-5 w-5 mt-0.5", getAlertColor(alert.severity))} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={alert.severity === "critical" ? "destructive" : "outline"}
                    className={cn(
                      alert.severity === "warning" && "border-warning text-warning",
                      alert.severity === "info" && "border-accent text-accent",
                    )}
                  >
                    {alert.severity}
                  </Badge>
                  <Badge variant="secondary">{alert.type}</Badge>
                  {alert.resolved && (
                    <Badge variant="outline" className="border-success text-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Resolved
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-sm text-foreground">{alert.message}</p>
                {alert.merchantId && <p className="mt-1 text-xs text-muted-foreground">Merchant: {alert.merchantId}</p>}
                <p className="mt-1 text-xs text-muted-foreground">{alert.timestamp.toLocaleString()}</p>
              </div>
              {!alert.resolved && (
                <Button variant="ghost" size="sm">
                  Resolve
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
