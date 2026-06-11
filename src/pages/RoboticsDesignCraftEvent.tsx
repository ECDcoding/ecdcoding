import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Calendar, Home, School, Building2, Wrench, Sparkles, Clock, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Venue = "at_home" | "ecd_center" | "school_holiday";

const RoboticsDesignCraftEvent = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    preferredDate: "",
    learnerCount: "",
    ageRange: "",
    notes: "",
  });
  const [venue, setVenue] = useState<Venue>("at_home");
  const [submitting, setSubmitting] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.preferredDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: "Robotics & Design Craft Event Booking",
          message: `Venue: ${venue}\nPreferred Date: ${form.preferredDate}\nCity: ${form.city}, ${form.province}\nLearners: ${form.learnerCount} (ages ${form.ageRange})\n\nNotes: ${form.notes}`,
        },
      });
      if (error) throw error;
      toast.success("Booking request received! We'll be in touch shortly.");
      setForm({ fullName: "", email: "", phone: "", city: "", province: "", preferredDate: "", learnerCount: "", ageRange: "", notes: "" });
    } catch (err) {
      console.error(err);
      toast.error("Could not submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <Badge className="mb-4 bg-lime-500/10 text-lime-600 border-lime-500/30">
            <Calendar className="mr-1 h-3 w-3" /> One-Day Event
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Simple Robotics & Design Craft Event
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A hands-on, one-day experience for young learners — perfect for At Home parties,
            ECD Centers, or School Holiday programmes. Book your date in advance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <Card style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
            <CardHeader>
              <Home className="h-6 w-6 text-lime-500 mb-2" />
              <CardTitle className="text-lg text-white">At Home</CardTitle>
              <CardDescription className="text-gray-300">A fun birthday or weekend activity for kids and friends.</CardDescription>
            </CardHeader>
          </Card>
          <Card style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
            <CardHeader>
              <Building2 className="h-6 w-6 text-lime-500 mb-2" />
              <CardTitle className="text-lg text-white">ECD Center</CardTitle>
              <CardDescription className="text-gray-300">Enrichment day for your learners with guided robotics & crafts.</CardDescription>
            </CardHeader>
          </Card>
          <Card style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
            <CardHeader>
              <School className="h-6 w-6 text-lime-500 mb-2" />
              <CardTitle className="text-lg text-white">School Holiday</CardTitle>
              <CardDescription className="text-gray-300">Keep kids engaged during holidays with tech and creativity.</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="mb-8" style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white"><Sparkles className="h-5 w-5 text-lime-500" /> What's Included</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
              <li className="flex items-start gap-2"><Wrench className="h-4 w-4 text-lime-500 mt-0.5" /> Simple robotics build & play stations</li>
              <li className="flex items-start gap-2"><Wrench className="h-4 w-4 text-lime-500 mt-0.5" /> Design craft kits (paper, recyclables, sensors)</li>
              <li className="flex items-start gap-2"><Clock className="h-4 w-4 text-lime-500 mt-0.5" /> Full one-day facilitated programme</li>
              <li className="flex items-start gap-2"><Users className="h-4 w-4 text-lime-500 mt-0.5" /> Trained facilitators on site</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-lime-500 mt-0.5" /> Travel to your venue (by arrangement)</li>
              <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 text-lime-500 mt-0.5" /> Certificates of participation</li>
            </ul>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
          <CardHeader>
            <CardTitle className="text-white">Book In Advance</CardTitle>
            <CardDescription className="text-gray-300">Submit your details and we will confirm availability for your preferred date.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                </div>
                <div>
                  <Label>Preferred Date *</Label>
                  <Input type="date" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} required />
                </div>
                <div>
                  <Label>City</Label>
                  <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
                </div>
                <div>
                  <Label>Province</Label>
                  <Input value={form.province} onChange={(e) => update("province", e.target.value)} />
                </div>
                <div>
                  <Label>Number of Learners</Label>
                  <Input type="number" min={1} value={form.learnerCount} onChange={(e) => update("learnerCount", e.target.value)} />
                </div>
                <div>
                  <Label>Age Range</Label>
                  <Input placeholder="e.g. 4-7 years" value={form.ageRange} onChange={(e) => update("ageRange", e.target.value)} />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Venue Type</Label>
                <RadioGroup value={venue} onValueChange={(v) => setVenue(v as Venue)} className="grid md:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="at_home" /> At Home
                  </label>
                  <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="ecd_center" /> ECD Center
                  </label>
                  <label className="flex items-center gap-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="school_holiday" /> School Holiday
                  </label>
                </RadioGroup>
              </div>

              <div>
                <Label>Additional Notes</Label>
                <Textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Anything we should know about your group, theme, or venue..." />
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-lime-500 hover:bg-lime-600 text-black">
                {submitting ? "Submitting..." : "Request Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoboticsDesignCraftEvent;