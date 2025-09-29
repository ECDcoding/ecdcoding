import { User, Key, Phone, LogOut } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfileDropdownProps {
  profileImage?: string | null;
  onLogout: () => void;
}

export const ProfileDropdown = ({ profileImage, onLogout }: ProfileDropdownProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { profile, loading } = useProfile();

  const handleSelectChange = (value: string) => {
    if (value === "profile") {
      setProfileOpen(true);
    } else if (value === "logout") {
      onLogout();
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
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">Learner Profile</DialogTitle>
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
                    {profile.learner_first_name?.[0] || profile.first_name?.[0] || '?'}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Child Information */}
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