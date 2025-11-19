import { Bell, User, LogOut, ChevronDown, Search, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useState } from "react";

interface NavbarProps {
  onLogout: () => void;
  currentScreen: string;
}

export function Navbar({ onLogout, currentScreen }: NavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const getScreenTitle = (screen: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      users: "Users",
      userProfile: "User Profile",
      plans: "Plans",
      withdrawals: "Withdrawals",
      teamDetails: "Team Details",
      network: "Network Stats",
      financial: "Financial Stats",
      announce: "Announce Winner",
      poster: "Add Poster",
      chat: "Chat",
      levels: "Team Levels"
    };
    return titles[screen] || "Dashboard";
  };

  return (
    <div className="h-16 floating-navbar border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <h1 className="text-primary bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
          Miner X Global
        </h1>
        
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">{getScreenTitle(currentScreen)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 w-64 bg-input-background border-border focus-visible:ring-primary"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-muted transition-colors"
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive border-0">
            3
          </Badge>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="hover:bg-muted transition-colors"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-muted transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-yellow-400 flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden md:inline">Admin User</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="hover:bg-muted cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout} className="text-destructive hover:bg-destructive/10 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}