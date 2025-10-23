"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, Database, DollarSign, FileCheck } from "lucide-react"

export function StakeholdersDashboard() {
  const stakeholders = [
    {
      role: "Risk Analyst",
      icon: Shield,
      description: "Monitor chargeback ratios and fraud detection in real-time",
      kpis: ["Chargeback Ratio", "Fraud Rate", "Risk Mitigation", "High-Risk Merchants"],
      access: "Full risk metrics and merchant scoring",
    },
    {
      role: "Business Executive",
      icon: TrendingUp,
      description: "Track revenue metrics and approval rates aligned with business goals",
      kpis: ["Transaction Volume", "Approval Rate", "Revenue vs Target", "Active Merchants"],
      access: "Executive dashboards and performance summaries",
    },
    {
      role: "Data Engineer",
      icon: Database,
      description: "Monitor pipeline performance and data processing latency",
      kpis: ["Pipeline Latency", "Throughput", "Processing Speed", "Success Rate"],
      access: "Infrastructure metrics and system health",
    },
    {
      role: "Finance Team",
      icon: DollarSign,
      description: "Analyze transaction volumes and revenue performance",
      kpis: ["Transaction Volume", "Revenue", "Average Transaction", "Monthly Growth"],
      access: "Financial reports and transaction analytics",
    },
    {
      role: "Compliance Officer",
      icon: FileCheck,
      description: "Ensure regulatory compliance and audit trail integrity",
      kpis: ["Compliance Rate", "Audit Logs", "Policy Violations", "Reporting Status"],
      access: "Compliance dashboards and audit reports",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Stakeholder Access</h2>
        <p className="text-sm text-muted-foreground">Role-based dashboard access and permissions</p>
      </div>

      <div className="grid gap-4">
        {stakeholders.map((stakeholder) => (
          <Card key={stakeholder.role} className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <stakeholder.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{stakeholder.role}</h3>
                  <Badge variant="outline">Active</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{stakeholder.description}</p>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="text-sm font-medium text-foreground">Key KPIs:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {stakeholder.kpis.map((kpi) => (
                        <Badge key={kpi} variant="secondary">
                          {kpi}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">Access Level:</span>
                    <p className="mt-1 text-sm text-muted-foreground">{stakeholder.access}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground">Security & Governance</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              All dashboards implement row-level security (RLS) and scheduled refresh to ensure secure, automated
              insights. Access is controlled based on role permissions and data sensitivity.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
