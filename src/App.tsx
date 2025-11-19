import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { LoginScreen } from "./components/LoginScreen";
import { SignupScreen } from "./components/SignupScreen";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { DashboardScreen } from "./components/DashboardScreen";
import { UsersScreen } from "./components/UsersScreen";
import { UserProfile } from "./components/UserProfile";
import { PlansScreen } from "./components/PlansScreen";
import { WithdrawalsScreen } from "./components/WithdrawalsScreen";
import { TeamDetails } from "./components/TeamDetails";
import { NetworkStats } from "./components/NetworkStats";
import { FinancialStats } from "./components/FinancialStats";
import { AnnounceWinner } from "./components/AnnounceWinner";
import { AddPoster } from "./components/AddPoster";
import { ChatScreen } from "./components/ChatScreen";
import { TeamLevels } from "./components/TeamLevels";

type Screen = 
  | "dashboard" 
  | "users" 
  | "plans" 
  | "withdrawals" 
  | "network" 
  | "financial" 
  | "announce" 
  | "poster" 
  | "chat" 
  | "levels"
  | "userProfile"
  | "teamDetails";

type AuthScreen = "login" | "signup";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthScreen("login");
    setCurrentScreen("dashboard");
  };
  
  const handleSwitchToSignup = () => {
    setAuthScreen("signup");
  };

  const handleSwitchToLogin = () => {
    setAuthScreen("login");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setCurrentScreen("userProfile");
  };

  const handleViewTeam = (userId: string) => {
    setSelectedUserId(userId);
    setCurrentScreen("teamDetails");
  };

  const handleBack = () => {
    setCurrentScreen("users");
    setSelectedUserId(null);
  };

  const handleBackToWithdrawals = () => {
    setCurrentScreen("withdrawals");
    setSelectedUserId(null);
  };

  if (!isLoggedIn) {
    return (
      <>
        {authScreen === "login" ? (
          <LoginScreen onLogin={handleLogin} onSwitchToSignup={handleSwitchToSignup} />
        ) : (
          <SignupScreen onSignup={handleSignup} onSwitchToLogin={handleSwitchToLogin} />
        )}
        <Toaster />
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar onLogout={handleLogout} currentScreen={currentScreen} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto bg-background">
          {currentScreen === "dashboard" && (
            <DashboardScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === "users" && (
            <UsersScreen onViewProfile={handleViewProfile} />
          )}
          {currentScreen === "userProfile" && selectedUserId && (
            <UserProfile userId={selectedUserId} onBack={handleBack} />
          )}
          {currentScreen === "plans" && <PlansScreen />}
          {currentScreen === "withdrawals" && <WithdrawalsScreen />}
          {currentScreen === "teamDetails" && selectedUserId && (
            <TeamDetails userId={selectedUserId} onBack={handleBackToWithdrawals} />
          )}
          {currentScreen === "network" && <NetworkStats />}
          {currentScreen === "financial" && <FinancialStats />}
          {currentScreen === "announce" && <AnnounceWinner />}
          {currentScreen === "poster" && <AddPoster />}
          {currentScreen === "chat" && <ChatScreen />}
          {currentScreen === "levels" && <TeamLevels />}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}