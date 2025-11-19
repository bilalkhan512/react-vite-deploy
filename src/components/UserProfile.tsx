import { ArrowLeft, User, Trash2, DollarSign, Coins } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface UserProfileProps {
  userId: string;
  onBack: () => void;
}

export function UserProfile({ userId, onBack }: UserProfileProps) {
  const mockUser = {
    id: userId,
    name: "John Doe",
    email: "john@example.com",
    password: "********",
    phone: "+1 234 567 8900",
    deposit: "$5,000.00",
    profit: "$1,250.00",
    adminDeposit: "$500.00",
    totalWithdraw: "$800.00",
    token: "250 MXG",
    referralCode: "MXG-JD-2024",
    status: "active"
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1>User Profile</h1>
          <p className="text-muted-foreground">View and manage user details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3>{mockUser.name}</h3>
                <p className="text-muted-foreground">{mockUser.email}</p>
                <Badge className="mt-2 bg-success">Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>User ID</Label>
                <Input value={mockUser.id} readOnly className="bg-input-background" />
              </div>
              
              <div>
                <Label>Name</Label>
                <Input value={mockUser.name} className="bg-input-background" />
              </div>
              
              <div>
                <Label>Email</Label>
                <Input value={mockUser.email} type="email" className="bg-input-background" />
              </div>
              
              <div>
                <Label>Phone</Label>
                <Input value={mockUser.phone} className="bg-input-background" />
              </div>
              
              <div>
                <Label>Password</Label>
                <Input value={mockUser.password} type="password" className="bg-input-background" />
              </div>
              
              <div>
                <Label>Referral Code</Label>
                <Input value={mockUser.referralCode} readOnly className="bg-input-background" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm">Financial Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Deposit</span>
                <span className="text-primary">{mockUser.deposit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Profit</span>
                <span className="text-success">{mockUser.profit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Admin Deposit</span>
                <span>{mockUser.adminDeposit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Withdraw</span>
                <span>{mockUser.totalWithdraw}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Token</span>
                <span className="text-primary">{mockUser.token}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-success text-success-foreground hover:bg-success/90">
                <DollarSign className="mr-2 h-4 w-4" />
                Top Up User
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Coins className="mr-2 h-4 w-4" />
                Top Up Tokens
              </Button>
              <Button className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
