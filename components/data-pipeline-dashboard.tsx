"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { KpiCard } from "@/components/kpi-card"
import { SystemHealthChart } from "@/components/system-health-chart"
import { ThroughputChart } from "@/components/throughput-chart"
import { ProcessingTimeChart } from "@/components/processing-time-chart"
import { Database, Zap, Clock, CheckCircle } from "lucide-react"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function DataPipelineDashboard() {
  const [latency, setLatency] = useState(28)
  const [throughput, setThroughput] = useState(1250000)

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(25 + Math.random() * 10)
      setThroughput(1200000 + Math.random() * 100000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const latencyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    latency: 25 + Math.random() * 10,
  }))

  const pipelineStages = [
    { name: "Kafka Ingestion", status: "healthy", throughput: "42K/s", latency: "12ms" },
    { name: "PySpark Processing", status: "healthy", throughput: "38K/s", latency: "8ms" },
    { name: "SQL Aggregation", status: "healthy", throughput: "35K/s", latency: "5ms" },
    { name: "Power BI Refresh", status: "healthy", throughput: "N/A", latency: "3ms" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Data Pipeline</h2>
        <p className="text-sm text-muted-foreground">Real-time streaming infrastructure monitoring</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard title="Pipeline Latency" value={`${latency.toFixed(0)}s`} change={-12.5} icon={Clock} trend="down" />
        <KpiCard
          title="Daily Throughput"
          value={`${(throughput / 1000000).toFixed(2)}M`}
          change={8.3}
          icon={Database}
          trend="up"
        />
        <KpiCard title="Processing Speed" value="35K/s" change={5.1} icon={Zap} trend="up" />
        <KpiCard title="Success Rate" value="99.97%" change={0.02} icon={CheckCircle} trend="up" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SystemHealthChart />
        <ThroughputChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Pipeline Latency Trend</h3>
            <p className="text-sm text-muted-foreground">End-to-end processing time (seconds)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 50]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                formatter={(value: number) => [`${value.toFixed(1)}s`, "Latency"]}
              />
              <Line type="monotone" dataKey="latency" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <ProcessingTimeChart />
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">Pipeline Stages</h3>
          <p className="text-sm text-muted-foreground">Kafka → PySpark → SQL → Power BI</p>
        </div>
        <div className="space-y-3">
          {pipelineStages.map((stage, index) => (
            <div key={stage.name} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{stage.name}</h4>
                    <Badge variant="outline" className="border-success text-success">
                      {stage.status}
                    </Badge>
                  </div>
                  <div className="mt-1 flex gap-4 text-sm text-muted-foreground">
                    <span>Throughput: {stage.throughput}</span>
                    <span>Latency: {stage.latency}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
