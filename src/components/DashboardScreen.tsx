import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Users, UserCheck, UserX, Eye, Settings, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

const activityData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 1200 },
  { name: "May", users: 1500 },
  { name: "Jun", users: 1800 },
  { name: "Jul", users: 2200 },
];

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  return (
    <div className="p-6 space-y-6 animate-fadeInUp">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Miner X Global Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg card-hover border-border/50 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Users</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-primary">2,245</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <p className="text-xs text-success">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg card-hover border-border/50 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Active Users</CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <UserCheck className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-success">1,892</div>
            <p className="text-xs text-muted-foreground mt-1">84% of total users</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg card-hover border-border/50 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Inactive Users</CardTitle>
            <div className="p-2 rounded-lg bg-destructive/10">
              <UserX className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-destructive">353</div>
            <p className="text-xs text-muted-foreground mt-1">16% of total users</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle>User Growth Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E9B44C" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E9B44C" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2a48" />
                <XAxis dataKey="name" stroke="#AAB3C1" />
                <YAxis stroke="#AAB3C1" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0E1C33', 
                    border: '1px solid #E9B44C',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
                  }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#E9B44C" 
                  strokeWidth={3}
                  dot={{ fill: '#E9B44C', r: 6, strokeWidth: 2, stroke: '#08152C' }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                  fill="url(#colorUsers)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => onNavigate("users")}
              className="bg-success text-success-foreground hover:bg-success/90 btn-success-glow h-auto py-4 flex flex-col gap-2"
            >
              <Eye className="h-5 w-5" />
              <span>View All Users</span>
            </Button>
            <Button 
              onClick={() => onNavigate("plans")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 h-auto py-4 flex flex-col gap-2"
            >
              <Settings className="h-5 w-5" />
              <span>Manage Plans</span>
            </Button>
            <Button 
              onClick={() => onNavigate("withdrawals")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 h-auto py-4 flex flex-col gap-2"
            >
              <TrendingUp className="h-5 w-5" />
              <span>View Withdrawals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}