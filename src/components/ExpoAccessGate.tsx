import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Building2, Mail, AlertCircle, Loader2 } from "lucide-react";
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

interface ExpoAccessGateProps {
  children: React.ReactNode;
}

const ExpoAccessGate = ({ children }: ExpoAccessGateProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const [hasSponsorRole, setHasSponsorRole] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestStatus, setRequestStatus] = useState<string | null>(null);

  // Check if user has sponsor role
  useEffect(() => {
    const checkSponsorRole = async () => {
      if (!user) {
        setCheckingAccess(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'sponsor'
        });

        if (error) {
          console.error("Error checking sponsor role:", error);
        } else {
          setHasSponsorRole(data || false);
        }
      } catch (error) {
        console.error("Error checking sponsor role:", error);
      } finally {
        setCheckingAccess(false);
      }
    };

    if (!authLoading && !adminLoading) {
      checkSponsorRole();
    }
  }, [user, authLoading, adminLoading]);

  // Check for existing access request
  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!user?.email) return;

      try {
        const { data, error } = await supabase
          .from('expo_access_requests')
          .select('status')
          .eq('email', user.email)
          .order('requested_at', { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          setRequestStatus(data[0].status);
        }
      } catch (error) {
        console.error("Error checking request status:", error);
      }
    };

    if (user) {
      checkExistingRequest();
    }
  }, [user]);

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

  const handleSubmitRequest = async (e: React.FormEvent) => {
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

    setSubmitting(true);

    try {
      const { error: insertError } = await supabase
        .from('expo_access_requests')
        .insert({
          email: businessEmail.toLowerCase().trim(),
          company_name: companyName.trim(),
          status: 'pending'
        });

      if (insertError) {
        throw insertError;
      }

      setRequestStatus('pending');
      toast.success("Access request submitted! Our team will review your application.");
    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading state
  if (authLoading || adminLoading || checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  // Admin or sponsor has access
  if (isAdmin || hasSponsorRole) {
    return <>{children}</>;
  }

  // User not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Access Restricted</CardTitle>
            <CardDescription>
              The ECD Coding & Robotics Expo 2026 information is only available to authorized sponsors and administrators.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please sign in with your business account to request access.
              </AlertDescription>
            </Alert>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User has pending request
  if (requestStatus === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-secondary rounded-full w-fit">
            <Mail className="h-10 w-10 text-secondary-foreground" />
          </div>
          <CardTitle className="text-2xl">Request Pending</CardTitle>
          <CardDescription>
            Your access request is being reviewed by our team.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                We'll notify you once your request has been approved. This typically takes 1-2 business days.
              </AlertDescription>
            </Alert>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User's request was rejected
  if (requestStatus === 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-destructive/10 rounded-full w-fit">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            Your access request was not approved at this time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                If you believe this is an error, please contact us for assistance.
              </AlertDescription>
            </Alert>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access request form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
            <Building2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Request Access</CardTitle>
          <CardDescription>
            ECD Expo 2026 information is available to sponsors and partners only.
            Please provide your business email to request access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="businessEmail">Business Email *</Label>
              <Input
                id="businessEmail"
                type="email"
                value={businessEmail}
                onChange={handleEmailChange}
                placeholder="you@yourcompany.com"
                className={emailError ? "border-red-500" : ""}
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
                Please use your company email address.
              </AlertDescription>
            </Alert>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={submitting || !!emailError}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Request Access"
              )}
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
