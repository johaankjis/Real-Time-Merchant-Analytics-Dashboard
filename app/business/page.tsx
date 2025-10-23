import { DashboardLayout } from "@/components/dashboard-layout"
import { BusinessMetricsDashboard } from "@/components/business-metrics-dashboard"

export default function BusinessPage() {
  return (
    <DashboardLayout>
      <BusinessMetricsDashboard />
    </DashboardLayout>
  )
}
