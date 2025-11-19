import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card } from "./ui/card";
import { Search, Wallet, Users as UsersIcon, Ban } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface UsersScreenProps {
  onViewProfile: (userId: string) => void;
}

const mockUsers = [
  { id: "U001", name: "John Doe", email: "john@example.com", balance: "$1,250.00", profit: "$350.00", status: "active" },
  { id: "U002", name: "Jane Smith", email: "jane@example.com", balance: "$2,100.00", profit: "$580.00", status: "active" },
  { id: "U003", name: "Bob Johnson", email: "bob@example.com", balance: "$850.00", profit: "$120.00", status: "inactive" },
  { id: "U004", name: "Alice Williams", email: "alice@example.com", balance: "$3,400.00", profit: "$920.00", status: "active" },
  { id: "U005", name: "Charlie Brown", email: "charlie@example.com", balance: "$0.00", profit: "$0.00", status: "blocked" },
  { id: "U006", name: "Diana Prince", email: "diana@example.com", balance: "$5,200.00", profit: "$1,450.00", status: "active" },
  { id: "U007", name: "Ethan Hunt", email: "ethan@example.com", balance: "$1,800.00", profit: "$420.00", status: "withdraw_blocked" },
  { id: "U008", name: "Fiona Gallagher", email: "fiona@example.com", balance: "$990.00", profit: "$180.00", status: "active" },
];

export function UsersScreen({ onViewProfile }: UsersScreenProps) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "active") return matchesSearch && user.status === "active";
    if (filter === "inactive") return matchesSearch && user.status === "inactive";
    if (filter === "blocked") return matchesSearch && user.status === "blocked";
    if (filter === "withdraw_blocked") return matchesSearch && user.status === "withdraw_blocked";
    
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "blocked":
        return <Badge className="bg-destructive">Blocked</Badge>;
      case "withdraw_blocked":
        return <Badge variant="outline" className="text-destructive">Withdraw Blocked</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Users Management</h1>
        <p className="text-muted-foreground">Manage all users and their accounts</p>
      </div>

      <Card className="p-4 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-48 bg-input-background">
              <SelectValue placeholder="Filter users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
              <SelectItem value="withdraw_blocked">Withdraw Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow 
                  key={user.id} 
                  className="hover:bg-muted/30 cursor-pointer"
                  onClick={() => onViewProfile(user.id)}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-primary">{user.balance}</TableCell>
                  <TableCell className="text-success">{user.profit}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Withdraw action for ${user.name}`);
                        }}
                      >
                        <Wallet className="h-4 w-4 mr-1" />
                        Withdraw
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Direct action for ${user.name}`);
                        }}
                      >
                        <UsersIcon className="h-4 w-4 mr-1" />
                        Direct
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Block action for ${user.name}`);
                        }}
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        Block
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No users found matching your criteria
          </div>
        )}
      </Card>
    </div>
  );
}
