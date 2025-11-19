import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Pencil } from "lucide-react";
import { toast } from "sonner";

interface TeamLevel {
  id: string;
  level: string;
  profitPercentage: string;
  requiredMembers: string;
}

const mockLevels: TeamLevel[] = [
  { id: "1", level: "Level 1", profitPercentage: "5%", requiredMembers: "5" },
  { id: "2", level: "Level 2", profitPercentage: "3%", requiredMembers: "10" },
  { id: "3", level: "Level 3", profitPercentage: "2%", requiredMembers: "20" },
  { id: "4", level: "Level 4", profitPercentage: "1.5%", requiredMembers: "50" },
  { id: "5", level: "Level 5", profitPercentage: "1%", requiredMembers: "100" },
];

export function TeamLevels() {
  const [levels, setLevels] = useState(mockLevels);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<TeamLevel | null>(null);
  const [formData, setFormData] = useState({
    level: "",
    profitPercentage: "",
    requiredMembers: ""
  });

  const handleAdd = () => {
    const newLevel: TeamLevel = {
      id: String(levels.length + 1),
      ...formData
    };
    setLevels([...levels, newLevel]);
    setIsAddOpen(false);
    resetForm();
    toast.success("Team level added successfully!");
  };

  const handleEdit = (level: TeamLevel) => {
    setEditingLevel(level);
    setFormData({
      level: level.level,
      profitPercentage: level.profitPercentage,
      requiredMembers: level.requiredMembers
    });
  };

  const handleUpdate = () => {
    if (editingLevel) {
      setLevels(levels.map(l => l.id === editingLevel.id ? { ...l, ...formData } : l));
      setEditingLevel(null);
      resetForm();
      toast.success("Team level updated successfully!");
    }
  };

  const resetForm = () => {
    setFormData({
      level: "",
      profitPercentage: "",
      requiredMembers: ""
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Team Levels</h1>
          <p className="text-muted-foreground">Configure team level rewards and requirements</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Level
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>Add New Level</DialogTitle>
              <DialogDescription>Create a new team level configuration</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Level</Label>
                <Input
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  placeholder="e.g., Level 6"
                  className="bg-input-background"
                />
              </div>
              <div>
                <Label>Profit Percentage</Label>
                <Input
                  value={formData.profitPercentage}
                  onChange={(e) => setFormData({ ...formData, profitPercentage: e.target.value })}
                  placeholder="e.g., 2.5%"
                  className="bg-input-background"
                />
              </div>
              <div>
                <Label>Required Members</Label>
                <Input
                  value={formData.requiredMembers}
                  onChange={(e) => setFormData({ ...formData, requiredMembers: e.target.value })}
                  placeholder="e.g., 150"
                  className="bg-input-background"
                />
              </div>
              <Button onClick={handleAdd} className="w-full bg-success text-success-foreground hover:bg-success/90">
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-lg overflow-hidden">
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Level</TableHead>
                <TableHead>Profit Percentage</TableHead>
                <TableHead>Required Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.map((level) => (
                <TableRow key={level.id} className="hover:bg-muted/30">
                  <TableCell>{level.level}</TableCell>
                  <TableCell className="text-success">{level.profitPercentage}</TableCell>
                  <TableCell className="text-primary">{level.requiredMembers}</TableCell>
                  <TableCell className="text-right">
                    <Dialog open={editingLevel?.id === level.id} onOpenChange={(open) => !open && setEditingLevel(null)}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(level)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card">
                        <DialogHeader>
                          <DialogTitle>Update Level</DialogTitle>
                          <DialogDescription>Modify team level configuration</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Level</Label>
                            <Input
                              value={formData.level}
                              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                              className="bg-input-background"
                            />
                          </div>
                          <div>
                            <Label>Profit Percentage</Label>
                            <Input
                              value={formData.profitPercentage}
                              onChange={(e) => setFormData({ ...formData, profitPercentage: e.target.value })}
                              className="bg-input-background"
                            />
                          </div>
                          <div>
                            <Label>Required Members</Label>
                            <Input
                              value={formData.requiredMembers}
                              onChange={(e) => setFormData({ ...formData, requiredMembers: e.target.value })}
                              className="bg-input-background"
                            />
                          </div>
                          <Button onClick={handleUpdate} className="w-full bg-success text-success-foreground hover:bg-success/90">
                            Confirm
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h3 className="mb-4">Level System Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground text-sm">Total Levels</p>
              <p className="text-2xl text-primary mt-1">{levels.length}</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground text-sm">Max Profit %</p>
              <p className="text-2xl text-success mt-1">
                {Math.max(...levels.map(l => parseFloat(l.profitPercentage)))}%
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground text-sm">Max Required Members</p>
              <p className="text-2xl text-primary mt-1">
                {Math.max(...levels.map(l => parseInt(l.requiredMembers)))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}