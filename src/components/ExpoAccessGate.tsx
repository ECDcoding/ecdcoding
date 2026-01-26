import { useState, useEffect } from "react";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Building2, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// List of free email domains that are not allowed
const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'webmail.com',
  'protonmail.com',
  'zoho.com',
  'yandex.com',
  'gmx.com',
  'live.com',
  'msn.com',
  'inbox.com',
  'fastmail.com',
  'tutanota.com',
  'pm.me',
  'proton.me',
  'me.com',
  'mac.com',
];

const STORAGE_KEY = 'expo_access_verified';

interface ExpoAccessGateProps {
  children: React.ReactNode;
}

const ExpoAccessGate = ({ children }: ExpoAccessGateProps) => {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [checkingStorage, setCheckingStorage] = useState(true);

  // Check if already verified in this session
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.verified && data.email && data.company) {
          setIsVerified(true);
        }
      } catch (e) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    setCheckingStorage(false);
  }, []);

  const isBusinessEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    return !FREE_EMAIL_DOMAINS.includes(domain);
  };

  const validateEmail = (email: string): string => {
    if (!email) return "Email is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    
    if (!isBusinessEmail(email)) {
      return "Please use a business email address. Free email providers (Gmail, Yahoo, Hotmail, etc.) are not accepted.";
    }
    
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

    // Store verification in session storage
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      verified: true,
      email: businessEmail.toLowerCase().trim(),
      company: companyName.trim(),
      timestamp: Date.now()
    }));

    setIsVerified(true);
    toast.success(`Welcome, ${companyName}! You now have access to the Expo information.`);
  };

  // Show loading state
  if (adminLoading || checkingStorage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Admin has access or user is verified
  if (isAdmin || isVerified) {
    return <>{children}</>;
  }

  // Show business email verification form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Sponsor Access</CardTitle>
          <CardDescription>
            Enter your business details to access ECD Expo 2026 information.
            Only business email addresses are accepted.
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

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Free email providers (Gmail, Yahoo, Hotmail, etc.) are not accepted. 
                Please use your official company email address.
              </AlertDescription>
            </Alert>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!!emailError && businessEmail.length > 0}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Access Expo Information
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
