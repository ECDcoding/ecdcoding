import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Home, Code2, Brain, Cpu, Zap, Database, Globe, LogOut, Users, Construction } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { PromoCodeBanner } from "@/components/PromoCodeBanner";
import { useOnlineUsers } from "@/hooks/useOnlineUsers";
import { useState } from "react";

const LessonVault0710 = () => {
  const { signOut } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { onlineUsers, onlineCount } = useOnlineUsers('lesson-vault-07-10');

  // Show loading state while checking admin status
  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#313056]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Restrict access to admin only
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#313056]">
        <div className="text-center max-w-md mx-auto p-8">
          <Construction className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Under Construction</h1>
          <p className="text-white/80 mb-6">
            The Kids Aged 08-12 section is currently being developed. 
            Please check back soon for exciting STEM courses!
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90"
          >
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    );
  }
  
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const stemCourses = [
    {
      id: 1,
      title: "Python Programming",
      description: "Learn programming fundamentals with Python",
      icon: Code2,
      color: "bg-blue-600",
      lessons: 25,
      duration: "30 mins each"
    },
    {
      id: 2,
      title: "Robotics & Engineering",
      description: "Build and program simple robots",
      icon: Cpu,
      color: "bg-green-600",
      lessons: 18,
      duration: "45 mins each"
    },
    {
      id: 3,
      title: "Data Science for Kids",
      description: "Introduction to data analysis and visualization",
      icon: Database,
      color: "bg-purple-600",
      lessons: 15,
      duration: "35 mins each"
    },
    {
      id: 4,
      title: "Web Development Basics",
      description: "Create websites with HTML, CSS and JavaScript",
      icon: Globe,
      color: "bg-orange-600",
      lessons: 22,
      duration: "40 mins each"
    },
    {
      id: 5,
      title: "AI & Machine Learning",
      description: "Understanding artificial intelligence concepts",
      icon: Brain,
      color: "bg-red-600",
      lessons: 12,
      duration: "50 mins each"
    },
    {
      id: 6,
      title: "Electronics & Circuits",
      description: "Learn about electricity and electronic components",
      icon: Zap,
      color: "bg-yellow-600",
      lessons: 16,
      duration: "35 mins each"
    },
    {
      id: 7,
      title: "Advanced Logic & Algorithms",
      description: "Problem solving with computational thinking",
      icon: Brain,
      color: "bg-indigo-600",
      lessons: 20,
      duration: "25 mins each"
    },
    {
      id: 8,
      title: "Game Development",
      description: "Create simple games using visual programming",
      icon: Code2,
      color: "bg-pink-600",
      lessons: 14,
      duration: "45 mins each"
    }
  ];

  return (
    <div className="min-h-screen bg-[#313056]">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80">
              <Home className="h-6 w-6" />
              <span>Home</span>
            </Link>
            <h1 className="text-2xl font-bold">Lesson Vault - Ages 07-10</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search lessons..." 
                className="pl-10 w-64 bg-white text-foreground"
              />
            </div>
            <div className="flex flex-col items-end gap-1">
              <ProfileDropdown 
                profileImage={profileImage} 
                onLogout={handleLogout}
              />
              <div className="flex flex-col items-end gap-1 text-xs text-white/80">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{onlineCount} online</span>
                </div>
                {onlineUsers.length > 0 && (
                  <div className="text-xs text-white/60">
                    {onlineUsers.map((u, i) => (
                      <span key={u.user_id}>
                        {u.first_name || u.username}
                        {i < onlineUsers.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Promo Code Banner */}
        <PromoCodeBanner />
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Advanced STEM Courses</h2>
          <p className="text-muted-foreground text-lg">
            Designed specifically for ECD Centers | Pre-Schools | Creches | Primary Schools
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stemCourses.map((course) => {
            const IconComponent = course.icon;
            return (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`${course.color} p-3 rounded-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">{course.lessons} lessons</span>
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                  </div>
                  <Button className="w-full">Start Learning</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Target Market Banner */}
        <div className="mt-12 bg-lime-500 text-black p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Target Market</h3>
          <p className="text-lg">ECD Centers | Pre-Schools | Creches | Primary Schools</p>
        </div>
      </main>
    </div>
  );
};

export default LessonVault0710;