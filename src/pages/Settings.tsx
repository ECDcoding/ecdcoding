import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const navigate = useNavigate();
  const { profile, loading } = useProfile();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Parent fields
    learner_first_name: profile?.learner_first_name || "",
    learner_last_name: profile?.learner_last_name || "",
    learner_gender: profile?.learner_gender || "",
    number_of_kids: profile?.number_of_kids || "",
    relationship: profile?.relationship || "",
    
    // ECD Manager fields
    institution: profile?.institution || "",
    facility_name: profile?.facility_name || "",
    facility_type: profile?.facility_type || "",
    number_of_learners: profile?.number_of_learners || "",
    age_groups: profile?.age_groups || "",
    ecd_phone: profile?.ecd_phone || "",
    ecd_email: profile?.ecd_email || "",
    
    // Tech Teacher fields
    qualifications: profile?.qualifications || "",
    experience: profile?.experience || "",
    tech_skills: profile?.tech_skills || "",
    programming_languages: profile?.programming_languages || "",
    available_hours: profile?.available_hours || "",
    salary: profile?.salary || "",
    start_date: profile?.start_date || "",
    teaching_philosophy: profile?.teaching_philosophy || "",
    
    // Common fields
    registration_type: profile?.registration_type || "",
    password: "",
    confirmPassword: ""
  });

  const handleSave = async () => {
    if (!profile) return;

    try {
      const updateData: any = {
        registration_type: formData.registration_type || null,
      };

      // Add fields based on registration type
      if (formData.registration_type === 'parent') {
        updateData.learner_first_name = formData.learner_first_name || null;
        updateData.learner_last_name = formData.learner_last_name || null;
        updateData.learner_gender = formData.learner_gender || null;
        updateData.number_of_kids = formData.number_of_kids || null;
        updateData.relationship = formData.relationship || null;
      } else if (formData.registration_type === 'ecd-manager') {
        updateData.institution = formData.institution || null;
        updateData.facility_name = formData.facility_name || null;
        updateData.facility_type = formData.facility_type || null;
        updateData.number_of_learners = formData.number_of_learners || null;
        updateData.age_groups = formData.age_groups || null;
        updateData.ecd_phone = formData.ecd_phone || null;
        updateData.ecd_email = formData.ecd_email || null;
      } else if (formData.registration_type === 'tech-teacher') {
        updateData.qualifications = formData.qualifications || null;
        updateData.experience = formData.experience || null;
        updateData.tech_skills = formData.tech_skills || null;
        updateData.programming_languages = formData.programming_languages || null;
        updateData.available_hours = formData.available_hours || null;
        updateData.salary = formData.salary || null;
        updateData.start_date = formData.start_date || null;
        updateData.teaching_philosophy = formData.teaching_philosophy || null;
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("user_id", profile.user_id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Settings updated successfully!",
        });
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully!",
      });
      
      setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Account Type */}
          <Card>
            <CardHeader>
              <CardTitle>Account Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Registration Type</Label>
                <Select
                  value={formData.registration_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, registration_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="ecd-manager">ECD Manager</SelectItem>
                    <SelectItem value="tech-teacher">Tech Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Parent Fields */}
          {formData.registration_type === 'parent' && (
            <Card>
              <CardHeader>
                <CardTitle>Parent Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Learner First Name</Label>
                    <Input
                      value={formData.learner_first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, learner_first_name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Learner Last Name</Label>
                    <Input
                      value={formData.learner_last_name}
                      onChange={(e) =>
                        setFormData({ ...formData, learner_last_name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={formData.learner_gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, learner_gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Number of Kids</Label>
                  <Input
                    value={formData.number_of_kids}
                    onChange={(e) =>
                      setFormData({ ...formData, number_of_kids: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Input
                    value={formData.relationship}
                    onChange={(e) =>
                      setFormData({ ...formData, relationship: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* ECD Manager Fields */}
          {formData.registration_type === 'ecd-manager' && (
            <Card>
              <CardHeader>
                <CardTitle>ECD Manager Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={formData.institution}
                    onChange={(e) =>
                      setFormData({ ...formData, institution: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Facility Name</Label>
                  <Input
                    value={formData.facility_name}
                    onChange={(e) =>
                      setFormData({ ...formData, facility_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Facility Type</Label>
                  <Input
                    value={formData.facility_type}
                    onChange={(e) =>
                      setFormData({ ...formData, facility_type: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Number of Learners</Label>
                  <Input
                    value={formData.number_of_learners}
                    onChange={(e) =>
                      setFormData({ ...formData, number_of_learners: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Age Groups</Label>
                  <Input
                    value={formData.age_groups}
                    onChange={(e) =>
                      setFormData({ ...formData, age_groups: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={formData.ecd_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, ecd_phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.ecd_email}
                    onChange={(e) =>
                      setFormData({ ...formData, ecd_email: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tech Teacher Fields */}
          {formData.registration_type === 'tech-teacher' && (
            <Card>
              <CardHeader>
                <CardTitle>Tech Teacher Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Qualifications</Label>
                  <Input
                    value={formData.qualifications}
                    onChange={(e) =>
                      setFormData({ ...formData, qualifications: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Experience</Label>
                  <Input
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tech Skills</Label>
                  <Input
                    value={formData.tech_skills}
                    onChange={(e) =>
                      setFormData({ ...formData, tech_skills: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Programming Languages</Label>
                  <Input
                    value={formData.programming_languages}
                    onChange={(e) =>
                      setFormData({ ...formData, programming_languages: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Available Hours</Label>
                  <Input
                    value={formData.available_hours}
                    onChange={(e) =>
                      setFormData({ ...formData, available_hours: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expected Salary</Label>
                  <Input
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teaching Philosophy</Label>
                  <Textarea
                    value={formData.teaching_philosophy}
                    onChange={(e) =>
                      setFormData({ ...formData, teaching_philosophy: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleChangePassword}>Update Password</Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
