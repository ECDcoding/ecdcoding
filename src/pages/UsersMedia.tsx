import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { InstitutionCommunity } from "@/components/InstitutionCommunity";
import {
  ArrowLeft,
  Film,
  Loader2,
  Users,
  LineChart,
  Search,
  FolderOpen,
  Newspaper,
  MessageSquareWarning,
  Sparkles,
} from "lucide-react";

/** Users' Media objectives — the seven pillars of the engagement hub. */
const OBJECTIVES = [
  {
    id: "connect",
    n: 1,
    title: "Connecting Users with other Users",
    desc: "Communities, posts, tagged mentions, comments and shared media.",
    icon: Users,
  },
  {
    id: "progress",
    n: 2,
    title: "Follow Ups of Learner Progress",
    desc: "Track FLC coverage and share progress updates with parents, teachers or sponsors.",
    icon: LineChart,
  },
  {
    id: "lookups",
    n: 3,
    title: "Look Ups for Assignments (New / Old)",
    desc: "Search across every assignment issued in the lesson vault.",
    icon: Search,
  },
  {
    id: "container",
    n: 4,
    title: "Container of New & Old Assignments",
    desc: "A single archive holding current and past assignment material.",
    icon: FolderOpen,
  },
  {
    id: "news",
    n: 5,
    title: "News Pertaining Learner Development",
    desc: "Announcements and articles on early childhood development.",
    icon: Newspaper,
  },
  {
    id: "matters",
    n: 6,
    title: "New Matters Arising",
    desc: "Raise and follow issues that need attention from the community.",
    icon: MessageSquareWarning,
  },
  {
    id: "other",
    n: 7,
    title: "Among Other",
    desc: "Space for everything else the community brings forward.",
    icon: Sparkles,
  },
] as const;

/** Fourth dashboard page: all user engagements (communities, posts, media). */
const UsersMedia = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("connect");

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
            Objectives of this space — connect with other users, follow learner progress, look up
            assignments and stay on top of news and matters arising.
          </p>
        </header>

        <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {OBJECTIVES.map((o) => {
            const Icon = o.icon;
            const isActive = active === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setActive(o.id)}
                className={`text-left rounded-xl border p-4 transition-colors ${
                  isActive
                    ? "border-lime-500 bg-lime-500/10"
                    : "border-white/10 bg-[#2a2d34] hover:border-lime-500/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-500 text-sm font-bold text-[#1a1c21]">
                    {o.n}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-lime-500" />
                      <h2 className="text-sm font-semibold text-white leading-snug">{o.title}</h2>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">{o.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <section className="rounded-xl border border-white/10 bg-[#2a2d34] p-4 sm:p-6">
          {active === "connect" ? (
            <InstitutionCommunity
              userId={user.id}
              registrationType={profile?.registration_type}
              profile={profile as any}
            />
          ) : (
            <div className="py-10 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                {OBJECTIVES.find((o) => o.id === active)?.title}
              </h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                {OBJECTIVES.find((o) => o.id === active)?.desc} This section is being prepared —
                meanwhile use the community feed to share and discuss.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActive("connect")}
                className="mt-4 border-lime-500 text-lime-500 hover:bg-lime-500/10"
              >
                Go to community feed
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UsersMedia;
