import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Network, DollarSign, Wallet } from "lucide-react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const chartData = [
  { month: 'Jan', invested: 980000, withdrawn: 245000 },
  { month: 'Feb', invested: 1120000, withdrawn: 298000 },
  { month: 'Mar', invested: 1450000, withdrawn: 342000 },
  { month: 'Apr', invested: 1680000, withdrawn: 389000 },
  { month: 'May', invested: 1920000, withdrawn: 425000 },
  { month: 'Jun', invested: 2150000, withdrawn: 468000 },
];

export function NetworkStats() {
  const [stats, setStats] = useState({
    networkMembers: "2,245",
    investedAmount: "$12,450,000",
    withdrawAmount: "$3,280,000"
  });

  const [formData, setFormData] = useState(stats);

  const handleUpdate = () => {
    setStats(formData);
    toast.success("Network stats updated successfully!");
  };

  return (
    <div className="p-6 space-y-6 animate-fadeInUp">
      <div>
        <h1>Network Statistics</h1>
        <p className="text-muted-foreground">View and update network-wide statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg card-hover border-border/50 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Network Members</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Network className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-primary">{stats.networkMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">Total registered members</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg card-hover border-border/50 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Invested Amount</CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-success">{stats.investedAmount}</div>
            <p className="text-xs text-muted-foreground mt-1">Total investments</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg card-hover border-border/50 bg-gradient-to-br from-card to-card/80">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Withdraw Amount</CardTitle>
            <div className="p-2 rounded-lg bg-destructive/10">
              <Wallet className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-destructive">{stats.withdrawAmount}</div>
            <p className="text-xs text-muted-foreground mt-1">Total withdrawals</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle>Investment vs Withdraw Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2a48" />
                <XAxis dataKey="month" stroke="#AAB3C1" />
                <YAxis stroke="#AAB3C1" />
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
                <Bar dataKey="invested" fill="#27AE60" name="Invested" radius={[8, 8, 0, 0]} />
                <Bar dataKey="withdrawn" fill="#E63946" name="Withdrawn" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle>Update Network Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Network Members</Label>
              <Input
                value={formData.networkMembers}
                onChange={(e) => setFormData({ ...formData, networkMembers: e.target.value })}
                placeholder="e.g., 2,245"
                className="bg-input-background border-border"
              />
            </div>

            <div>
              <Label>Invested Amount</Label>
              <Input
                value={formData.investedAmount}
                onChange={(e) => setFormData({ ...formData, investedAmount: e.target.value })}
                placeholder="e.g., $12,450,000"
                className="bg-input-background border-border"
              />
            </div>

            <div>
              <Label>Withdraw Amount</Label>
              <Input
                value={formData.withdrawAmount}
                onChange={(e) => setFormData({ ...formData, withdrawAmount: e.target.value })}
                placeholder="e.g., $3,280,000"
                className="bg-input-background border-border"
              />
            </div>
          </div>

          <Button onClick={handleUpdate} className="bg-success text-success-foreground hover:bg-success/90 btn-success-glow">
            Update Statistics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}