import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type RecoveryState = "checking" | "ready" | "invalid" | "complete";

const ResetPassword = () => {
  const [recoveryState, setRecoveryState] = useState<RecoveryState>("checking");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let active = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY" || session) setRecoveryState("ready");
    });

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!active) return;
      setRecoveryState(!error && session ? "ready" : "invalid");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      toast({
        title: "Password is too short",
        description: "Use at least 8 characters.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmation) {
      toast({
        title: "Passwords do not match",
        description: "Please enter the same password in both fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setIsSubmitting(false);
      toast({
        title: "Password could not be updated",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    await supabase.auth.signOut({ scope: "local" });
    setRecoveryState("complete");
    setIsSubmitting(false);
    toast({
      title: "Password updated",
      description: "You can now sign in with your new password.",
    });
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 text-foreground sm:py-20">
      <section className="mx-auto w-full max-w-md">
        <Link to="/" className="mb-10 inline-flex items-center gap-3 font-bold text-foreground">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-extrabold text-primary-foreground">
            E
          </span>
          ECDcoding
        </Link>

        <div className="rounded-lg border border-border bg-card p-6 shadow-xl sm:p-8">
          {recoveryState === "checking" && (
            <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-center" role="status">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Checking your reset link…</p>
            </div>
          )}

          {recoveryState === "invalid" && (
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                <KeyRound className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Reset link expired</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  This password reset link is invalid or has expired. Request a new link to continue.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link to="/sign-in">Request a new reset link</Link>
              </Button>
            </div>
          )}

          {recoveryState === "ready" && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h1 className="text-2xl font-bold">Set a new password</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a secure password with at least 8 characters.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">New password</label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength={8}
                    autoComplete="new-password"
                    required
                    className="h-12 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-1 top-1 h-10 w-10 text-muted-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">Confirm new password</label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmation}
                  onChange={(event) => setConfirmation(event.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  required
                  className="h-12"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="h-12 w-full">
                {isSubmitting && <Loader2 className="animate-spin" />}
                {isSubmitting ? "Updating password…" : "Update password"}
              </Button>
            </form>
          )}

          {recoveryState === "complete" && (
            <div className="space-y-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <KeyRound className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Password updated</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your new password is ready to use.
                </p>
              </div>
              <Button className="w-full" onClick={() => navigate("/sign-in", { replace: true })}>
                Sign in
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;