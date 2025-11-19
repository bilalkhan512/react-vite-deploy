import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  Award, 
  Users, 
  Crown,
  Wallet 
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const statsData = {
  allTime: {
    organicDeposit: "$8,240,000",
    adminDeposit: "$1,450,000",
    totalWithdraw: "$3,280,000",
    salary: "$425,000",
    roiDistributed: "$1,850,000",
    teamProfit: "$920,000",
    rankReward: "$180,000",
    directIncome: "$540,000"
  },
  today: {
    organicDeposit: "$42,500",
    adminDeposit: "$8,200",
    totalWithdraw: "$18,900",
    salary: "$2,100",
    roiDistributed: "$12,400",
    teamProfit: "$5,800",
    rankReward: "$1,200",
    directIncome: "$3,400"
  },
  week: {
    organicDeposit: "$285,000",
    adminDeposit: "$52,000",
    totalWithdraw: "$124,000",
    salary: "$14,500",
    roiDistributed: "$82,000",
    teamProfit: "$38,000",
    rankReward: "$8,200",
    directIncome: "$22,000"
  },
  month: {
    organicDeposit: "$1,120,000",
    adminDeposit: "$198,000",
    totalWithdraw: "$485,000",
    salary: "$58,000",
    roiDistributed: "$320,000",
    teamProfit: "$148,000",
    rankReward: "$32,000",
    directIncome: "$86,000"
  }
};

const COLORS = ['#27AE60', '#E9B44C', '#0077B6', '#F4A261'];

export function FinancialStats() {
  const [period, setPeriod] = useState<keyof typeof statsData>("allTime");
  const stats = statsData[period];

  const pieData = [
    { name: 'Team Profit', value: parseFloat(stats.teamProfit.replace(/[$,]/g, '')) },
    { name: 'Direct Income', value: parseFloat(stats.directIncome.replace(/[$,]/g, '')) },
    { name: 'ROI Distributed', value: parseFloat(stats.roiDistributed.replace(/[$,]/g, '')) },
    { name: 'Rank Reward', value: parseFloat(stats.rankReward.replace(/[$,]/g, '')) },
  ];

  const statCards = [
    { 
      label: "Organic Deposit", 
      value: stats.organicDeposit, 
      icon: DollarSign, 
      color: "text-success",
      bgColor: "bg-success/10"
    },
    { 
      label: "Admin Deposit", 
      value: stats.adminDeposit, 
      icon: Briefcase, 
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      label: "Total Withdraw", 
      value: stats.totalWithdraw, 
      icon: Wallet, 
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    { 
      label: "Salary", 
      value: stats.salary, 
      icon: TrendingUp, 
      color: "text-info",
      bgColor: "bg-info/10"
    },
    { 
      label: "ROI Distributed", 
      value: stats.roiDistributed, 
      icon: TrendingDown, 
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    { 
      label: "Team Profit", 
      value: stats.teamProfit, 
      icon: Users, 
      color: "text-success",
      bgColor: "bg-success/10"
    },
    { 
      label: "Rank Reward", 
      value: stats.rankReward, 
      icon: Crown, 
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      label: "Direct Income", 
      value: stats.directIncome, 
      icon: Award, 
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fadeInUp">
      <div>
        <h1>Financial Statistics</h1>
        <p className="text-muted-foreground">View comprehensive financial metrics</p>
      </div>

      <Tabs value={period} onValueChange={(v) => setPeriod(v as keyof typeof statsData)}>
        <TabsList className="bg-muted">
          <TabsTrigger value="allTime">All Time</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">7 Days</TabsTrigger>
          <TabsTrigger value="month">30 Days</TabsTrigger>
        </TabsList>

        <TabsContent value={period} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="shadow-lg card-hover border-border/50 bg-gradient-to-br from-card to-card/80">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm">{stat.label}</CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl ${stat.color}`}>{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {period === "allTime" && "Total accumulated"}
                      {period === "today" && "Today's activity"}
                      {period === "week" && "Last 7 days"}
                      {period === "month" && "Last 30 days"}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle>Distribution of Profits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0E1C33', 
                          border: '1px solid #E9B44C',
                          borderRadius: '12px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
                        }}
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3>Income Overview</h3>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Total Deposits</span>
                        <span className="text-success">
                          ${(parseFloat(stats.organicDeposit.replace(/[$,]/g, '')) + 
                             parseFloat(stats.adminDeposit.replace(/[$,]/g, ''))).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Total Income</span>
                        <span className="text-success">
                          ${(parseFloat(stats.directIncome.replace(/[$,]/g, '')) + 
                             parseFloat(stats.teamProfit.replace(/[$,]/g, '')) + 
                             parseFloat(stats.rankReward.replace(/[$,]/g, ''))).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3>Expense Overview</h3>
                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Total Withdrawals</span>
                        <span className="text-destructive">{stats.totalWithdraw}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Total Payouts</span>
                        <span className="text-destructive">
                          ${(parseFloat(stats.roiDistributed.replace(/[$,]/g, '')) + 
                             parseFloat(stats.salary.replace(/[$,]/g, ''))).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}