import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { ChevronDown, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { lovable } from "@/integrations/lovable/index";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { signIn, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/lesson-vault-04-06");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowForgotPassword(false);
    try {
      const { data, error } = await signIn(email, password);
      if (data && !error) {
        navigate("/lesson-vault-04-06");
      } else if (error) {
        setShowForgotPassword(true);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setShowForgotPassword(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);
    try {
      const { error } = await resetPassword(email);
      if (!error) setShowForgotPassword(false);
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsResetting(false);
    }
  };

  const handleGoogle = async () => {
    const isInIframe = window.self !== window.top;
    if (isInIframe) {
      window.open(`${window.location.origin}/sign-in`, "_blank");
      return;
    }
    await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/`,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#0b2910] text-foreground flex flex-col">
      {/* Hero / brand panel */}
      <div className="relative bg-[#0b2910] px-6 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-primary-foreground font-extrabold text-lg">E</span>
            </div>
            <span className="text-foreground font-bold tracking-tight text-lg">
              ECDcoding
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Sign in to continue your child's coding journey.
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 -mt-6 px-4 pb-10">
        <div className="mx-auto w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border/40 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="signin-email" className="text-xs font-medium text-muted-foreground pl-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-14 rounded-2xl pl-11 pr-4 bg-muted/40 border-border/60 focus-visible:ring-primary text-base"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="signin-password" className="text-xs font-medium text-muted-foreground pl-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-14 rounded-2xl pl-11 pr-12 bg-muted/40 border-border/60 focus-visible:ring-primary text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 group"
            >
              {isSubmitting ? "Signing in..." : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              )}
            </Button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-xs text-muted-foreground uppercase tracking-wider">
                  or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              className="w-full h-14 rounded-2xl text-base font-medium border-border/60 bg-background/40 hover:bg-background/60 flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>

            {showForgotPassword && (
              <div className="mt-2 p-4 rounded-2xl bg-muted/40 border border-border/60">
                <p className="text-xs text-muted-foreground mb-3">
                  Enter your email and we'll send a reset link.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-11 rounded-xl bg-background/60"
                  />
                  <Button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isResetting || !email}
                    size="sm"
                    className="h-11 rounded-xl px-4"
                  >
                    {isResetting ? "..." : "Send"}
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* Register CTA */}
          <div className="mt-6 pt-6 border-t border-border/40 text-center">
            <span className="text-sm text-muted-foreground">Don't have an account? </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className="text-primary hover:underline p-0 h-auto font-semibold text-sm"
                >
                  Register <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-50 bg-card border border-border shadow-lg rounded-xl">
                <DropdownMenuItem asChild>
                  <Link to="/register?type=parent" className="cursor-pointer">Parent</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register?type=ecd-manager" className="cursor-pointer">ECD Manager</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register?type=tech-teacher" className="cursor-pointer">Tech Teacher</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="mx-auto w-full max-w-md text-center text-[11px] text-muted-foreground/80 mt-6 px-4 leading-relaxed">
          By continuing you agree to ECDcoding's{" "}
          <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;