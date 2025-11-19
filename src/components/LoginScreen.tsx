import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Lock } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export function LoginScreen({ onLogin, onSwitchToSignup }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, would validate credentials
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-info rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Card className="w-full max-w-md shadow-2xl border-border/50 backdrop-blur-sm bg-card/95 relative z-10 card-hover">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-yellow-400 flex items-center justify-center shadow-lg">
            <Lock className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
            Miner X Global
          </CardTitle>
          <CardDescription>Admin Dashboard Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@minerx.global"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input-background border-border focus-visible:ring-primary transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input-background border-border focus-visible:ring-primary transition-all"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-success text-success-foreground hover:bg-success/90 btn-success-glow transition-all"
            >
              Login
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}