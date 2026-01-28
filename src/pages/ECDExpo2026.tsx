import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Rocket, Code, Bot, Plane, Award, Building2, Mic2, GraduationCap, Heart, ArrowLeft, Globe, Video, Upload } from "lucide-react";
import { toast } from "sonner";
import { DebitCardPaymentDialog } from "@/components/DebitCardPaymentDialog";
import { PayFastPaymentDialog } from "@/components/PayFastPaymentDialog";
import ExpoAccessGate from "@/components/ExpoAccessGate";

const ECDExpo2026Content = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sponsorForm, setSponsorForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    sponsorshipTier: "",
    message: ""
  });
  const [exhibitorForm, setExhibitorForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    exhibitorType: "",
    boothSize: "",
    description: ""
  });
  const [speakerForm, setSpeakerForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: "",
    bio: "",
    experience: "",
    videoFile: null as File | null
  });
  const [delegateForm, setDelegateForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    delegateType: "",
    organization: "",
    numberOfAttendees: "1"
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isDebitCardDialogOpen, setIsDebitCardDialogOpen] = useState(false);
  const [isSponsorPaymentDialogOpen, setIsSponsorPaymentDialogOpen] = useState(false);
  const [selectedPaymentAmount, setSelectedPaymentAmount] = useState(0);
  const [selectedPaymentType, setSelectedPaymentType] = useState("");
  const [sponsorPaymentAmount, setSponsorPaymentAmount] = useState(0);

  const mainFocus = [
    { icon: <GraduationCap className="h-8 w-8" />, title: "Developing Tech Savvy Kids", description: "Building the knowledge base for the future world of work" },
    { icon: <Code className="h-8 w-8" />, title: "Coding", description: "Interactive coding workshops and demonstrations" },
    { icon: <Bot className="h-8 w-8" />, title: "Robotics", description: "Drone flying, configurations, and programming" },
    { icon: <Users className="h-8 w-8" />, title: "Empowering Tech Teachers", description: "Professional development for ECD educators" },
    { icon: <Heart className="h-8 w-8" />, title: "Networking Delegates", description: "Connect with industry professionals" },
    { icon: <Award className="h-8 w-8" />, title: "Promoting Sponsors", description: "Showcase your brand to the ECD community" }
  ];

  const sponsorshipTiers = [
    { name: "Platinum Sponsor", price: "R50,000", benefits: ["Main stage branding", "10 VIP passes", "Exhibition booth", "Keynote slot", "All marketing materials"] },
    { name: "Gold Sponsor", price: "R30,000", benefits: ["Stage branding", "6 VIP passes", "Exhibition booth", "Panel participation", "Digital marketing"] },
    { name: "Silver Sponsor", price: "R15,000", benefits: ["Logo placement", "4 passes", "Small booth", "Networking access", "Social media mentions"] },
    { name: "Bronze Sponsor", price: "R5,000", benefits: ["Logo on materials", "2 passes", "Networking access", "Website listing"] }
  ];

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    if (!sponsorForm.sponsorshipTier) {
      toast.error("Please select a sponsorship tier");
      return;
    }
    // Determine payment amount based on tier
    const tierPrices: Record<string, number> = {
      "platinum": 50000,
      "gold": 30000,
      "silver": 15000,
      "bronze": 5000
    };
    const amount = tierPrices[sponsorForm.sponsorshipTier] || 5000;
    setSponsorPaymentAmount(amount);
    setIsSponsorPaymentDialogOpen(true);
  };

  const handleSponsorPaymentComplete = () => {
    toast.success("Payment successful! Your sponsor application has been submitted.");
    setSponsorForm({ companyName: "", contactPerson: "", email: "", phone: "", sponsorshipTier: "", message: "" });
    setAgreeTerms(false);
    setIsSponsorPaymentDialogOpen(false);
  };

  const handleExhibitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    // Set payment based on exhibitor type
    const amount = exhibitorForm.exhibitorType === "international" ? 5000 : 2500;
    setSelectedPaymentAmount(amount);
    setSelectedPaymentType("exhibitor");
    setIsDebitCardDialogOpen(true);
  };

  const handleSpeakerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!speakerForm.videoFile) {
      toast.error("Please upload a 3-minute introduction video");
      return;
    }
    toast.success("Speaker application submitted! Our team will review and contact you.");
    setSpeakerForm({ fullName: "", email: "", phone: "", topic: "", bio: "", experience: "", videoFile: null });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's a video file
      if (!file.type.startsWith('video/')) {
        toast.error("Please upload a video file");
        return;
      }
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error("Video file must be less than 100MB");
        return;
      }
      setSpeakerForm({ ...speakerForm, videoFile: file });
      toast.success("Video uploaded successfully!");
    }
  };

  const handleDelegateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    // Set payment - R200 per delegate
    const attendees = parseInt(delegateForm.numberOfAttendees) || 1;
    setSelectedPaymentAmount(200 * attendees);
    setSelectedPaymentType("delegate");
    setIsDebitCardDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">09-11 June 2026</Badge>
            <Badge variant="secondary" className="text-sm">Nasrec, Soweto</Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 -z-10" />
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-4 text-lg px-4 py-2 bg-secondary text-secondary-foreground">
            <Rocket className="inline h-4 w-4 mr-2" />
            Coming June 2026
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            ECD Coding & Robotics
            <span className="block text-primary">EXPO 2026</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            <strong>Theme:</strong> Empowering Tech Savvy Kids for the Future World of Work
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">09-11 June 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-foreground font-medium">Nasrec, Soweto</span>
            </div>
          </div>
          <Button 
            size="lg" 
            className="text-lg px-8"
            onClick={() => setActiveTab("sponsors")}
          >
            Become a Sponsor
          </Button>
        </div>
      </section>

      {/* Main Focus Section */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Main Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainFocus.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full text-primary">
                    {item.icon}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Tabs */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Register Now</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto">
              <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
              <TabsTrigger value="sponsors" className="py-3">
                <Award className="h-4 w-4 mr-1" />
                Sponsors
              </TabsTrigger>
              <TabsTrigger value="exhibitors" className="py-3">
                <Building2 className="h-4 w-4 mr-1" />
                Exhibitors
              </TabsTrigger>
              <TabsTrigger value="speakers" className="py-3">
                <Mic2 className="h-4 w-4 mr-1" />
                Speakers
              </TabsTrigger>
              <TabsTrigger value="delegates" className="py-3">
                <Users className="h-4 w-4 mr-1" />
                Delegates
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Sponsorship Packages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sponsorshipTiers.map((tier, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">{tier.name}</span>
                        <Badge variant="secondary">{tier.price}</Badge>
                      </div>
                    ))}
                    <Button className="w-full mt-4" onClick={() => setActiveTab("sponsors")}>
                      Apply as Sponsor
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      Exhibitor Booths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">Local Exhibitor</span>
                      </div>
                      <Badge variant="secondary">R2,500</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span className="font-medium">International Exhibitor</span>
                      </div>
                      <Badge variant="secondary">R5,000</Badge>
                    </div>
                    <Button className="w-full mt-4" onClick={() => setActiveTab("exhibitors")}>
                      Book a Booth
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Delegate Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline">a</Badge> ECD Organizations
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline">b</Badge> ECD Managers
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline">c</Badge> ECD Children (4-12 years)
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline">d</Badge> Parents
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline">e</Badge> Other Stakeholders
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-center font-medium">Delegate Pass: R200 per person</p>
                    <Button className="w-full mt-4" onClick={() => setActiveTab("delegates")}>
                      Register as Delegate
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic2 className="h-5 w-5 text-primary" />
                      Keynote Speakers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Share your expertise with the ECD community. We're looking for passionate speakers in:
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                      <li>• Early Childhood Development & Technology</li>
                      <li>• Coding Education for Young Learners</li>
                      <li>• Robotics & STEM in ECD</li>
                      <li>• Future Skills for Children</li>
                    </ul>
                    <Button className="w-full" onClick={() => setActiveTab("speakers")}>
                      Apply as Speaker
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sponsors Tab */}
            <TabsContent value="sponsors">
              <Card>
                <CardHeader>
                  <CardTitle>Sponsor Application Form</CardTitle>
                  <CardDescription>
                    Join us as a sponsor and showcase your brand to the ECD community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sponsorshipTiers.map((tier, index) => (
                      <div 
                        key={index} 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          sponsorForm.sponsorshipTier === tier.name 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSponsorForm({ ...sponsorForm, sponsorshipTier: tier.name })}
                      >
                        <h4 className="font-bold text-lg">{tier.name}</h4>
                        <p className="text-primary font-bold text-xl mb-2">{tier.price}</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {tier.benefits.map((benefit, i) => (
                            <li key={i}>✓ {benefit}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSponsorSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={sponsorForm.companyName}
                          onChange={(e) => setSponsorForm({ ...sponsorForm, companyName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          value={sponsorForm.contactPerson}
                          onChange={(e) => setSponsorForm({ ...sponsorForm, contactPerson: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={sponsorForm.email}
                          onChange={(e) => setSponsorForm({ ...sponsorForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          value={sponsorForm.phone}
                          onChange={(e) => setSponsorForm({ ...sponsorForm, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Additional Message</Label>
                      <Textarea
                        id="message"
                        value={sponsorForm.message}
                        onChange={(e) => setSponsorForm({ ...sponsorForm, message: e.target.value })}
                        placeholder="Tell us about your company and sponsorship goals..."
                      />
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        className="mt-0.5"
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(`${window.location.origin}/documents/Partnership_Memorandum_of_Agreement_Template.pdf`, '_blank', 'noopener,noreferrer');
                          }}
                          className="text-primary underline hover:text-primary/80"
                        >
                          Partnership Memorandum of Understanding
                        </button>{" "}
                        and terms and conditions
                      </Label>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Pay with PayFast
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Your application will be submitted after successful payment
                    </p>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Exhibitors Tab */}
            <TabsContent value="exhibitors">
              <Card>
                <CardHeader>
                  <CardTitle>Exhibitor Booking Form</CardTitle>
                  <CardDescription>
                    Book your exhibition booth - Local (R2,500) or International (R5,000)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleExhibitorSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="exCompanyName">Company Name *</Label>
                        <Input
                          id="exCompanyName"
                          value={exhibitorForm.companyName}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, companyName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="exContactPerson">Contact Person *</Label>
                        <Input
                          id="exContactPerson"
                          value={exhibitorForm.contactPerson}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, contactPerson: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="exEmail">Email *</Label>
                        <Input
                          id="exEmail"
                          type="email"
                          value={exhibitorForm.email}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="exPhone">Phone *</Label>
                        <Input
                          id="exPhone"
                          value={exhibitorForm.phone}
                          onChange={(e) => setExhibitorForm({ ...exhibitorForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="exhibitorType">Exhibitor Type *</Label>
                        <Select
                          value={exhibitorForm.exhibitorType}
                          onValueChange={(value) => setExhibitorForm({ ...exhibitorForm, exhibitorType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="local">Local (R2,500)</SelectItem>
                            <SelectItem value="international">International (R5,000)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="boothSize">Preferred Booth Size</Label>
                        <Select
                          value={exhibitorForm.boothSize}
                          onValueChange={(value) => setExhibitorForm({ ...exhibitorForm, boothSize: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (3x3m)</SelectItem>
                            <SelectItem value="medium">Medium (4x4m)</SelectItem>
                            <SelectItem value="large">Large (6x6m)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="exDescription">Company Description</Label>
                      <Textarea
                        id="exDescription"
                        value={exhibitorForm.description}
                        onChange={(e) => setExhibitorForm({ ...exhibitorForm, description: e.target.value })}
                        placeholder="Describe your products/services..."
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="exTerms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      />
                      <Label htmlFor="exTerms" className="text-sm">
                        I agree to the terms and conditions
                      </Label>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Pay with PayFast
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Speakers Tab */}
            <TabsContent value="speakers">
              <Card>
                <CardHeader>
                  <CardTitle>Keynote Speaker Application</CardTitle>
                  <CardDescription>
                    Apply to be a speaker at the ECD Coding & Robotics Expo 2026
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSpeakerSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="spFullName">Full Name *</Label>
                        <Input
                          id="spFullName"
                          value={speakerForm.fullName}
                          onChange={(e) => setSpeakerForm({ ...speakerForm, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="spEmail">Email *</Label>
                        <Input
                          id="spEmail"
                          type="email"
                          value={speakerForm.email}
                          onChange={(e) => setSpeakerForm({ ...speakerForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="spPhone">Phone *</Label>
                        <Input
                          id="spPhone"
                          value={speakerForm.phone}
                          onChange={(e) => setSpeakerForm({ ...speakerForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="spExperience">Years of Experience</Label>
                        <Input
                          id="spExperience"
                          value={speakerForm.experience}
                          onChange={(e) => setSpeakerForm({ ...speakerForm, experience: e.target.value })}
                          placeholder="e.g., 5 years"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="spTopic">Proposed Topic *</Label>
                      <Input
                        id="spTopic"
                        value={speakerForm.topic}
                        onChange={(e) => setSpeakerForm({ ...speakerForm, topic: e.target.value })}
                        placeholder="Your keynote topic"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="spBio">Professional Bio *</Label>
                      <Textarea
                        id="spBio"
                        value={speakerForm.bio}
                        onChange={(e) => setSpeakerForm({ ...speakerForm, bio: e.target.value })}
                        placeholder="Tell us about your background and expertise..."
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="spVideo" className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-primary" />
                        3-Minute Introduction Video *
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Please upload a short video (max 3 minutes) introducing yourself and your topic. Max file size: 100MB.
                      </p>
                      <div className="flex items-center gap-4">
                        <label 
                          htmlFor="spVideo" 
                          className="flex items-center gap-2 px-4 py-2 border border-dashed border-primary/50 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors"
                        >
                          <Upload className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">
                            {speakerForm.videoFile ? speakerForm.videoFile.name : "Choose Video File"}
                          </span>
                        </label>
                        <input
                          id="spVideo"
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                        {speakerForm.videoFile && (
                          <Badge variant="secondary" className="text-xs">
                            {(speakerForm.videoFile.size / (1024 * 1024)).toFixed(1)} MB
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Submit Speaker Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Delegates Tab */}
            <TabsContent value="delegates">
              <Card>
                <CardHeader>
                  <CardTitle>Delegate Registration</CardTitle>
                  <CardDescription>
                    Register as a delegate - R200 per person
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDelegateSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="delFullName">Full Name *</Label>
                        <Input
                          id="delFullName"
                          value={delegateForm.fullName}
                          onChange={(e) => setDelegateForm({ ...delegateForm, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="delEmail">Email *</Label>
                        <Input
                          id="delEmail"
                          type="email"
                          value={delegateForm.email}
                          onChange={(e) => setDelegateForm({ ...delegateForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="delPhone">Phone *</Label>
                        <Input
                          id="delPhone"
                          value={delegateForm.phone}
                          onChange={(e) => setDelegateForm({ ...delegateForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="delType">Delegate Category *</Label>
                        <Select
                          value={delegateForm.delegateType}
                          onValueChange={(value) => setDelegateForm({ ...delegateForm, delegateType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ecd-organization">ECD Organization</SelectItem>
                            <SelectItem value="ecd-manager">ECD Manager</SelectItem>
                            <SelectItem value="ecd-children">ECD Children (4-12)</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="delOrg">Organization Name</Label>
                        <Input
                          id="delOrg"
                          value={delegateForm.organization}
                          onChange={(e) => setDelegateForm({ ...delegateForm, organization: e.target.value })}
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <Label htmlFor="delAttendees">Number of Attendees *</Label>
                        <Input
                          id="delAttendees"
                          type="number"
                          min="1"
                          value={delegateForm.numberOfAttendees}
                          onChange={(e) => setDelegateForm({ ...delegateForm, numberOfAttendees: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium">
                        Total: R{200 * (parseInt(delegateForm.numberOfAttendees) || 1)} 
                        <span className="text-muted-foreground text-sm ml-2">
                          ({delegateForm.numberOfAttendees || 1} × R200)
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="delTerms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      />
                      <Label htmlFor="delTerms" className="text-sm">
                        I agree to the terms and conditions
                      </Label>
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Pay with PayFast
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">ECD Coding & Robotics Expo 2026</h3>
          <p className="mb-4">Empowering Tech Savvy Kids for the Future World of Work</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary">09-11 June 2026</Badge>
            <Badge variant="secondary">Nasrec, Soweto</Badge>
          </div>
          <p className="mt-6 text-sm opacity-80">
            © 2026 ECD Coding. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Payment Dialog */}
      <DebitCardPaymentDialog
        open={isDebitCardDialogOpen}
        onOpenChange={setIsDebitCardDialogOpen}
        onPaymentComplete={() => {
          setIsDebitCardDialogOpen(false);
          toast.success("Registration successful!");
        }}
        amount={selectedPaymentAmount}
        paymentType={selectedPaymentType}
      />

      {/* Sponsor PayFast Payment Dialog */}
      <PayFastPaymentDialog
        open={isSponsorPaymentDialogOpen}
        onOpenChange={setIsSponsorPaymentDialogOpen}
        amount={sponsorPaymentAmount}
        itemName={`ECD Expo 2026 ${sponsorForm.sponsorshipTier ? sponsorForm.sponsorshipTier.charAt(0).toUpperCase() + sponsorForm.sponsorshipTier.slice(1) : ''} Sponsor`}
        paymentType="subscription"
        userEmail={sponsorForm.email}
        userFirstName={sponsorForm.contactPerson.split(' ')[0]}
        userLastName={sponsorForm.contactPerson.split(' ').slice(1).join(' ')}
        onPaymentComplete={handleSponsorPaymentComplete}
      />
    </div>
  );
};

// Wrapper component with access gate
const ECDExpo2026 = () => {
  return (
    <ExpoAccessGate>
      <ECDExpo2026Content />
    </ExpoAccessGate>
  );
};

export default ECDExpo2026;
