import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Pencil, Trash2, TrendingUp, DollarSign, Percent } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  minAmount: string;
  directProfit: string;
  totalPayout: string;
  dailyPercentage: string;
}

const mockPlans: Plan[] = [
  { id: "1", name: "Starter Plan", minAmount: "$100", directProfit: "5%", totalPayout: "150%", dailyPercentage: "1.5%" },
  { id: "2", name: "Bronze Plan", minAmount: "$500", directProfit: "7%", totalPayout: "180%", dailyPercentage: "2%" },
  { id: "3", name: "Silver Plan", minAmount: "$1,000", directProfit: "10%", totalPayout: "200%", dailyPercentage: "2.5%" },
  { id: "4", name: "Gold Plan", minAmount: "$5,000", directProfit: "12%", totalPayout: "250%", dailyPercentage: "3%" },
  { id: "5", name: "Platinum Plan", minAmount: "$10,000", directProfit: "15%", totalPayout: "300%", dailyPercentage: "3.5%" },
];

export function PlansScreen() {
  const [plans, setPlans] = useState(mockPlans);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    minAmount: "",
    directProfit: "",
    totalPayout: "",
    dailyPercentage: ""
  });

  const handleAdd = () => {
    const newPlan: Plan = {
      id: String(plans.length + 1),
      ...formData
    };
    setPlans([...plans, newPlan]);
    setIsAddOpen(false);
    resetForm();
    toast.success("Plan added successfully!");
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      minAmount: plan.minAmount,
      directProfit: plan.directProfit,
      totalPayout: plan.totalPayout,
      dailyPercentage: plan.dailyPercentage
    });
  };

  const handleUpdate = () => {
    if (editingPlan) {
      setPlans(plans.map(p => p.id === editingPlan.id ? { ...p, ...formData } : p));
      setEditingPlan(null);
      resetForm();
      toast.success("Plan updated successfully!");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(p => p.id !== id));
      toast.success("Plan deleted!");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      minAmount: "",
      directProfit: "",
      totalPayout: "",
      dailyPercentage: ""
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fadeInUp">
      <div className="flex items-center justify-between">
        <div>
          <h1>Plans Management</h1>
          <p className="text-muted-foreground">Create and manage investment plans</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-success text-success-foreground hover:bg-success/90 btn-success-glow">
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Plan</DialogTitle>
              <DialogDescription>Create a new investment plan</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Plan Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Diamond Plan"
                  className="bg-input-background border-border"
                />
              </div>
              <div>
                <Label>Minimum Amount</Label>
                <Input
                  value={formData.minAmount}
                  onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                  placeholder="e.g., $1,000"
                  className="bg-input-background border-border"
                />
              </div>
              <div>
                <Label>Direct Profit</Label>
                <Input
                  value={formData.directProfit}
                  onChange={(e) => setFormData({ ...formData, directProfit: e.target.value })}
                  placeholder="e.g., 10%"
                  className="bg-input-background border-border"
                />
              </div>
              <div>
                <Label>Total Payout</Label>
                <Input
                  value={formData.totalPayout}
                  onChange={(e) => setFormData({ ...formData, totalPayout: e.target.value })}
                  placeholder="e.g., 200%"
                  className="bg-input-background border-border"
                />
              </div>
              <div>
                <Label>Daily Percentage</Label>
                <Input
                  value={formData.dailyPercentage}
                  onChange={(e) => setFormData({ ...formData, dailyPercentage: e.target.value })}
                  placeholder="e.g., 2.5%"
                  className="bg-input-background border-border"
                />
              </div>
              <Button onClick={handleAdd} className="w-full bg-success text-success-foreground hover:bg-success/90">
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="shadow-lg card-hover border-border/50 bg-gradient-to-br from-card to-card/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-primary">{plan.name}</CardTitle>
                  <Badge className="mt-2 bg-primary/20 text-primary border-0">Active</Badge>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Min Amount</span>
                  <span className="text-primary">{plan.minAmount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Direct Profit</span>
                  <span className="text-success flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {plan.directProfit}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Total Payout</span>
                  <span className="flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    {plan.totalPayout}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Daily %</span>
                  <span className="text-info">{plan.dailyPercentage}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog open={editingPlan?.id === plan.id} onOpenChange={(open) => !open && setEditingPlan(null)}>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                      onClick={() => handleEdit(plan)}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle>Edit Plan</DialogTitle>
                      <DialogDescription>Update plan details</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Plan Name</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-input-background border-border"
                        />
                      </div>
                      <div>
                        <Label>Minimum Amount</Label>
                        <Input
                          value={formData.minAmount}
                          onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                          className="bg-input-background border-border"
                        />
                      </div>
                      <div>
                        <Label>Direct Profit</Label>
                        <Input
                          value={formData.directProfit}
                          onChange={(e) => setFormData({ ...formData, directProfit: e.target.value })}
                          className="bg-input-background border-border"
                        />
                      </div>
                      <div>
                        <Label>Total Payout</Label>
                        <Input
                          value={formData.totalPayout}
                          onChange={(e) => setFormData({ ...formData, totalPayout: e.target.value })}
                          className="bg-input-background border-border"
                        />
                      </div>
                      <div>
                        <Label>Daily Percentage</Label>
                        <Input
                          value={formData.dailyPercentage}
                          onChange={(e) => setFormData({ ...formData, dailyPercentage: e.target.value })}
                          className="bg-input-background border-border"
                        />
                      </div>
                      <Button onClick={handleUpdate} className="w-full bg-success text-success-foreground hover:bg-success/90">
                        Confirm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(plan.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}