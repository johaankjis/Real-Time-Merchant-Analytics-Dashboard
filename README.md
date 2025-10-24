# Real-Time Merchant Analytics Dashboard

A comprehensive, real-time analytics dashboard for monitoring merchant transactions, risk metrics, and business KPIs. Built with Next.js 16, React 19, and modern web technologies.

## 🚀 Features

### Dashboard Views

- **Overview Dashboard** - Centralized view of all key performance indicators
  - Real-time KPI cards (Approval Rate, Chargeback Ratio, Fraud Rate, Transaction Volume)
  - Live transaction monitoring with 30-second refresh intervals
  - Recent transactions table with risk scoring
  - Alert notifications for critical events
  - Merchant performance tracking

- **Risk Analysis Dashboard** - Dedicated risk monitoring and fraud detection
  - Chargeback trend analysis
  - Fraud detection metrics with ML-powered insights
  - High-risk merchant identification
  - Risk distribution visualization
  - Real-time risk scoring system

- **Business Metrics Dashboard** - Executive-level business intelligence
  - Revenue tracking and target comparison
  - Transaction volume analytics
  - Approval rate trends
  - Customer acquisition metrics
  - Performance vs. target visualization

- **Data Pipeline Dashboard** - Infrastructure monitoring and performance
  - Pipeline latency tracking
  - Throughput metrics (1M+ transactions daily)
  - System health monitoring
  - Processing time analytics
  - Real-time performance indicators

- **Stakeholders Dashboard** - Role-based access and KPI overview
  - Risk Analyst view
  - Business Executive view
  - Data Engineer view
  - Finance Team view
  - Compliance Officer view

### Key Capabilities

- **Real-Time Updates**: Auto-refresh every 30 seconds with live data simulation
- **Interactive Charts**: Built with Recharts for dynamic data visualization
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Role-Based Views**: Customizable dashboards for different stakeholder needs
- **Dark Mode**: Pre-configured dark theme for better visibility
- **Mock Data Generation**: Realistic transaction and KPI simulation

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library with latest features
- **TypeScript 5** - Type-safe development

### UI Components & Styling
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **shadcn/ui** - Pre-built, customizable components
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Utility class merging

### Data Visualization
- **Recharts (latest)** - Composable charting library
- **date-fns 4.1.0** - Date manipulation utilities

### Form Handling & Validation
- **React Hook Form 7.60.0** - Performant form management
- **Zod 3.25.76** - Schema validation
- **@hookform/resolvers 3.10.0** - Form validation integration

### Additional Features
- **next-themes 0.4.6** - Theme management
- **sonner 1.7.4** - Toast notifications
- **@vercel/analytics (latest)** - Analytics integration

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended), npm, or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Real-Time-Merchant-Analytics-Dashboard.git
   cd Real-Time-Merchant-Analytics-Dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality

## 📂 Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── business/                 # Business metrics page
│   ├── pipeline/                 # Data pipeline page
│   ├── risk/                     # Risk analysis page
│   ├── stakeholders/             # Stakeholders page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Home page (Overview)
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components (56+ components)
│   ├── alerts-panel.tsx          # Alert notifications
│   ├── approval-rate-chart.tsx   # Approval rate visualization
│   ├── business-metrics-dashboard.tsx
│   ├── chargeback-chart.tsx      # Chargeback analysis
│   ├── dashboard-layout.tsx      # Main layout with sidebar
│   ├── data-pipeline-dashboard.tsx
│   ├── fraud-detection-chart.tsx # Fraud metrics
│   ├── kpi-card.tsx              # KPI display component
│   ├── merchant-performance-table.tsx
│   ├── overview-dashboard.tsx    # Main overview
│   ├── processing-time-chart.tsx # Performance metrics
│   ├── recent-transactions.tsx   # Transaction list
│   ├── risk-analysis-dashboard.tsx
│   ├── stakeholders-dashboard.tsx
│   ├── system-health-chart.tsx   # System monitoring
│   ├── theme-provider.tsx        # Theme context
│   ├── throughput-chart.tsx      # Throughput visualization
│   └── transaction-chart.tsx     # Transaction trends
│
├── lib/                          # Utility functions
│   ├── mock-data.ts              # Mock data generation
│   └── utils.ts                  # Helper functions
│
├── hooks/                        # Custom React hooks
├── public/                       # Static assets
├── styles/                       # Additional styles
│
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
└── package.json                  # Dependencies and scripts
```

## 🎯 Usage Guide

### Navigation

The dashboard features a sidebar navigation with the following sections:

1. **Overview** (/) - Main dashboard with all key metrics
2. **Risk Analysis** (/risk) - Fraud and chargeback monitoring
3. **Business Metrics** (/business) - Revenue and performance tracking
4. **Data Pipeline** (/pipeline) - Infrastructure monitoring
5. **Stakeholders** (/stakeholders) - Role-based views

### Role Switcher

Use the role dropdown in the top-right corner to view the dashboard from different stakeholder perspectives:
- Risk Analyst
- Business Executive
- Data Engineer
- Finance Team
- Compliance Officer

### Real-Time Updates

- KPIs automatically refresh every 30 seconds
- Charts update with new data points
- Transaction list shows latest activities
- Alert panel displays critical notifications

## 🏗️ Architecture

### Component Architecture

- **Layout Components**: `DashboardLayout` provides consistent sidebar navigation
- **Dashboard Components**: Specialized dashboards for each view
- **Chart Components**: Reusable visualization components
- **UI Components**: Atomic design components from shadcn/ui

### Data Flow

1. **Mock Data Generation**: `lib/mock-data.ts` generates realistic KPI and transaction data
2. **State Management**: React hooks (useState, useEffect) manage component state
3. **Auto-Refresh**: setInterval updates data every 30 seconds
4. **Chart Rendering**: Recharts processes data for visualization

### Styling Approach

- **Tailwind CSS**: Utility-first styling
- **CSS Variables**: Theme customization via CSS custom properties
- **Dark Mode**: Pre-configured dark theme using `next-themes`
- **Responsive Design**: Mobile-first breakpoints (md, lg)

## 🔧 Configuration

### Next.js Configuration (`next.config.mjs`)

```javascript
{
  typescript: {
    ignoreBuildErrors: true  // Build with type warnings
  },
  images: {
    unoptimized: true       // Disable image optimization
  }
}
```

### shadcn/ui Configuration (`components.json`)

- Style: `new-york`
- Base Color: `neutral`
- CSS Variables: Enabled
- Icon Library: `lucide`

### TypeScript Configuration

- Target: ES6
- Strict mode enabled
- Path aliases: `@/*` maps to root directory

## 🎨 Customization

### Adding New KPIs

1. Update the `KPIData` interface in `lib/mock-data.ts`
2. Modify `generateMockKPIs()` to include new metrics
3. Add `KpiCard` components to relevant dashboards

### Creating New Dashboard Views

1. Create page in `app/[view-name]/page.tsx`
2. Create dashboard component in `components/[view-name]-dashboard.tsx`
3. Add navigation item to `dashboard-layout.tsx`
4. Implement charts and KPI cards as needed

### Styling Modifications

- Edit CSS variables in `app/globals.css`
- Modify Tailwind configuration for theme changes
- Update component styles using Tailwind classes

## 📊 Data Structure

### KPI Data Interface

```typescript
interface KPIData {
  approvalRate: number
  approvalRateChange: number
  chargebackRatio: number
  chargebackRatioChange: number
  fraudRate: number
  fraudRateChange: number
  transactionVolume: number
  transactionVolumeChange: number
}
```

### Transaction Interface

```typescript
interface Transaction {
  id: string
  merchant: string
  amount: number
  status: "approved" | "declined" | "pending" | "flagged"
  timestamp: Date
  riskScore: number
}
```

## 🔍 Key Components

### KpiCard
Displays individual key performance indicators with trend indicators and icons.

### TransactionChart
Line chart showing transaction volume trends over time.

### ApprovalRateChart
Visualizes approval rate percentages with historical data.

### ChargebackChart
Tracks chargeback ratios and trends for risk assessment.

### FraudDetectionChart
Displays fraud detection metrics and anomaly patterns.

### MerchantPerformanceTable
Tabular view of merchant statistics and performance metrics.

### RecentTransactions
List of latest transactions with status and risk scores.

### AlertsPanel
Notification panel for critical events and warnings.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings
4. Vercel Analytics automatically configured

### Other Platforms

```bash
# Build production bundle
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

- TypeScript build errors are currently ignored in production builds
- Image optimization is disabled
- Mock data simulates real-time updates
- Dark mode is default theme
- Responsive design optimized for desktop and tablet views

## 🐛 Known Issues

- ESLint may need to be installed globally for linting
- Some TypeScript strict mode errors suppressed
- Mock data used for all visualizations

## 📄 License

This project is private and proprietary.

## 👥 Authors

- [@johaankjis](https://github.com/johaankjis)

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.app)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Charts powered by [Recharts](https://recharts.org)

---

**Version**: 0.1.0  
**Last Updated**: 2025-10-24  
**Status**: Active Development
