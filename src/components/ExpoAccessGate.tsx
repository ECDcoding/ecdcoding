import { useState, useEffect } from "react";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Loader2, CheckCircle, Sparkles, Handshake, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// List of free email domains that are not allowed
const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'webmail.com', 'protonmail.com', 'zoho.com',
  'yandex.com', 'gmx.com', 'live.com', 'msn.com', 'inbox.com',
  'fastmail.com', 'tutanota.com', 'pm.me', 'proton.me', 'me.com', 'mac.com',
];

const STORAGE_KEY = 'expo_access_verified';

interface ExpoAccessGateProps {
  children: React.ReactNode;
}

type Step = 'verify' | 'partnership' | 'complete';

const ExpoAccessGate = ({ children }: ExpoAccessGateProps) => {
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>('verify');
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checkingStorage, setCheckingStorage] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.verified && data.email && data.company) {
          setCurrentStep('complete');
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
    setCurrentStep('partnership');
  };

  const handlePartnershipSelect = (option: string) => {
    setSelectedOption(option);
    setIsFlipping(true);
    
    setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        verified: true,
        email: businessEmail.toLowerCase().trim(),
        company: companyName.trim(),
        partnershipType: option,
        timestamp: Date.now()
      }));
      setCurrentStep('complete');
      toast.success(`Welcome, ${companyName}! You now have access to the Expo information.`);
    }, 800);
  };

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

  if (isAdmin || currentStep === 'complete') {
    return <>{children}</>;
  }

  // Partnership selection step with flipping cards
  if (currentStep === 'partnership') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <div className="max-w-4xl w-full">
          <div className="mb-4">
            <Button variant="ghost" onClick={() => setCurrentStep('verify')} className="text-muted-foreground hover:text-foreground">
              ← Back to verification
            </Button>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your Partnership</h1>
            <p className="text-muted-foreground">
              Welcome, <span className="font-semibold">{companyName}</span>! How would you like to be involved?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sponsor Card */}
            <div 
              className={`perspective-1000 cursor-pointer ${isFlipping && selectedOption === 'sponsor' ? 'animate-flip' : ''}`}
              onClick={() => handlePartnershipSelect('sponsor')}
            >
              <Card className="h-full border-2 border-primary/20 hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-yellow-400/20 rounded-full w-fit">
                    <DollarSign className="h-12 w-12 text-yellow-600" />
                  </div>
                  <CardTitle className="text-2xl text-yellow-700 dark:text-yellow-400">
                    Sponsor the Event
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <ul className="text-sm text-muted-foreground space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      Premium brand visibility
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      VIP speaking opportunity
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      Exhibition booth included
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      Exclusive networking access
                    </li>
                  </ul>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Select Sponsorship
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Partner Card */}
            <div 
              className={`perspective-1000 cursor-pointer ${isFlipping && selectedOption === 'partner' ? 'animate-flip' : ''}`}
              onClick={() => handlePartnershipSelect('partner')}
            >
              <Card className="h-full border-2 border-primary/20 hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-blue-400/20 rounded-full w-fit">
                    <Handshake className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">
                    Partner with ECDcoding
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <ul className="text-sm text-muted-foreground space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      Strategic collaboration
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      Co-branded initiatives
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      Resource sharing
                    </li>
                    <li className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      Long-term partnership
                    </li>
                  </ul>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Select Partnership
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2 font-medium">Contact Us</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
              <a href="mailto:info@ecdcoding.co.za" className="text-primary hover:underline">
                Email: info@ecdcoding.co.za
              </a>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a href="tel:+27730639622" className="text-primary hover:underline">
                Mobile: +27 73 063 9622
              </a>
            </div>
          </div>
        </div>
      </div>
    );
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
              Continue to Partnership Options
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
