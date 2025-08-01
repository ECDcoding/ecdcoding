import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const LessonVault0406 = () => {
  const languages = [
    "Afrikaans", "isiZulu", "isiXhosa", "isiSwati", 
    "Setswana", "Sepedi", "Xitsonga", "Venda"
  ];

  const emojiCategories = {
    "Smileys and People": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"],
    "Activities": ["⚽", "🏀", "🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸"],
    "Objects": ["📱", "💻", "⌨️", "🖥️", "🖨️", "📷", "📹", "📞", "☎️", "📠"],
    "Travel and Places": ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐"],
    "Food and Drink": ["🍎", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑"],
    "Animals and Nature": ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"]
  };

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
            <h1 className="text-2xl font-bold">Lesson Vault for Kids Aged 04 - 06</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Settings
            </Button>
            <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Users
            </Button>
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
          <h2 className="text-3xl font-bold mb-4">Learning the Basics</h2>
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
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{course.lessons} lessons</span>
                    <span className="text-sm text-muted-foreground">{course.duration}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Lessons Banner */}
        <div className="mt-12 bg-lime-500 text-black p-6 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Emoji Group" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(emojiCategories).map(([category, emojis]) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                    <div className="flex flex-col">
                      <span className="font-medium">{category}</span>
                      <div className="flex gap-1 mt-1">
                        {emojis.map((emoji, index) => (
                          <span key={index} className="text-lg">{emoji}</span>
                        ))}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Icons Lab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">🏠 Home</SelectItem>
                <SelectItem value="settings">⚙️ Settings</SelectItem>
                <SelectItem value="user">👤 User</SelectItem>
                <SelectItem value="search">🔍 Search</SelectItem>
                <SelectItem value="star">⭐ Star</SelectItem>
                <SelectItem value="heart">❤️ Heart</SelectItem>
                <SelectItem value="clock">🕐 Clock</SelectItem>
                <SelectItem value="folder">📁 Folder</SelectItem>
                <SelectItem value="phone">📞 Phone</SelectItem>
                <SelectItem value="mail">📧 Mail</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white text-black border-black hover:bg-gray-100">
              Arithmetic Operators
            </Button>
            <Select>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Columns IDs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="col-a">Column A</SelectItem>
                <SelectItem value="col-b">Column B</SelectItem>
                <SelectItem value="col-c">Column C</SelectItem>
                <SelectItem value="col-d">Column D</SelectItem>
                <SelectItem value="col-e">Column E</SelectItem>
                <SelectItem value="col-f">Column F</SelectItem>
                <SelectItem value="col-g">Column G</SelectItem>
                <SelectItem value="col-h">Column H</SelectItem>
                <SelectItem value="col-i">Column I</SelectItem>
                <SelectItem value="col-j">Column J</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Color IDs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">🔴 Red</SelectItem>
                <SelectItem value="blue">🔵 Blue</SelectItem>
                <SelectItem value="green">🟢 Green</SelectItem>
                <SelectItem value="yellow">🟡 Yellow</SelectItem>
                <SelectItem value="orange">🟠 Orange</SelectItem>
                <SelectItem value="purple">🟣 Purple</SelectItem>
                <SelectItem value="pink">🩷 Pink</SelectItem>
                <SelectItem value="brown">🤎 Brown</SelectItem>
                <SelectItem value="black">⚫ Black</SelectItem>
                <SelectItem value="white">⚪ White</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white text-black border-black hover:bg-gray-100">
              Cryptography
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonVault0406;