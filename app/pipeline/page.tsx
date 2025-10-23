import { DashboardLayout } from "@/components/dashboard-layout"
import { DataPipelineDashboard } from "@/components/data-pipeline-dashboard"

export default function PipelinePage() {
  return (
    <DashboardLayout>
      <DataPipelineDashboard />
    </DashboardLayout>
  )
}
