import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TeamDetailsProps {
  userId: string;
  onBack: () => void;
}

const mockTeamData = {
  levels: [
    { level: 1, members: 12, deposit: "$45,000", adminDeposit: "$5,000" },
    { level: 2, members: 35, deposit: "$128,000", adminDeposit: "$12,000" },
    { level: 3, members: 82, deposit: "$285,000", adminDeposit: "$28,000" },
    { level: 4, members: 156, deposit: "$512,000", adminDeposit: "$48,000" },
    { level: 5, members: 234, deposit: "$890,000", adminDeposit: "$85,000" },
  ],
  totals: {
    totalUsers: 519,
    adminDeposit: "$178,000",
    totalDeposit: "$1,860,000"
  }
};

export function TeamDetails({ userId, onBack }: TeamDetailsProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1>Team Details</h1>
          <p className="text-muted-foreground">User ID: {userId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-primary">{mockTeamData.totals.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all levels</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Admin Deposit Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-success">{mockTeamData.totals.adminDeposit}</div>
            <p className="text-xs text-muted-foreground mt-1">Total admin contributions</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-primary">{mockTeamData.totals.totalDeposit}</div>
            <p className="text-xs text-muted-foreground mt-1">Combined team investment</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Team Deposit by Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Level</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Deposit</TableHead>
                  <TableHead>Admin Deposit</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeamData.levels.map((level) => {
                  const deposit = parseFloat(level.deposit.replace(/[$,]/g, ''));
                  const adminDeposit = parseFloat(level.adminDeposit.replace(/[$,]/g, ''));
                  const total = deposit + adminDeposit;
                  
                  return (
                    <TableRow key={level.level} className="hover:bg-muted/30">
                      <TableCell>Level {level.level}</TableCell>
                      <TableCell className="text-primary">{level.members}</TableCell>
                      <TableCell className="text-success">{level.deposit}</TableCell>
                      <TableCell>{level.adminDeposit}</TableCell>
                      <TableCell className="text-primary">${total.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-muted/50">
                  <TableCell>Grand Total</TableCell>
                  <TableCell className="text-primary">{mockTeamData.totals.totalUsers}</TableCell>
                  <TableCell className="text-success">
                    ${mockTeamData.levels.reduce((sum, l) => 
                      sum + parseFloat(l.deposit.replace(/[$,]/g, '')), 0
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>{mockTeamData.totals.adminDeposit}</TableCell>
                  <TableCell className="text-primary">{mockTeamData.totals.totalDeposit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
