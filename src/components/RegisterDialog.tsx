import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PENDING_REGISTRATION_KEY = "ecdcoding_pending_registration";

const RegisterDialog = ({ open, onOpenChange }: RegisterDialogProps) => {
  const [registrationType, setRegistrationType] = useState<"parent" | "ecd-manager">("parent");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      toast.error("Please enter your Name and Surname to continue.");
      return;
    }

    const pending = {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      registrationType,
    };
    localStorage.setItem(PENDING_REGISTRATION_KEY, JSON.stringify(pending));

    setIsGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Google sign-in failed. Please try again.");
        setIsGoogleLoading(false);
        return;
      }
      if (result.redirected) return;
      onOpenChange(false);
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Google sign-in failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Register with ECDcoding</DialogTitle>
        </DialogHeader>
        <Card className="border-0 shadow-none">
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="register-first-name">Name</Label>
                <Input
                  id="register-first-name"
                  placeholder="Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-last-name">Surname</Label>
                <Input
                  id="register-last-name"
                  placeholder="Surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>I am a</Label>
              <Select value={registrationType} onValueChange={(v) => setRegistrationType(v as "parent" | "ecd-manager")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="ecd-manager">ECD Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;