import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// List of free email domains that are not allowed
const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'webmail.com', 'protonmail.com', 'zoho.com',
  'yandex.com', 'gmx.com', 'live.com', 'msn.com', 'inbox.com',
  'fastmail.com', 'tutanota.com', 'pm.me', 'proton.me', 'me.com', 'mac.com',
];

interface ExpoAccessGateProps {
  children: React.ReactNode;
}

const ExpoAccessGate = ({ children }: ExpoAccessGateProps) => {
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verified, setVerified] = useState(false);

  const isBusinessEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    return !FREE_EMAIL_DOMAINS.includes(domain);
  };

  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    if (!isBusinessEmail(email)) return "Please use your official business email address";
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setBusinessEmail(email);
    if (email) {
      setEmailError(validateEmail(email));
    } else {
      setEmailError("");
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateEmail(businessEmail);
    if (error) {
      setEmailError(error);
      return;
    }
    if (!companyName.trim()) {
      toast.error("Please enter your company name");
      return;
    }
    setVerified(true);
    toast.success(`Welcome, ${companyName.trim()}! You now have access to the ECD Expo 2026.`);
  };

  if (verified) {
    return <>{children}</>;
  }

  // Initial verification form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">ECD Expo 2026 Access</CardTitle>
          <CardDescription className="text-base">
            Only <span className="font-semibold text-primary">Sponsors</span> | <span className="font-semibold text-primary">Exhibitors</span> | <span className="font-semibold text-primary">Delegates (Key Note Speakers)</span> | <span className="font-semibold text-primary">Interested Parties</span> may access this information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company / Organization Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Coca-Cola"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="businessEmail">Business Email Address *</Label>
              <Input
                id="businessEmail"
                type="email"
                value={businessEmail}
                onChange={handleEmailChange}
                placeholder="e.g. info@cocacola.co.za"
                className={emailError ? "border-destructive" : ""}
                required
              />
              {emailError && (
                <p className="text-sm text-destructive mt-1">{emailError}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!!emailError && businessEmail.length > 0}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Access ECD Expo 2026
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpoAccessGate;
