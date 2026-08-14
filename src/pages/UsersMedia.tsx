import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { InstitutionCommunity } from "@/components/InstitutionCommunity";
import { ArrowLeft, Film, Loader2 } from "lucide-react";

/** Fourth dashboard page: all user engagements (communities, posts, media). */
const UsersMedia = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) navigate("/sign-in");
  }, [authLoading, user, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1c21]">
        <Loader2 className="h-8 w-8 animate-spin text-lime-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1c21] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4 text-white hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Film className="h-6 w-6 text-lime-500" />
            <h1 className="text-3xl font-bold text-white">Users' Media</h1>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            All your engagements in one place — communities, posts, tagged mentions, comments and
            shared media.
          </p>
        </header>

        <div className="rounded-xl border border-white/10 bg-[#2a2d34] p-4 sm:p-6">
          <InstitutionCommunity
            userId={user.id}
            registrationType={profile?.registration_type}
            profile={profile as any}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersMedia;
