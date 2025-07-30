import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const LessonVault0406 = () => {
  const stemCourses = [
    {
      id: 1,
      title: "Basic Coding Blocks",
      description: "Introduction to visual programming with blocks",
      icon: Code,
      color: "bg-blue-500",
      lessons: 12,
      duration: "20 mins each"
    },
    {
      id: 2,
      title: "Number Fun",
      description: "Early math concepts through games",
      icon: Calculator,
      color: "bg-green-500",
      lessons: 15,
      duration: "15 mins each"
    },
    {
      id: 3,
      title: "Science Explorers",
      description: "Basic science concepts and experiments",
      icon: Beaker,
      color: "bg-purple-500",
      lessons: 10,
      duration: "25 mins each"
    },
    {
      id: 4,
      title: "Digital Storytelling",
      description: "Creating stories with technology",
      icon: BookOpen,
      color: "bg-orange-500",
      lessons: 8,
      duration: "30 mins each"
    },
    {
      id: 5,
      title: "Logic Games",
      description: "Problem solving and logical thinking",
      icon: Gamepad2,
      color: "bg-red-500",
      lessons: 20,
      duration: "10 mins each"
    },
    {
      id: 6,
      title: "Shape & Pattern Recognition",
      description: "Geometry basics through interactive activities",
      icon: Calculator,
      color: "bg-teal-500",
      lessons: 14,
      duration: "18 mins each"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80">
              <Home className="h-6 w-6" />
              <span>Home</span>
            </Link>
            <h1 className="text-2xl font-bold">Lesson Vault - Ages 04-06</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search lessons..." 
                className="pl-10 w-64 bg-white text-foreground"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">STEM Courses for Early Learners</h2>
          <p className="text-muted-foreground text-lg">
            Designed specifically for ECD Centers | Pre-Schools | Creches | Primary Schools
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default LessonVault0406;