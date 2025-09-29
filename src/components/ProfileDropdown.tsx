import { User, Key, Phone, LogOut, Settings, Save, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileDropdownProps {
  profileImage?: string | null;
  onLogout: () => void;
}

export const ProfileDropdown = ({ profileImage, onLogout }: ProfileDropdownProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    learner_first_name: "",
    learner_last_name: "",
    learner_gender: "",
    institution: "",
    number_of_kids: ""
  });
  const { profile, loading } = useProfile();
  const { toast } = useToast();

  const handleSelectChange = (value: string) => {
    if (value === "profile") {
      setProfileOpen(true);
      if (profile) {
        setFormData({
          learner_first_name: profile.learner_first_name || "",
          learner_last_name: profile.learner_last_name || "",
          learner_gender: profile.learner_gender || "",
          institution: profile.institution || "",
          number_of_kids: profile.number_of_kids || ""
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
        learner_first_name: profile.learner_first_name || "",
        learner_last_name: profile.learner_last_name || "",
        learner_gender: profile.learner_gender || "",
        institution: profile.institution || "",
        number_of_kids: profile.number_of_kids || ""
      });
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          learner_first_name: formData.learner_first_name || null,
          learner_last_name: formData.learner_last_name || null,
          learner_gender: formData.learner_gender || null,
          institution: formData.institution || null,
          number_of_kids: formData.number_of_kids || null,
        })
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

  const getAgeFromAgeGroup = (ageGroup?: string) => {
    if (!ageGroup) return "Not specified";
    if (ageGroup === "04-06") return "4-6 years";
    if (ageGroup === "07-10") return "7-10 years";
    return ageGroup;
  };

  return (
    <>
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-10 h-10 rounded-full border-2 border-white/20 bg-profile-bg flex items-center justify-center">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-profile-text text-xs">Photo</span>
          )}
        </SelectTrigger>
        <SelectContent className="bg-profile-bg border border-gray-200 shadow-lg z-50">
          <SelectItem value="profile" className="text-profile-text hover:bg-white/20 flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </SelectItem>
          <SelectItem value="change-password" className="text-profile-text hover:bg-white/20 flex items-center gap-2">
            <Key className="h-4 w-4" />
            Change Password
          </SelectItem>
          <SelectItem value="contact-details" className="text-profile-text hover:bg-white/20 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact Details
          </SelectItem>
          <SelectItem value="logout" className="text-profile-text hover:bg-white/20">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </SelectItem>
        </SelectContent>
      </Select>

       <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-bold">Learner Profile</DialogTitle>
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
              {/* Profile Avatar */}
              <div className="flex justify-center">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileImage || undefined} />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {(isEditing ? formData.learner_first_name : profile.learner_first_name)?.[0] || profile.first_name?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
              </div>

              {!isEditing ? (
                /* View Mode */
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {profile.learner_first_name && profile.learner_last_name 
                        ? `${profile.learner_first_name} ${profile.learner_last_name}`
                        : `${profile.first_name} ${profile.last_name}`
                      }
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Age:</span>
                      <p>{getAgeFromAgeGroup(profile.number_of_kids)}</p>
                    </div>
                    
                    <div>
                      <span className="font-medium text-muted-foreground">Gender:</span>
                      <p>{profile.learner_gender ? 
                          profile.learner_gender.charAt(0).toUpperCase() + profile.learner_gender.slice(1) 
                          : 'Not specified'}</p>
                    </div>
                    
                    <div className="col-span-2">
                      <span className="font-medium text-muted-foreground">ECD Institution:</span>
                      <p>{profile.institution || 'Not specified'}</p>
                    </div>
                    
                    <div className="col-span-2">
                      <span className="font-medium text-muted-foreground">Country:</span>
                      <p>{profile.country}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="learner_first_name">First Name</Label>
                      <Input
                        id="learner_first_name"
                        value={formData.learner_first_name}
                        onChange={(e) => setFormData(prev => ({...prev, learner_first_name: e.target.value}))}
                        placeholder="Enter first name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="learner_last_name">Last Name</Label>
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
                      <Label htmlFor="learner_gender">Gender</Label>
                      <Input
                        id="learner_gender"
                        value={formData.learner_gender}
                        onChange={(e) => setFormData(prev => ({...prev, learner_gender: e.target.value}))}
                        placeholder="e.g., Male, Female"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="number_of_kids">Age Group</Label>
                      <Input
                        id="number_of_kids"
                        value={formData.number_of_kids}
                        onChange={(e) => setFormData(prev => ({...prev, number_of_kids: e.target.value}))}
                        placeholder="e.g., 04-06, 07-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="institution">ECD Institution</Label>
                    <Input
                      id="institution"
                      value={formData.institution}
                      onChange={(e) => setFormData(prev => ({...prev, institution: e.target.value}))}
                      placeholder="Enter institution name"
                    />
                  </div>

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
    </>
  );
};