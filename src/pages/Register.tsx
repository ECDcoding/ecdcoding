import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    parentFirstName: "",
    parentLastName: "",
    state: "",
    country: "",
    phone1: "",
    phone2: "",
    phone3: "",
    email: "",
    institution: "",
    registrationStatus: "",
    numberOfKids: "",
    hearAbout: "",
    aspiration: "",
    learnerFirstName: "",
    learnerLastName: "",
    relationship: "",
    ecdPhone1: "",
    ecdPhone2: "",
    ecdPhone3: "",
    ecdEmail: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Card className="border-2 border-foreground">
          <CardHeader className="text-center">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png" 
                alt="ECDcoding Logo - Empowering Tech Savvy Kids" 
                className="mx-auto h-32 w-auto"
              />
            </div>
            <CardTitle className="text-2xl">Membership Registration for a Learner(s)</CardTitle>
            <p className="text-muted-foreground">
              R250.00 Per Month | or R3000.00 Per Year
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8 text-foreground font-semibold">
              {/* Parent/Guardian Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentFirstName">First Name *</Label>
                    <Input
                      id="parentFirstName"
                      value={formData.parentFirstName}
                      onChange={(e) => handleInputChange("parentFirstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentLastName">Last Name *</Label>
                    <Input
                      id="parentLastName"
                      value={formData.parentLastName}
                      onChange={(e) => handleInputChange("parentLastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Province / State / Region *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ZA">South Africa</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      {/* Add more countries as needed */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <div className="flex gap-2">
                    <Input
                      className="w-20"
                      placeholder="###"
                      maxLength={3}
                      value={formData.phone1}
                      onChange={(e) => handleInputChange("phone1", e.target.value)}
                      required
                    />
                    <span className="flex items-center">-</span>
                    <Input
                      className="w-20"
                      placeholder="###"
                      maxLength={3}
                      value={formData.phone2}
                      onChange={(e) => handleInputChange("phone2", e.target.value)}
                      required
                    />
                    <span className="flex items-center">-</span>
                    <Input
                      className="w-24"
                      placeholder="####"
                      maxLength={4}
                      value={formData.phone3}
                      onChange={(e) => handleInputChange("phone3", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Name of Learning Institution *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange("institution", e.target.value)}
                    required
                  />
                </div>
              </div>

              <Separator />

              {/* Registration Details */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Registration Status *</Label>
                  <RadioGroup 
                    value={formData.registrationStatus}
                    onValueChange={(value) => handleInputChange("registrationStatus", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home">for my kid at home</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ecd" id="ecd" />
                      <Label htmlFor="ecd">for my ECD kids</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="school" id="school" />
                      <Label htmlFor="school">for my school kids</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teacher" id="teacher" />
                      <Label htmlFor="teacher">i am a Tech Teacher</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label>How Many Kids Are You Registering For? *</Label>
                  <RadioGroup 
                    value={formData.numberOfKids}
                    onValueChange={(value) => handleInputChange("numberOfKids", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="one" />
                      <Label htmlFor="one">1 Kid</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="more" id="more" />
                      <Label htmlFor="more">More than 1 Kid</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hearAbout">How did you hear about ECDcoding? *</Label>
                  <Input
                    id="hearAbout"
                    value={formData.hearAbout}
                    onChange={(e) => handleInputChange("hearAbout", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aspiration">Tech Education Aspiration for Your Kid(s) (200 words)</Label>
                  <Textarea
                    id="aspiration"
                    rows={6}
                    value={formData.aspiration}
                    onChange={(e) => handleInputChange("aspiration", e.target.value)}
                    placeholder="Share your aspirations for your child's tech education..."
                  />
                </div>
              </div>

              <Separator />

              {/* Learner Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">ECD Learner Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="learnerFirstName">First Name *</Label>
                    <Input
                      id="learnerFirstName"
                      value={formData.learnerFirstName}
                      onChange={(e) => handleInputChange("learnerFirstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="learnerLastName">Last Name *</Label>
                    <Input
                      id="learnerLastName"
                      value={formData.learnerLastName}
                      onChange={(e) => handleInputChange("learnerLastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship *</Label>
                  <Input
                    id="relationship"
                    value={formData.relationship}
                    onChange={(e) => handleInputChange("relationship", e.target.value)}
                    placeholder="e.g., Parent, Guardian, Teacher"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>ECD Institution Phone Number *</Label>
                  <div className="flex gap-2">
                    <Input
                      className="w-20"
                      placeholder="###"
                      maxLength={3}
                      value={formData.ecdPhone1}
                      onChange={(e) => handleInputChange("ecdPhone1", e.target.value)}
                      required
                    />
                    <span className="flex items-center">-</span>
                    <Input
                      className="w-20"
                      placeholder="###"
                      maxLength={3}
                      value={formData.ecdPhone2}
                      onChange={(e) => handleInputChange("ecdPhone2", e.target.value)}
                      required
                    />
                    <span className="flex items-center">-</span>
                    <Input
                      className="w-24"
                      placeholder="####"
                      maxLength={4}
                      value={formData.ecdPhone3}
                      onChange={(e) => handleInputChange("ecdPhone3", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ecdEmail">ECD Institution Email *</Label>
                  <Input
                    id="ecdEmail"
                    type="email"
                    value={formData.ecdEmail}
                    onChange={(e) => handleInputChange("ecdEmail", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button type="submit" size="lg" className="w-full max-w-md">
                  Submit Registration
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;