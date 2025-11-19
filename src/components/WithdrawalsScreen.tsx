import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Copy, Users, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

interface Withdrawal {
  id: string;
  userName: string;
  userId: string;
  teamAmount: string;
  withdrawBefore: string;
  walletAddress: string;
  status: "pending" | "approved" | "rejected";
}

const mockWithdrawals: Withdrawal[] = [
  {
    id: "W001",
    userName: "John Doe",
    userId: "U001",
    teamAmount: "$2,500",
    withdrawBefore: "$800",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    status: "pending"
  },
  {
    id: "W002",
    userName: "Jane Smith",
    userId: "U002",
    teamAmount: "$5,200",
    withdrawBefore: "$1,500",
    walletAddress: "0x892d35Cc6634C0532925a3b844Bc9e7595f0cDe",
    status: "pending"
  },
  {
    id: "W003",
    userName: "Alice Williams",
    userId: "U004",
    teamAmount: "$8,900",
    withdrawBefore: "$3,200",
    walletAddress: "0x992d35Cc6634C0532925a3b844Bc9e7595f0fGh",
    status: "approved"
  },
  {
    id: "W004",
    userName: "Bob Johnson",
    userId: "U003",
    teamAmount: "$1,200",
    withdrawBefore: "$400",
    walletAddress: "0x112d35Cc6634C0532925a3b844Bc9e7595f0iJk",
    status: "rejected"
  },
];

export function WithdrawalsScreen() {
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [activeTab, setActiveTab] = useState("pending");

  const filteredWithdrawals = withdrawals.filter(w => w.status === activeTab);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard!");
  };

  const handleApprove = (id: string) => {
    setWithdrawals(withdrawals.map(w => 
      w.id === id ? { ...w, status: "approved" as const } : w
    ));
    toast.success("Withdrawal approved!");
  };

  const handleReject = (id: string) => {
    setWithdrawals(withdrawals.map(w => 
      w.id === id ? { ...w, status: "rejected" as const } : w
    ));
    toast.error("Withdrawal rejected!");
  };

  const handleApproveAll = () => {
    setWithdrawals(withdrawals.map(w => 
      w.status === "pending" ? { ...w, status: "approved" as const } : w
    ));
    toast.success("All pending withdrawals approved!");
  };

  const handleRejectAll = () => {
    setWithdrawals(withdrawals.map(w => 
      w.status === "pending" ? { ...w, status: "rejected" as const } : w
    ));
    toast.error("All pending withdrawals rejected!");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Withdrawals Management</h1>
          <p className="text-muted-foreground">Review and process withdrawal requests</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-success text-success hover:bg-success/10"
            onClick={handleApproveAll}
          >
            <Check className="mr-2 h-4 w-4" />
            Approve All
          </Button>
          <Button 
            variant="outline" 
            className="border-destructive text-destructive hover:bg-destructive/10"
            onClick={handleRejectAll}
          >
            <X className="mr-2 h-4 w-4" />
            Reject All
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted">
          <TabsTrigger value="pending">
            Pending ({withdrawals.filter(w => w.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({withdrawals.filter(w => w.status === "approved").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({withdrawals.filter(w => w.status === "rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWithdrawals.map((withdrawal) => (
              <Card key={withdrawal.id} className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{withdrawal.userName}</CardTitle>
                    {withdrawal.status === "pending" && (
                      <Badge variant="outline" className="text-primary border-primary">Pending</Badge>
                    )}
                    {withdrawal.status === "approved" && (
                      <Badge className="bg-success text-success-foreground">Approved</Badge>
                    )}
                    {withdrawal.status === "rejected" && (
                      <Badge className="bg-destructive">Rejected</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">User ID</span>
                      <span className="text-sm">{withdrawal.userId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Team Amount</span>
                      <span className="text-sm text-primary">{withdrawal.teamAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Withdraw Before</span>
                      <span className="text-sm">{withdrawal.withdrawBefore}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Wallet Address</p>
                    <div className="flex items-center gap-2 bg-muted/50 p-2 rounded">
                      <p className="text-xs flex-1 truncate">{withdrawal.walletAddress}</p>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(withdrawal.walletAddress)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => alert(`Viewing team for ${withdrawal.userName}`)}
                    >
                      <Users className="mr-1 h-3 w-3" />
                      See Team
                    </Button>
                    {withdrawal.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                          onClick={() => handleApprove(withdrawal.id)}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-destructive hover:bg-destructive/90"
                          onClick={() => handleReject(withdrawal.id)}
                        >
                          <X className="mr-1 h-3 w-3" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWithdrawals.length === 0 && (
            <Card className="shadow-lg">
              <CardContent className="text-center py-12 text-muted-foreground">
                No {activeTab} withdrawals found
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}