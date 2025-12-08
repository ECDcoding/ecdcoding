import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { SiGoogle } from "react-icons/si";

interface SignInProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignIn = ({ open, onOpenChange }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isOAuthSubmitting, setIsOAuthSubmitting] = useState(false);
  const { signIn, signInWithOAuth, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (data && !error) {
        onOpenChange(false);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    
    await resetPassword(email);
    setShowForgotPassword(false);
  };

  const handleGoogleSignIn = async () => {
    setIsOAuthSubmitting(true);
    try {
      await signInWithOAuth('google');
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsOAuthSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Sign In to ECDcoding</DialogTitle>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardContent className="pt-6">
            <Button 
              type="button"
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
              disabled={isOAuthSubmitting}
            >
              <SiGoogle className="h-4 w-4" />
              {isOAuthSubmitting ? 'Signing in...' : 'Sign in with Google'}
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password or phone number"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>

              {!showForgotPassword ? (
                <div className="text-center text-sm">
                  <Button
                    type="button"
                    variant="link"
                    className="text-primary hover:underline p-0 h-auto font-normal text-sm"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    Enter your email above and click the button below to receive a password reset link.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="flex-1"
                      onClick={handleForgotPassword}
                    >
                      Send Reset Link
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="link" 
                      className="text-primary hover:underline p-0 h-auto font-normal text-sm"
                    >
                      Register here <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-50 bg-background border border-border shadow-lg">
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/register?type=parent" 
                        className="cursor-pointer"
                        onClick={() => onOpenChange(false)}
                      >
                        Parent
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/register?type=ecd-manager" 
                        className="cursor-pointer"
                        onClick={() => onOpenChange(false)}
                      >
                        ECD Manager
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/register?type=tech-teacher" 
                        className="cursor-pointer"
                        onClick={() => onOpenChange(false)}
                      >
                        Tech Teacher
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;