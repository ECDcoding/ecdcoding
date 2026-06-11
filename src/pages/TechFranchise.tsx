import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft, Rocket, Tv, Plane, Cpu, BookOpen, Users, ShieldCheck,
  Sparkles, CheckCircle2, Building2, MapPin, Star, Wrench, GraduationCap, Calendar
} from "lucide-react";
import { toast } from "sonner";
import { PayFastPaymentDialog } from "@/components/PayFastPaymentDialog";

type PackageOption = "package_only" | "package_install";

const TechFranchise = () => {
  const [form, setForm] = useState({
    fullName: "",
    facilityName: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    yearsRunning: "",
    learnerCount: "",
    motivation: "",
  });
  const [packageOption, setPackageOption] = useState<PackageOption>("package_install");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  const amount = packageOption === "package_install" ? 100000 : 75000;
  const itemName = packageOption === "package_install"
    ? "ECDcoding Tech Franchise (Package + Installation)"
    : "ECDcoding Tech Franchise (Package Only)";

  const programs = [
    { icon: <Cpu className="h-5 w-5" />, name: "Microbit Coding" },
    { icon: <Cpu className="h-5 w-5" />, name: "PiAxe Robotics" },
    { icon: <Plane className="h-5 w-5" />, name: "Drone Programming" },
    { icon: <BookOpen className="h-5 w-5" />, name: "Scratch & Blockly" },
    { icon: <Sparkles className="h-5 w-5" />, name: "AI Foundations" },
    { icon: <GraduationCap className="h-5 w-5" />, name: "CAPS-Aligned Curriculum" },
  ];

  const equipment = [
    "Smart TV display unit",
    "Drone fleet for flight programming",
    "Microbit kits & accessories",
    "PiAxe robotic builders",
    "Branded learning materials",
    "Teacher tablets & accessories",
  ];

  const benefits = [
    { icon: <Rocket className="h-6 w-6" />, title: "Turn-key Setup", desc: "Receive a fully equipped tech learning corner ready to run from day one." },
    { icon: <ShieldCheck className="h-6 w-6" />, title: "Brand Protection", desc: "Become an officially licensed ECDcoding franchisee in your region." },
    { icon: <Users className="h-6 w-6" />, title: "Teacher Training", desc: "Comprehensive onboarding & ongoing mentorship for your educators." },
    { icon: <BookOpen className="h-6 w-6" />, title: "Curriculum Access", desc: "Full access to the CAPS-aligned ECDcoding lesson vault." },
    { icon: <Wrench className="h-6 w-6" />, title: "Tech Support", desc: "Hardware setup, configuration & ongoing technical assistance." },
    { icon: <Star className="h-6 w-6" />, title: "Marketing Boost", desc: "Listed on our official network & promoted to parents in your area." },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.facilityName || !form.email || !form.phone) {
      toast.error("Please complete all required fields.");
      return;
    }
    if (!agreeTerms) {
      toast.error("Please agree to the Franchise Terms to continue.");
      return;
    }
    setPayOpen(true);
  };

  const [firstName, ...rest] = form.fullName.trim().split(" ");
  const lastName = rest.join(" ");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#132a13] via-[#1a3a1a] to-[#0d1f0d] text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-lime-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-yellow-400 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center text-lime-300 hover:text-lime-200 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-yellow-400 text-[#132a13] hover:bg-yellow-300 mb-4">
                <Sparkles className="h-3 w-3 mr-1" /> Limited Franchise Slots — 2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Own an <span className="text-lime-400">ECDcoding</span> Tech Franchise
              </h1>
              <p className="text-lg text-white/80 mb-6">
                Bring world-class coding, robotics & AI learning to your community.
                Get a turn-key tech learning hub — equipment, curriculum, training, and brand support — all included.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="border-lime-400 text-lime-300 bg-transparent text-sm px-3 py-1">
                  R75,000 Franchise Fee
                </Badge>
                <Badge variant="outline" className="border-yellow-400 text-yellow-300 bg-transparent text-sm px-3 py-1">
                  + R25,000 Installation
                </Badge>
                <Badge className="bg-lime-400 text-[#132a13] text-sm px-3 py-1">
                  R100,000 Total
                </Badge>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-lime-400/30 bg-white flex items-center justify-center">
              <img src="/favicon.png" alt="ECDcoding Logo" className="w-full h-full object-contain p-4" />
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">What's Inside the Package</h2>
          <p className="text-muted-foreground">Everything you need to launch a thriving tech learning hub.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card className="border-2 border-lime-400/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tv className="h-5 w-5 text-lime-500" /> Equipment Included
              </CardTitle>
              <CardDescription>Premium hardware shipped & installed at your facility</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {equipment.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-lime-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-400/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-500" /> Learning Programmes
              </CardTitle>
              <CardDescription>Full CAPS-aligned curriculum & teacher resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {programs.map((p) => (
                  <div key={p.name} className="flex items-center gap-2 p-2 rounded-md bg-muted">
                    <span className="text-yellow-500">{p.icon}</span>
                    <span className="text-xs font-medium">{p.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <h3 className="text-2xl font-bold text-center mb-6">Why Become a Franchisee?</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {benefits.map((b) => (
            <Card key={b.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center text-lime-600 dark:text-lime-400 mb-2">
                  {b.icon}
                </div>
                <CardTitle className="text-base">{b.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing breakdown */}
        <Card className="bg-gradient-to-br from-[#132a13] to-[#1a3a1a] text-white border-0 mb-10">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-yellow-400" /> Investment Breakdown
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs uppercase tracking-wide text-lime-300 mb-1">Franchise Fee</p>
                <p className="text-3xl font-extrabold">R75,000</p>
                <p className="text-xs text-white/70 mt-1">License, brand, curriculum, training</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs uppercase tracking-wide text-yellow-300 mb-1">Installation Fee</p>
                <p className="text-3xl font-extrabold">R25,000</p>
                <p className="text-xs text-white/70 mt-1">Equipment delivery, setup, configuration</p>
              </div>
              <div className="bg-yellow-400 text-[#132a13] rounded-xl p-4">
                <p className="text-xs uppercase tracking-wide mb-1">Total Initial Investment</p>
                <p className="text-3xl font-extrabold">R100,000</p>
                <p className="text-xs mt-1 font-semibold">Once-off, secured via PayFast</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Form */}
        <Card className="border-2 border-lime-400">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Building2 className="h-6 w-6 text-lime-500" /> Apply for a Franchise
            </CardTitle>
            <CardDescription>
              Submit your application and proceed to secure payment via PayFast.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="facilityName">ECD Facility Name *</Label>
                  <Input id="facilityName" value={form.facilityName} onChange={(e) => setForm({ ...form, facilityName: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Input id="province" placeholder="e.g. Gauteng" value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="city">City / Town *</Label>
                  <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="yearsRunning">Years Operating ECD</Label>
                  <Input id="yearsRunning" type="number" min="0" value={form.yearsRunning} onChange={(e) => setForm({ ...form, yearsRunning: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="learnerCount">Number of Learners</Label>
                  <Input id="learnerCount" type="number" min="0" value={form.learnerCount} onChange={(e) => setForm({ ...form, learnerCount: e.target.value })} />
                </div>
              </div>

              <div>
                <Label htmlFor="motivation">Why do you want this franchise? *</Label>
                <Textarea
                  id="motivation"
                  rows={4}
                  value={form.motivation}
                  onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                  placeholder="Tell us about your vision, community impact, and readiness to run an ECDcoding hub."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Choose Your Package *</Label>
                <RadioGroup value={packageOption} onValueChange={(v) => setPackageOption(v as PackageOption)}>
                  <div className="flex items-start gap-3 p-4 border-2 rounded-lg hover:border-lime-400 transition-colors data-[state=checked]:border-lime-500">
                    <RadioGroupItem value="package_install" id="package_install" className="mt-1" />
                    <Label htmlFor="package_install" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Full Package + Installation</span>
                        <span className="font-bold text-lime-600">R100,000</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended — we deliver, install & configure everything for you.
                      </p>
                    </Label>
                  </div>
                  <div className="flex items-start gap-3 p-4 border-2 rounded-lg hover:border-lime-400 transition-colors">
                    <RadioGroupItem value="package_only" id="package_only" className="mt-1" />
                    <Label htmlFor="package_only" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Package Only (Self-Install)</span>
                        <span className="font-bold text-yellow-600">R75,000</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Equipment & licensing only. You arrange installation independently.
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-start gap-2 p-3 bg-muted rounded-md">
                <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(v) => setAgreeTerms(v === true)} />
                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                  I agree to the ECDcoding Franchise Terms & confirm that the once-off payment is non-refundable
                  once equipment has been dispatched. I understand my application will be reviewed and the franchise
                  agreement signed upon successful payment.
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#132a13] text-yellow-400 hover:bg-[#132a13]/90 text-lg font-bold"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Submit & Pay R{amount.toLocaleString()} via PayFast
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1">
          <MapPin className="h-3 w-3" /> info@ecdcoding.co.za · +27 73 063 9622
        </p>
      </section>

      <PayFastPaymentDialog
        open={payOpen}
        onOpenChange={setPayOpen}
        amount={amount}
        itemName={itemName}
        paymentType="subscription"
        userEmail={form.email}
        userFirstName={firstName}
        userLastName={lastName}
        userId="guest"
      />
    </div>
  );
};

export default TechFranchise;
