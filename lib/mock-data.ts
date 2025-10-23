export interface KPIData {
  approvalRate: number
  approvalRateChange: number
  chargebackRatio: number
  chargebackRatioChange: number
  fraudRate: number
  fraudRateChange: number
  transactionVolume: number
  transactionVolumeChange: number
}

export function generateMockKPIs(): KPIData {
  return {
    approvalRate: 94.5 + (Math.random() - 0.5) * 2,
    approvalRateChange: (Math.random() - 0.5) * 3,
    chargebackRatio: 0.45 + (Math.random() - 0.5) * 0.1,
    chargebackRatioChange: (Math.random() - 0.5) * 0.2,
    fraudRate: 0.23 + (Math.random() - 0.5) * 0.05,
    fraudRateChange: (Math.random() - 0.5) * 0.1,
    transactionVolume: 45000000 + (Math.random() - 0.5) * 5000000,
    transactionVolumeChange: (Math.random() - 0.5) * 10,
  }
}

export interface Transaction {
  id: string
  merchant: string
  amount: number
  status: "approved" | "declined" | "pending" | "flagged"
  timestamp: Date
  riskScore: number
}

export function generateMockTransactions(count = 10): Transaction[] {
  const merchants = [
    "TechStore Inc",
    "Fashion Boutique",
    "Global Electronics",
    "Premium Goods Co",
    "Digital Services Ltd",
    "Retail Express",
    "Luxury Brands",
    "Quick Shop",
  ]

  const statuses: Transaction["status"][] = ["approved", "declined", "pending", "flagged"]
  const weights = [0.85, 0.08, 0.05, 0.02] // Probability weights

  return Array.from({ length: count }, (_, i) => {
    const random = Math.random()
    let status: Transaction["status"] = "approved"
    let cumulative = 0

    for (let j = 0; j < statuses.length; j++) {
      cumulative += weights[j]
      if (random <= cumulative) {
        status = statuses[j]
        break
      }
    }

    return {
      id: `TXN-${Date.now()}-${i}`,
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      amount: Math.random() * 10000 + 100,
      status,
      timestamp: new Date(Date.now() - Math.random() * 3600000),
      riskScore: Math.random() * 100,
    }
  })
}

export function generateTimeSeriesData(points = 24) {
  const now = Date.now()
  return Array.from({ length: points }, (_, i) => ({
    timestamp: new Date(now - (points - i) * 3600000),
    value: 85 + Math.random() * 15,
  }))
}

export function generateChargebackData(points = 24) {
  const now = Date.now()
  return Array.from({ length: points }, (_, i) => ({
    timestamp: new Date(now - (points - i) * 3600000),
    value: 0.3 + Math.random() * 0.4,
  }))
}

export function generateFraudData(points = 24) {
  const now = Date.now()
  return Array.from({ length: points }, (_, i) => ({
    timestamp: new Date(now - (points - i) * 3600000),
    detected: Math.floor(Math.random() * 50),
    prevented: Math.floor(Math.random() * 45),
  }))
}

export class TransactionStream {
  private listeners: Array<(transaction: Transaction) => void> = []

  subscribe(callback: (transaction: Transaction) => void) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback)
    }
  }

  start() {
    // Generate a new transaction every 2-5 seconds
    const generateTransaction = () => {
      const transaction = generateMockTransactions(1)[0]
      this.listeners.forEach((listener) => listener(transaction))

      const nextDelay = 2000 + Math.random() * 3000
      setTimeout(generateTransaction, nextDelay)
    }

    generateTransaction()
  }
}

export interface MerchantPerformance {
  merchantId: string
  merchantName: string
  totalTransactions: number
  approvalRate: number
  chargebackCount: number
  fraudCount: number
  totalVolume: number
  riskScore: number
  category: string
}

export function generateMerchantPerformance(count = 20): MerchantPerformance[] {
  const merchants = [
    "TechStore Inc",
    "Fashion Boutique",
    "Global Electronics",
    "Premium Goods Co",
    "Digital Services Ltd",
    "Retail Express",
    "Luxury Brands",
    "Quick Shop",
    "Home Essentials",
    "Sports Gear Pro",
    "Beauty & Wellness",
    "Auto Parts Direct",
    "Book Haven",
    "Gourmet Foods",
    "Pet Supplies Plus",
    "Garden Center",
    "Office Depot Pro",
    "Music Store",
    "Toy Kingdom",
    "Jewelry Gallery",
  ]

  const categories = ["Retail", "E-commerce", "Travel", "Food & Dining", "Entertainment", "Services"]

  return merchants.slice(0, count).map((name, i) => {
    const totalTransactions = Math.floor(10000 + Math.random() * 90000)
    const approvalRate = 85 + Math.random() * 12
    const chargebackCount = Math.floor(totalTransactions * (0.002 + Math.random() * 0.008))
    const fraudCount = Math.floor(totalTransactions * (0.001 + Math.random() * 0.004))
    const totalVolume = totalTransactions * (100 + Math.random() * 900)

    // Calculate risk score based on chargeback and fraud rates
    const chargebackRate = (chargebackCount / totalTransactions) * 100
    const fraudRate = (fraudCount / totalTransactions) * 100
    const riskScore = Math.min(100, chargebackRate * 40 + fraudRate * 60 + (100 - approvalRate) * 2)

    return {
      merchantId: `MER-${String(i + 1).padStart(4, "0")}`,
      merchantName: name,
      totalTransactions,
      approvalRate,
      chargebackCount,
      fraudCount,
      totalVolume,
      riskScore,
      category: categories[Math.floor(Math.random() * categories.length)],
    }
  })
}

export interface SystemMetrics {
  timestamp: Date
  cpuUsage: number
  memoryUsage: number
  kafkaThroughput: number
  sparkProcessingTime: number
  sqlQueryTime: number
  activeConnections: number
}

export function generateSystemMetrics(points = 24): SystemMetrics[] {
  const now = Date.now()
  return Array.from({ length: points }, (_, i) => ({
    timestamp: new Date(now - (points - i) * 3600000),
    cpuUsage: 40 + Math.random() * 30,
    memoryUsage: 50 + Math.random() * 25,
    kafkaThroughput: 35000 + Math.random() * 10000,
    sparkProcessingTime: 5 + Math.random() * 5,
    sqlQueryTime: 2 + Math.random() * 3,
    activeConnections: 800 + Math.floor(Math.random() * 400),
  }))
}

export interface Alert {
  id: string
  severity: "critical" | "warning" | "info"
  type: "fraud" | "chargeback" | "system" | "compliance"
  message: string
  timestamp: Date
  merchantId?: string
  resolved: boolean
}

export function generateAlerts(count = 5): Alert[] {
  const alertTemplates = [
    {
      severity: "critical" as const,
      type: "fraud" as const,
      message: "Unusual fraud pattern detected - multiple declined transactions from same IP",
    },
    {
      severity: "warning" as const,
      type: "chargeback" as const,
      message: "Chargeback ratio approaching threshold (0.48%)",
    },
    {
      severity: "critical" as const,
      type: "fraud" as const,
      message: "High-risk merchant exceeded fraud limit",
    },
    {
      severity: "warning" as const,
      type: "system" as const,
      message: "Pipeline latency increased to 45 seconds",
    },
    {
      severity: "info" as const,
      type: "compliance" as const,
      message: "Monthly compliance report ready for review",
    },
  ]

  return Array.from({ length: count }, (_, i) => {
    const template = alertTemplates[i % alertTemplates.length]
    return {
      id: `ALT-${Date.now()}-${i}`,
      ...template,
      timestamp: new Date(Date.now() - Math.random() * 7200000),
      merchantId:
        Math.random() > 0.5 ? `MER-${String(Math.floor(Math.random() * 20) + 1).padStart(4, "0")}` : undefined,
      resolved: Math.random() > 0.6,
    }
  })
}
