import { User, Key, Phone, LogOut, Settings, Save, X, Upload, Camera, ImageIcon, Film, Play } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ProfileDropdownProps {
  profileImage?: string | null;
  onLogout: () => void;
}

export const ProfileDropdown = ({ profileImage, onLogout }: ProfileDropdownProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaUploadOpen, setMediaUploadOpen] = useState(false);
  const [mediaType, setMediaType] = useState<'picture' | 'video'>('picture');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');
  const [uploadedMedia, setUploadedMedia] = useState<Array<{
    id: string;
    type: 'picture' | 'video';
    file: File;
    preview: string;
    thumbnail?: string;
    title: string;
    description: string;
  }>>([]);
  const [formData, setFormData] = useState({
    // Parent fields
    learner_first_name: "",
    learner_last_name: "",
    learner_gender: "",
    number_of_kids: "",
    relationship: "",
    learner_progress_report: "",
    
    // ECD Manager fields
    institution: "",
    facility_name: "",
    facility_type: "",
    number_of_learners: "",
    age_groups: "",
    ecd_phone: "",
    ecd_email: "",
    
    // Tech Teacher fields
    qualifications: "",
    experience: "",
    tech_skills: "",
    programming_languages: "",
    available_hours: "",
    salary: "",
    start_date: "",
    teaching_philosophy: "",
    
    // Common fields
    registration_type: "",
    password: "",
    confirmPassword: ""
  });
  const { profile, loading } = useProfile();
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectChange = (value: string) => {
    if (value === "profile") {
      setProfileOpen(true);
      if (profile) {
        setFormData({
          // Parent fields
          learner_first_name: profile.learner_first_name || "",
          learner_last_name: profile.learner_last_name || "",
          learner_gender: profile.learner_gender || "",
          number_of_kids: profile.number_of_kids || "",
          relationship: profile.relationship || "",
          learner_progress_report: profile.learner_progress_report || "",
          
          // ECD Manager fields
          institution: profile.institution || "",
          facility_name: profile.facility_name || "",
          facility_type: profile.facility_type || "",
          number_of_learners: profile.number_of_learners || "",
          age_groups: profile.age_groups || "",
          ecd_phone: profile.ecd_phone || "",
          ecd_email: profile.ecd_email || "",
          
          // Tech Teacher fields
          qualifications: profile.qualifications || "",
          experience: profile.experience || "",
          tech_skills: profile.tech_skills || "",
          programming_languages: profile.programming_languages || "",
          available_hours: profile.available_hours || "",
          salary: profile.salary || "",
          start_date: profile.start_date || "",
          teaching_philosophy: profile.teaching_philosophy || "",
          
          // Common fields
          registration_type: profile.registration_type || "",
          password: "",
          confirmPassword: ""
        });
      }
    } else if (value === "settings") {
      setProfileOpen(true);
      setIsEditing(true);
      if (profile) {
        setFormData({
          // Parent fields
          learner_first_name: profile.learner_first_name || "",
          learner_last_name: profile.learner_last_name || "",
          learner_gender: profile.learner_gender || "",
          number_of_kids: profile.number_of_kids || "",
          relationship: profile.relationship || "",
          learner_progress_report: profile.learner_progress_report || "",
          
          // ECD Manager fields
          institution: profile.institution || "",
          facility_name: profile.facility_name || "",
          facility_type: profile.facility_type || "",
          number_of_learners: profile.number_of_learners || "",
          age_groups: profile.age_groups || "",
          ecd_phone: profile.ecd_phone || "",
          ecd_email: profile.ecd_email || "",
          
          // Tech Teacher fields
          qualifications: profile.qualifications || "",
          experience: profile.experience || "",
          tech_skills: profile.tech_skills || "",
          programming_languages: profile.programming_languages || "",
          available_hours: profile.available_hours || "",
          salary: profile.salary || "",
          start_date: profile.start_date || "",
          teaching_philosophy: profile.teaching_philosophy || "",
          
          // Common fields
          registration_type: profile.registration_type || "",
          password: "",
          confirmPassword: ""
        });
      }
    } else if (value === "logout") {
      onLogout();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        // Parent fields
        learner_first_name: profile.learner_first_name || "",
        learner_last_name: profile.learner_last_name || "",
        learner_gender: profile.learner_gender || "",
        number_of_kids: profile.number_of_kids || "",
        relationship: profile.relationship || "",
        learner_progress_report: profile.learner_progress_report || "",
        
        // ECD Manager fields
        institution: profile.institution || "",
        facility_name: profile.facility_name || "",
        facility_type: profile.facility_type || "",
        number_of_learners: profile.number_of_learners || "",
        age_groups: profile.age_groups || "",
        ecd_phone: profile.ecd_phone || "",
        ecd_email: profile.ecd_email || "",
        
        // Tech Teacher fields
        qualifications: profile.qualifications || "",
        experience: profile.experience || "",
        tech_skills: profile.tech_skills || "",
        programming_languages: profile.programming_languages || "",
        available_hours: profile.available_hours || "",
        salary: profile.salary || "",
        start_date: profile.start_date || "",
        teaching_philosophy: profile.teaching_philosophy || "",
        
        // Common fields
        registration_type: profile.registration_type || "",
        password: "",
        confirmPassword: ""
      });
    }
  };

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
        updateData.learner_progress_report = formData.learner_progress_report || null;
      } else if (formData.registration_type === 'ecd-manager') {
        updateData.institution = formData.institution || null;
        updateData.facility_name = formData.facility_name || null;
        updateData.facility_type = formData.facility_type || null;
        updateData.number_of_learners = formData.number_of_learners || null;
        updateData.age_groups = formData.age_groups || null;
        updateData.learner_progress_report = formData.learner_progress_report || null;
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

      // Update profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("user_id", profile.user_id);

      if (profileError) throw profileError;

      // Update sensitive data if it exists
      if (formData.learner_progress_report) {
        const { error: sensitiveError } = await supabase
          .from("profile_sensitive_data")
          .upsert({
            user_id: profile.user_id,
            learner_progress_report: formData.learner_progress_report
          });
        
        if (sensitiveError) throw sensitiveError;
      }

      const error = profileError;

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Profile updated successfully!",
        });
        setIsEditing(false);
        // The profile will be refetched automatically due to the useProfile hook
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_image_url: data.publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Profile picture updated successfully!",
      });
      
      // Reload the page to see the updated profile picture
      window.location.reload();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
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

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openMediaUpload = (type: 'picture' | 'video') => {
    setMediaType(type);
    setMediaUploadOpen(true);
    setMediaFile(null);
    setMediaPreview(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setMediaTitle('');
    setMediaDescription('');
  };

  const handleMediaSubmit = () => {
    if (!mediaFile || !mediaTitle.trim() || !mediaDescription.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select a file",
        variant: "destructive",
      });
      return;
    }

    const newMedia = {
      id: Date.now().toString(),
      type: mediaType,
      file: mediaFile,
      preview: mediaPreview!,
      thumbnail: thumbnailPreview || undefined,
      title: mediaTitle,
      description: mediaDescription,
    };

    setUploadedMedia(prev => [...prev, newMedia]);
    setMediaUploadOpen(false);
    
    toast({
      title: "Success",
      description: `Successfully uploaded ${mediaType}: ${mediaTitle}`,
    });
  };

  const getAgeFromAgeGroup = (ageGroup?: string) => {
    if (!ageGroup) return "Not specified";
    if (ageGroup === "04-06") return "4-6 years";
    if (ageGroup === "07-10") return "7-10 years";
    return ageGroup;
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-14 h-14 rounded-full border-2 border-white/20 bg-profile-bg flex items-center justify-center">
            {profileImage || profile?.profile_image_url ? (
              <img src={profileImage || profile?.profile_image_url || undefined} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-profile-text text-sm">Photo</span>
            )}
          </SelectTrigger>
          <SelectContent className="bg-profile-bg border border-gray-200 shadow-lg z-50">
            <SelectItem value="profile" className="text-profile-text hover:bg-white/20 flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </SelectItem>
            <SelectItem value="contact-details" className="text-profile-text hover:bg-white/20 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Details
            </SelectItem>
            <SelectItem value="settings" className="text-profile-text hover:bg-white/20 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </SelectItem>
            <SelectItem value="logout" className="text-profile-text hover:bg-white/20">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </SelectItem>
          </SelectContent>
        </Select>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

       <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="flex flex-row items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1">
                <div 
                  className={`relative group ${isEditing ? 'cursor-pointer' : ''}`}
                  onClick={isEditing ? () => fileInputRef.current?.click() : undefined}
                >
                  <Avatar className={`w-12 h-12 ${isEditing ? 'group-hover:opacity-80 transition-opacity' : ''}`}>
                    <AvatarImage src={profileImage || profile?.profile_image_url || undefined} />
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {(isEditing ? formData.learner_first_name : profile?.learner_first_name)?.[0] || profile?.first_name?.[0] || '?'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                {profile && (
                  <p className="text-xs text-muted-foreground">
                    {profile.registration_type || 'Not specified'}
                  </p>
                )}
              </div>
              {isEditing && (
                <p className="text-xs text-muted-foreground mt-3">Click photo to change</p>
              )}
            </div>
            {!isEditing && profile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </DialogHeader>
          
          {loading ? (
            <div className="text-center py-6">Loading profile...</div>
          ) : profile ? (
            <div className="space-y-6">
              {!isEditing ? (
                /* View Mode */
                <div className="space-y-4 flex flex-col items-center">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {profile.learner_first_name && profile.learner_last_name 
                        ? `${profile.learner_first_name} ${profile.learner_last_name}`
                        : `${profile.first_name} ${profile.last_name}`
                      }
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm max-w-sm">
                    <div className="text-center">
                      <span className="font-medium text-muted-foreground">Age:</span>
                      <p>{getAgeFromAgeGroup(profile.number_of_kids)}</p>
                    </div>
                    
                    <div className="text-center">
                      <span className="font-medium text-muted-foreground">Gender:</span>
                      <p>{profile.learner_gender ? 
                          profile.learner_gender.charAt(0).toUpperCase() + profile.learner_gender.slice(1) 
                          : 'Not specified'}</p>
                    </div>
                    
                    <div className="text-center">
                      <span className="font-medium text-muted-foreground">ECD Institution:</span>
                      <p>{profile.institution || 'Not specified'}</p>
                    </div>
                    
                    <div className="text-center">
                      <span className="font-medium text-muted-foreground">Country:</span>
                      <p>{profile.country}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="account_type">Account Type</Label>
                    <Select
                      value={formData.registration_type}
                      onValueChange={(value) => setFormData(prev => ({...prev, registration_type: value}))}
                    >
                      <SelectTrigger id="account_type" className="bg-background">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-gray-200 shadow-lg z-50">
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="ecd-manager">ECD Manager</SelectItem>
                        <SelectItem value="tech-teacher">Tech Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Parent Fields */}
                  {formData.registration_type === 'parent' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="learner_first_name">Learner First Name</Label>
                          <Input
                            id="learner_first_name"
                            value={formData.learner_first_name}
                            onChange={(e) => setFormData(prev => ({...prev, learner_first_name: e.target.value}))}
                            placeholder="Enter first name"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="learner_last_name">Learner Last Name</Label>
                          <Input
                            id="learner_last_name"
                            value={formData.learner_last_name}
                            onChange={(e) => setFormData(prev => ({...prev, learner_last_name: e.target.value}))}
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="learner_gender">Learner Gender</Label>
                          <Select
                            value={formData.learner_gender}
                            onValueChange={(value) => setFormData(prev => ({...prev, learner_gender: value}))}
                          >
                            <SelectTrigger id="learner_gender" className="bg-background">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border border-gray-200 shadow-lg z-50">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="number_of_kids">Number of Kids</Label>
                          <Input
                            id="number_of_kids"
                            value={formData.number_of_kids}
                            onChange={(e) => setFormData(prev => ({...prev, number_of_kids: e.target.value}))}
                            placeholder="e.g., 1, 2, 3"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="relationship">Relationship to Learner</Label>
                        <Input
                          id="relationship"
                          value={formData.relationship}
                          onChange={(e) => setFormData(prev => ({...prev, relationship: e.target.value}))}
                          placeholder="e.g., Parent, Guardian"
                        />
                      </div>

                      <div>
                        <Label htmlFor="learner_progress_report">Learner Progress Report</Label>
                        <Textarea
                          id="learner_progress_report"
                          value={formData.learner_progress_report}
                          onChange={(e) => setFormData(prev => ({...prev, learner_progress_report: e.target.value}))}
                          placeholder="Brief progress report (max 200 characters)"
                          maxLength={200}
                          className="resize-none"
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {formData.learner_progress_report.length}/200 characters
                        </p>
                      </div>
                    </>
                  )}

                  {/* ECD Manager Fields */}
                  {formData.registration_type === 'ecd-manager' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="institution">Institution</Label>
                          <Input
                            id="institution"
                            value={formData.institution}
                            onChange={(e) => setFormData(prev => ({...prev, institution: e.target.value}))}
                            placeholder="Institution name"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="facility_name">Facility Name</Label>
                          <Input
                            id="facility_name"
                            value={formData.facility_name}
                            onChange={(e) => setFormData(prev => ({...prev, facility_name: e.target.value}))}
                            placeholder="Facility name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="facility_type">Facility Type</Label>
                          <Input
                            id="facility_type"
                            value={formData.facility_type}
                            onChange={(e) => setFormData(prev => ({...prev, facility_type: e.target.value}))}
                            placeholder="e.g., Daycare, Preschool"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="number_of_learners">Number of Learners</Label>
                          <Input
                            id="number_of_learners"
                            value={formData.number_of_learners}
                            onChange={(e) => setFormData(prev => ({...prev, number_of_learners: e.target.value}))}
                            placeholder="e.g., 20, 50"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="age_groups">Age Groups</Label>
                        <Input
                          id="age_groups"
                          value={formData.age_groups}
                          onChange={(e) => setFormData(prev => ({...prev, age_groups: e.target.value}))}
                          placeholder="e.g., 2-4, 5-6"
                        />
                      </div>

                      <div>
                        <Label htmlFor="learner_progress_report">Learner Progress Report</Label>
                        <Textarea
                          id="learner_progress_report"
                          value={formData.learner_progress_report}
                          onChange={(e) => setFormData(prev => ({...prev, learner_progress_report: e.target.value}))}
                          placeholder="Brief progress report (max 200 characters)"
                          maxLength={200}
                          className="resize-none"
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {formData.learner_progress_report.length}/200 characters
                        </p>
                      </div>
                    </>
                  )}

                  {/* Tech Teacher Fields */}
                  {formData.registration_type === 'tech-teacher' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="qualifications">Qualifications</Label>
                          <Input
                            id="qualifications"
                            value={formData.qualifications}
                            onChange={(e) => setFormData(prev => ({...prev, qualifications: e.target.value}))}
                            placeholder="Your qualifications"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="experience">Experience (years)</Label>
                          <Input
                            id="experience"
                            value={formData.experience}
                            onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
                            placeholder="Years of experience"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="tech_skills">Tech Skills</Label>
                        <Input
                          id="tech_skills"
                          value={formData.tech_skills}
                          onChange={(e) => setFormData(prev => ({...prev, tech_skills: e.target.value}))}
                          placeholder="e.g., Web Development, AI"
                        />
                      </div>

                      <div>
                        <Label htmlFor="programming_languages">Programming Languages</Label>
                        <Input
                          id="programming_languages"
                          value={formData.programming_languages}
                          onChange={(e) => setFormData(prev => ({...prev, programming_languages: e.target.value}))}
                          placeholder="e.g., Python, JavaScript"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="available_hours">Available Hours/Week</Label>
                          <Input
                            id="available_hours"
                            value={formData.available_hours}
                            onChange={(e) => setFormData(prev => ({...prev, available_hours: e.target.value}))}
                            placeholder="e.g., 20 hours"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="salary">Expected Salary</Label>
                          <Input
                            id="salary"
                            value={formData.salary}
                            onChange={(e) => setFormData(prev => ({...prev, salary: e.target.value}))}
                            placeholder="Expected salary"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="start_date">Available Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={formData.start_date}
                          onChange={(e) => setFormData(prev => ({...prev, start_date: e.target.value}))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="teaching_philosophy">Teaching Philosophy</Label>
                        <Input
                          id="teaching_philosophy"
                          value={formData.teaching_philosophy}
                          onChange={(e) => setFormData(prev => ({...prev, teaching_philosophy: e.target.value}))}
                          placeholder="Your teaching philosophy"
                        />
                      </div>
                    </>
                  )}

                   {/* Change Password Section - Only for Tech Teacher */}
                   {formData.registration_type === 'tech-teacher' && (
                     <div className="border-t pt-4 space-y-4">
                       <h4 className="font-medium flex items-center gap-2">
                         <Key className="h-4 w-4" />
                         Change Password
                       </h4>
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <Label htmlFor="password">New Password</Label>
                           <Input
                             id="password"
                             type="password"
                             value={formData.password}
                             onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                             placeholder="Enter new password"
                           />
                         </div>
                         <div>
                           <Label htmlFor="confirmPassword">Confirm Password</Label>
                           <Input
                             id="confirmPassword"
                             type="password"
                             value={formData.confirmPassword}
                             onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                             placeholder="Confirm password"
                           />
                         </div>
                       </div>
                       {formData.password && (
                         <Button
                           variant="outline"
                           onClick={handleChangePassword}
                           className="w-full"
                         >
                           Update Password
                         </Button>
                       )}
                     </div>
                   )}

                   <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="flex items-center gap-1"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="flex items-center gap-1"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No profile information available
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Media Upload Dialog */}
      <Dialog open={mediaUploadOpen} onOpenChange={setMediaUploadOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {mediaType === 'picture' ? <ImageIcon className="h-5 w-5" /> : <Film className="h-5 w-5" />}
              Upload {mediaType === 'picture' ? 'Picture' : 'Video Clip'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <Label htmlFor="media-file" className="text-sm font-medium">
                Select {mediaType === 'picture' ? 'Image' : 'Video'} File *
              </Label>
              <Input
                id="media-file"
                type="file"
                accept={mediaType === 'picture' ? 'image/*' : 'video/*'}
                onChange={handleMediaUpload}
                className="mt-1"
              />
              {mediaPreview && (
                <div className="mt-2">
                  {mediaType === 'picture' ? (
                    <img src={mediaPreview} alt="Preview" className="max-w-full h-32 object-cover rounded" />
                  ) : (
                    <video src={mediaPreview} className="max-w-full h-32 object-cover rounded" controls />
                  )}
                </div>
              )}
            </div>

            {/* Thumbnail Upload (for videos) */}
            {mediaType === 'video' && (
              <div>
                <Label htmlFor="thumbnail-file" className="text-sm font-medium">
                  Thumbnail Image (Optional)
                </Label>
                <Input
                  id="thumbnail-file"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="mt-1"
                />
                {thumbnailPreview && (
                  <div className="mt-2">
                    <img src={thumbnailPreview} alt="Thumbnail Preview" className="max-w-full h-20 object-cover rounded" />
                  </div>
                )}
              </div>
            )}

            {/* Title */}
            <div>
              <Label htmlFor="media-title" className="text-sm font-medium">
                Title *
              </Label>
              <Input
                id="media-title"
                value={mediaTitle}
                onChange={(e) => setMediaTitle(e.target.value)}
                placeholder={`Enter ${mediaType} title...`}
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="media-description" className="text-sm font-medium">
                Description *
              </Label>
              <Textarea
                id="media-description"
                value={mediaDescription}
                onChange={(e) => setMediaDescription(e.target.value)}
                placeholder={`Describe this ${mediaType} and its educational value...`}
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleMediaSubmit} className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Upload {mediaType === 'picture' ? 'Picture' : 'Video'}
              </Button>
              <Button variant="outline" onClick={() => setMediaUploadOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Uploaded Media Gallery */}
      {uploadedMedia.length > 0 && (
        <Dialog open={uploadedMedia.length > 0}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                🎥 Your Media Gallery
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedMedia.map((media) => (
                <Card key={media.id} className="bg-white shadow-lg">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      {media.type === 'picture' ? (
                        <img 
                          src={media.preview} 
                          alt={media.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          {media.thumbnail ? (
                            <img 
                              src={media.thumbnail} 
                              alt={`${media.title} thumbnail`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video 
                              src={media.preview} 
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play className="h-12 w-12 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{media.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{media.description}</p>
                    <div className="flex items-center gap-2">
                      {media.type === 'picture' ? (
                        <ImageIcon className="h-4 w-4 text-green-600" />
                      ) : (
                        <Film className="h-4 w-4 text-blue-600" />
                      )}
                      <span className="text-xs text-gray-500 capitalize">{media.type}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};