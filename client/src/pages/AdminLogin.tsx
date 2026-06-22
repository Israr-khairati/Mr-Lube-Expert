import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = trpc.admin.login.useMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await loginMutation.mutateAsync({
        usernameOrEmail,
        password,
      });
      toast.success("Welcome back, Admin!");
      // Redirect to admin dashboard
      setLocation("/admin");
    } catch (error: any) {
      toast.error(error?.message || "Failed to log in. Please check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Admin Login - MR LUBE EXPERT"
        description="Admin Login Panel for website management."
        canonical="https://mrlubexpert.com/admin/login"
      />
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0C] px-4 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,255,0,0.05),transparent_60%)] pointer-events-none" />
        
        <Card className="w-full max-w-md bg-[#141414] border-border relative z-10 shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-6">
            <CardTitle className="text-3xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk" }}>
              MR LUBE <span className="text-accent">EXPERT</span>
            </CardTitle>
            <CardDescription className="text-secondary-foreground text-sm">
              Enter your administrator credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Username or Email</label>
                <Input
                  type="text"
                  placeholder="admin"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="bg-[#1D1D1D] border-border text-foreground focus:border-accent"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#1D1D1D] border-border text-foreground focus:border-accent"
                />
              </div>
            </CardContent>

            <CardFooter className="pt-6 flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base font-semibold"
              >
                {isLoading ? "Signing in..." : "Secure Login"}
              </Button>
              <div className="text-center text-xs text-secondary-foreground">
                <p>Default credentials (auto-seeded):</p>
                <p className="mt-1 font-mono text-[#D2FF00]/80">admin / [Configured ADMIN_DEFAULT_PASSWORD]</p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
