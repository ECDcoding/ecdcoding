import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";
import { format } from "date-fns";
import VerifiedBadge from "@/components/VerifiedBadge";

interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  registration_type: string;
  country: string;
  state: string;
  institution?: string;
  created_at: string;
  profile_image_url?: string;
}

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: true }); // Order by oldest first to identify first 200

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get first 200 parent/ECD manager user IDs for the orange tick
  const getEarlyAdopterIds = () => {
    const eligibleProfiles = profiles.filter(
      (p) => p.registration_type === "parent" || p.registration_type === "ecd-manager"
    );
    return new Set(eligibleProfiles.slice(0, 200).map((p) => p.user_id));
  };

  const earlyAdopterIds = getEarlyAdopterIds();

  const isEarlyAdopter = (profile: UserProfile) => {
    return earlyAdopterIds.has(profile.user_id);
  };

  // Re-sort for display (newest first)
  const displayProfiles = [...profiles].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const getRegistrationTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      parent: "default",
      "ecd-manager": "secondary",
      "tech-teacher": "outline",
    };
    return (
      <Badge variant={variants[type] || "default"} className="capitalize">
        {type.replace("-", " ")}
      </Badge>
    );
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  View all registered users and their profiles
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total Users: <span className="font-semibold text-foreground">{profiles.length}</span>
              </p>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[80px]">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayProfiles.map((profile) => (
                    <TableRow key={profile.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={profile.profile_image_url} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {getInitials(profile.first_name, profile.last_name)}
                            </AvatarFallback>
                          </Avatar>
                          {isEarlyAdopter(profile) && (
                            <VerifiedBadge 
                              size="sm" 
                              className="absolute -bottom-1 -right-1 ring-2 ring-background" 
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-1.5">
                          {profile.first_name} {profile.last_name}
                          {isEarlyAdopter(profile) && (
                            <VerifiedBadge size="sm" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        @{profile.username}
                      </TableCell>
                      <TableCell>
                        {getRegistrationTypeBadge(profile.registration_type)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{profile.state}</div>
                          <div className="text-muted-foreground">{profile.country}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {profile.institution || "-"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(new Date(profile.created_at), "MMM dd, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {profiles.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No registered users yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
