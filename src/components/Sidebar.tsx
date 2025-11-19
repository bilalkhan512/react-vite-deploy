import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Wallet, 
  Network, 
  DollarSign, 
  Trophy, 
  ImagePlus, 
  MessageSquare, 
  Layers,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "users", label: "Users", icon: Users },
  { id: "plans", label: "Plans", icon: CreditCard },
  { id: "withdrawals", label: "Withdrawals", icon: Wallet },
  { id: "network", label: "Network Stats", icon: Network },
  { id: "financial", label: "Financial Stats", icon: DollarSign },
  { id: "announce", label: "Announce Winner", icon: Trophy },
  { id: "poster", label: "Add Poster", icon: ImagePlus },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "levels", label: "Team Levels", icon: Layers },
];

export function Sidebar({ currentScreen, onNavigate, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-sidebar border-r border-sidebar-border h-full flex flex-col transition-all duration-300 ease-in-out relative`}>
      <div className={`p-6 border-b border-sidebar-border flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && <h2 className="text-primary">Admin Panel</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-sidebar-accent transition-colors"
        >
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start px-6'} py-3 rounded-none transition-all duration-250 sidebar-hover ${
                isActive ? "sidebar-active text-primary" : "text-foreground"
              }`}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''} ${!isCollapsed ? 'mr-3' : ''}`} />
              {!isCollapsed && item.label}
            </Button>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors`}
          onClick={onLogout}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className={`h-5 w-5 ${!isCollapsed ? 'mr-3' : ''}`} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}