import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Server, TrendingUp, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white glow-text">Dashboard</h2>
        <div className="flex items-center space-x-2">
           <span className="text-sm text-muted-foreground">Last updated: Just now</span>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#0b0e14]/60 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$45,231.89</div>
            <p className="text-xs text-emerald-500">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0b0e14]/60 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Rigs</CardTitle>
            <Server className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12 / 16</div>
            <p className="text-xs text-muted-foreground">4 Rigs offline (Fuel Empty)</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0b0e14]/60 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hashrate Output</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">450 MH/s</div>
            <p className="text-xs text-muted-foreground">Generating 0.004 BTC/hr</p>
          </CardContent>
        </Card>
        <Card className="bg-[#0b0e14]/60 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Network Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Bull Market</div>
            <p className="text-xs text-muted-foreground">Sentiment: Extreme Greed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

        {/* Chart Area */}
        <Card className="col-span-4 bg-[#0b0e14]/60 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full flex items-center justify-center border border-dashed border-white/10 rounded-md">
                <span className="text-muted-foreground">Interactive Graph Component Here (Recharts)</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions / Active Rigs List */}
        <Card className="col-span-3 bg-[#0b0e14]/60 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Active Mining Rigs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition">
                        <div className="flex items-center space-x-4">
                            <div className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                            <div>
                                <p className="text-sm font-medium text-white">Rig-Alpha-{i}</p>
                                <p className="text-xs text-muted-foreground">Temp: {i * 15 + 30}°C | Fuel: {i < 4 ? '45%' : '0%'}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-sm font-medium text-white">{i * 10}.5 MH/s</p>
                             <button className="text-xs text-blue-400 hover:text-blue-300 underline">Manage</button>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
