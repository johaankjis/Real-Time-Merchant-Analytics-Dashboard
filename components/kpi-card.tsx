import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  title: string
  value: string
  change: number
  icon: LucideIcon
  trend: "up" | "down"
  invertTrend?: boolean
}

export function KpiCard({ title, value, change, icon: Icon, trend, invertTrend = false }: KpiCardProps) {
  const isPositive = invertTrend ? trend === "down" : trend === "up"
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("p-2 rounded-lg", isPositive ? "bg-success/10" : "bg-destructive/10")}>
            <Icon className={cn("h-4 w-4", isPositive ? "text-success" : "text-destructive")} />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <div className="mt-2 flex items-center gap-1">
          <TrendIcon className={cn("h-4 w-4", isPositive ? "text-success" : "text-destructive")} />
          <span className={cn("text-sm font-medium", isPositive ? "text-success" : "text-destructive")}>
            {Math.abs(change).toFixed(2)}%
          </span>
          <span className="text-sm text-muted-foreground">vs last period</span>
        </div>
      </div>
    </Card>
  )
}
