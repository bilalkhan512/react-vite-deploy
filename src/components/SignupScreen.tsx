import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { UserPlus, Upload, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SignupScreenProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export function SignupScreen({ onSignup, onSwitchToLogin }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Mock signup - in real app, would send data to server
      onSignup();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-bg relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-info rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-success/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <Card className="w-full max-w-2xl shadow-2xl border-border/50 backdrop-blur-sm bg-card/95 relative z-10 card-hover">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-yellow-400 flex items-center justify-center shadow-lg">
            <UserPlus className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
            Create Admin Account
          </CardTitle>
          <CardDescription>Join the Miner X Global Admin Team</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-all">
                  {profileImage ? (
                    <ImageWithFallback
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center">
                      <UserPlus className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="profile-upload" 
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-all shadow-lg"
                >
                  <Upload className="h-4 w-4" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">Upload profile picture (optional)</p>
            </div>

            {/* Form Fields in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className={`bg-input-background border-border focus-visible:ring-primary transition-all ${
                    errors.fullName ? "border-destructive" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@minerx.global"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`bg-input-background border-border focus-visible:ring-primary transition-all ${
                    errors.email ? "border-destructive" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`bg-input-background border-border focus-visible:ring-primary transition-all ${
                    errors.phone ? "border-destructive" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`bg-input-background border-border focus-visible:ring-primary transition-all pr-10 ${
                      errors.password ? "border-destructive" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className={`bg-input-background border-border focus-visible:ring-primary transition-all pr-10 ${
                      errors.confirmPassword ? "border-destructive" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-muted/30 rounded-lg p-3 border border-border/30">
              <p className="text-xs text-muted-foreground mb-2">Password must contain:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 8 ? "bg-success" : "bg-muted-foreground"}`}></span>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-success" : "bg-muted-foreground"}`}></span>
                  One uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(formData.password) ? "bg-success" : "bg-muted-foreground"}`}></span>
                  One number
                </li>
              </ul>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-success text-success-foreground hover:bg-success/90 btn-success-glow transition-all"
            >
              Create Account
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
