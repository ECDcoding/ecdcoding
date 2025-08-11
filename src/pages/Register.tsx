import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();
  const registrationType = searchParams.get('type') || 'parent';
  
  const [formData, setFormData] = useState({
    // Common fields
    firstName: "",
    lastName: "",
    email: "",
    phone1: "",
    phone2: "",
    phone3: "",
    state: "",
    country: "",
    username: "",
    password: "",
    
    // Parent/Learner specific
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
    
    // ECD Manager specific
    facilityName: "",
    facilityType: "",
    numberOfLearners: "",
    ageGroups: "",
    currentPrograms: "",
    techGoals: "",
    
    // Tech Teacher specific
    qualifications: "",
    experience: "",
    techSkills: "",
    programmingLanguages: "",
    teachingPhilosophy: "",
    availableHours: "",
    salary: "",
    startDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData, "Type:", registrationType);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFormTitle = () => {
    switch (registrationType) {
      case 'parent':
        return 'Membership Registration for a Learner(s)';
      case 'ecd-manager':
        return 'ECD Manager Registration';
      case 'tech-teacher':
        return 'Tech Teacher Application';
      default:
        return 'Registration Form';
    }
  };

  const getFormSubtitle = () => {
    switch (registrationType) {
      case 'parent':
        return 'Register your child for our learning programs';
      case 'ecd-manager':
        return 'Join our network of Early Childhood Development partners';
      case 'tech-teacher':
        return 'Apply to join our team of tech educators';
      default:
        return '';
    }
  };

  const renderParentForm = () => (
    <>
      {/* Parent/Guardian Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Parent/Guardian Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
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


        {/* Username and Password Creation */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Create Username *</Label>
            <Input
              id="username"
              value={formData.username || ''}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter desired username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Create Password *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password || ''}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="One capital letter, a number, and a punctuation"
              required
            />
            <p className="text-xs text-gray-600">Must contain: 1 capital letter, 1 number, 1 punctuation mark</p>
          </div>
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
        
        <div className="space-y-2">
          <Label htmlFor="institution">Name of Learning Institution *</Label>
          <Input
            id="institution"
            value={formData.institution}
            onChange={(e) => handleInputChange("institution", e.target.value)}
            required
          />
        </div>
        
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
    </>
  );

  const renderECDManagerForm = () => (
    <>
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Manager Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
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
      </div>

      <Separator />

      {/* Facility Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">ECD Facility Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="facilityName">Facility Name *</Label>
          <Input
            id="facilityName"
            value={formData.facilityName}
            onChange={(e) => handleInputChange("facilityName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facilityType">Facility Type *</Label>
          <Select onValueChange={(value) => handleInputChange("facilityType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select facility type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daycare">Daycare Center</SelectItem>
              <SelectItem value="preschool">Preschool</SelectItem>
              <SelectItem value="nursery">Nursery School</SelectItem>
              <SelectItem value="creche">Crèche</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberOfLearners">Number of Learners *</Label>
          <Input
            id="numberOfLearners"
            type="number"
            value={formData.numberOfLearners}
            onChange={(e) => handleInputChange("numberOfLearners", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ageGroups">Age Groups Served *</Label>
          <Input
            id="ageGroups"
            value={formData.ageGroups}
            onChange={(e) => handleInputChange("ageGroups", e.target.value)}
            placeholder="e.g., 3-6 years"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentPrograms">Current Educational Programs</Label>
          <Textarea
            id="currentPrograms"
            rows={4}
            value={formData.currentPrograms}
            onChange={(e) => handleInputChange("currentPrograms", e.target.value)}
            placeholder="Describe your current educational programs..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techGoals">Technology Education Goals</Label>
          <Textarea
            id="techGoals"
            rows={4}
            value={formData.techGoals}
            onChange={(e) => handleInputChange("techGoals", e.target.value)}
            placeholder="What are your goals for introducing technology education?"
          />
        </div>

        <div className="space-y-4">
          <Label>Motivation for Participation *</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="introduce-tech" className="rounded border-border" />
              <Label htmlFor="introduce-tech">Introduce Tech Lessons at My School</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="hire-teachers" className="rounded border-border" />
              <Label htmlFor="hire-teachers">Hire Tech Teachers</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="adaptation" className="rounded border-border" />
              <Label htmlFor="adaptation">Adaptation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="other-motivation" className="rounded border-border" />
              <Label htmlFor="other-motivation">Other</Label>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderTechTeacherForm = () => (
    <>
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Personal Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
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
      </div>

      <Separator />

      {/* Professional Qualifications */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Professional Qualifications</h3>
        
        <div className="space-y-2">
          <Label htmlFor="qualifications">Educational Qualifications *</Label>
          <Textarea
            id="qualifications"
            rows={4}
            value={formData.qualifications}
            onChange={(e) => handleInputChange("qualifications", e.target.value)}
            placeholder="List your degrees, certifications, and relevant qualifications..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Teaching Experience *</Label>
          <Textarea
            id="experience"
            rows={4}
            value={formData.experience}
            onChange={(e) => handleInputChange("experience", e.target.value)}
            placeholder="Describe your teaching experience, especially with children..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techSkills">Technology Skills *</Label>
          <Textarea
            id="techSkills"
            rows={4}
            value={formData.techSkills}
            onChange={(e) => handleInputChange("techSkills", e.target.value)}
            placeholder="List your technical skills relevant to teaching kids..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resume">Upload One Page Resume *</Label>
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full p-3 border rounded-md"
            required
          />
          <p className="text-sm text-gray-600">Please upload your resume (PDF, DOC, or DOCX format, max 1 page)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="programmingLanguages">Programming Languages Known</Label>
          <Input
            id="programmingLanguages"
            value={formData.programmingLanguages}
            onChange={(e) => handleInputChange("programmingLanguages", e.target.value)}
            placeholder="e.g., Scratch, Python, JavaScript, HTML/CSS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="teachingPhilosophy">Teaching Philosophy *</Label>
          <Textarea
            id="teachingPhilosophy"
            rows={4}
            value={formData.teachingPhilosophy}
            onChange={(e) => handleInputChange("teachingPhilosophy", e.target.value)}
            placeholder="Describe your approach to teaching technology to young learners..."
            required
          />
        </div>
      </div>

      <Separator />

      {/* Employment Details */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Employment Preferences</h3>
        
        <div className="space-y-2">
          <Label htmlFor="availableHours">Available Hours per Week *</Label>
          <Select onValueChange={(value) => handleInputChange("availableHours", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="part-time">Part-time (10-20 hours)</SelectItem>
              <SelectItem value="full-time">Full-time (40+ hours)</SelectItem>
              <SelectItem value="flexible">Flexible/Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Expected Salary Range *</Label>
          <Select onValueChange={(value) => handleInputChange("salary", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15000-25000">R15,000 - R25,000</SelectItem>
              <SelectItem value="25000-35000">R25,000 - R35,000</SelectItem>
              <SelectItem value="35000-50000">R35,000 - R50,000</SelectItem>
              <SelectItem value="50000+">R50,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Available Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            required
          />
        </div>
      </div>
    </>
  );

  const renderForm = () => {
    switch (registrationType) {
      case 'parent':
        return renderParentForm();
      case 'ecd-manager':
        return renderECDManagerForm();
      case 'tech-teacher':
        return renderTechTeacherForm();
      default:
        return renderParentForm();
    }
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
            <CardTitle className="text-2xl">{getFormTitle()}</CardTitle>
            <p className="text-muted-foreground">
              {registrationType === 'parent' ? 'ECD Centers | Pre-Schools | Creches | Primary Schools and Other' : getFormSubtitle()}
            </p>
          </CardHeader>
          
          <CardContent className="register-form-theme">
            <form onSubmit={handleSubmit} className="space-y-8 text-foreground font-semibold">
              {renderForm()}

              {/* Payment Section */}
              {registrationType === 'tech-teacher' && (
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 text-center">
                  <h3 className="text-lg font-semibold mb-2">Registration Fee</h3>
                  <p className="text-xl font-bold text-blue-600 mb-4">R500.00 /annual</p>
                  <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Pay Here
                  </Button>
                </div>
              )}

              {registrationType === 'parent' && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Registration Fee</h3>
                    <p className="text-sm mb-2">R250.00 /month | or R3000.00 /annual</p>
                    <p className="text-sm text-green-600 mb-2">24 months future payment exemption for 'early bird registrations' who will start paying upfront</p>
                    <Button variant="outline" className="w-full">Pay Here</Button>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-6">
                <Button type="submit" size="lg" className="w-full max-w-md">
                  {registrationType === 'tech-teacher' ? 'Submit Application' : 'Submit Registration'}
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