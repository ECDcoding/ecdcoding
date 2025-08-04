import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown, ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const LessonVault0406 = () => {
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState<string | null>(null);
  const [selectedObjectCategory, setSelectedObjectCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const languages = [
    "Afrikaans", "isiZulu", "isiXhosa", "isiSwati", 
    "Setswana", "Sepedi", "Xitsonga", "Venda"
  ];

  const emojiCategories = {
    "Facial Recognition": ["👦", "👦", "👦", "👦", "👧", "😀", "😀", "😀", "😀", "😃", "👨", "👨", "👨", "👨", "👩", "😊", "😊", "😊", "😊", "😄", "👶", "👶", "👶", "👶", "🧒"]
  };

  const objectCategories = {
    "Food": ["🍎", "🍎", "🍎", "🍎", "🍌", "🥛", "🥛", "🥛", "🥛", "🧀", "🍞", "🍞", "🍞", "🍞", "🥕", "🍕", "🍕", "🍕", "🍕", "🍔", "🥚", "🥚", "🥚", "🥚", "🍗"],
    "Transport": ["🚗", "🚗", "🚗", "🚗", "🚌", "✈️", "✈️", "✈️", "✈️", "🚲", "🚂", "🚂", "🚂", "🚂", "🛵", "🚁", "🚁", "🚁", "🚁", "⛵", "🚜", "🚜", "🚜", "🚜", "🏍️"],
    "Animals": ["🐶", "🐶", "🐶", "🐶", "🐱", "🐴", "🐴", "🐴", "🐴", "🐮", "🐷", "🐷", "🐷", "🐷", "🐸", "🐰", "🐰", "🐰", "🐰", "🦆", "🐔", "🐔", "🐔", "🐔", "🐯"]
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Profile Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Image</label>
                    <div className="flex items-center gap-4">
                      {profileImage && (
                        <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="profile-upload"
                        />
                        <Button asChild variant="outline">
                          <label htmlFor="profile-upload" className="cursor-pointer flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Image
                          </label>
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Update profile as your child advances with age
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search lessons..." 
                className="pl-10 w-64 bg-white text-foreground"
              />
            </div>
            {profileImage && (
              <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-primary-foreground" />
            )}
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


        {/* Lessons Banner */}
        <div className="mt-12 bg-lime-500 text-black p-6 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Select onValueChange={(value) => setSelectedEmojiCategory(value)}>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Emoji Science" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {Object.entries(emojiCategories).map(([category, emojis]) => (
                  <SelectItem key={category} value={category} className="hover:bg-gray-100">
                    <div className="flex flex-col">
                      <span className="font-medium">{category}</span>
                      <div className="flex gap-1 mt-1">
                        {emojis.slice(0, 5).map((emoji, index) => (
                          <span key={index} className="text-lg">{emoji}</span>
                        ))}
                        <span className="text-sm text-gray-500">...</span>
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
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="home" className="hover:bg-gray-100">🏠 Home</SelectItem>
                <SelectItem value="settings" className="hover:bg-gray-100">⚙️ Settings</SelectItem>
                <SelectItem value="user" className="hover:bg-gray-100">👤 User</SelectItem>
                <SelectItem value="search" className="hover:bg-gray-100">🔍 Search</SelectItem>
                <SelectItem value="star" className="hover:bg-gray-100">⭐ Star</SelectItem>
                <SelectItem value="heart" className="hover:bg-gray-100">❤️ Heart</SelectItem>
                <SelectItem value="clock" className="hover:bg-gray-100">🕐 Clock</SelectItem>
                <SelectItem value="folder" className="hover:bg-gray-100">📁 Folder</SelectItem>
                <SelectItem value="phone" className="hover:bg-gray-100">📞 Phone</SelectItem>
                <SelectItem value="mail" className="hover:bg-gray-100">📧 Mail</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-white text-black border-black hover:bg-gray-100">
              Arithmetic Operators
            </Button>
            <Select>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Columns IDs" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="col-a" className="hover:bg-gray-100">Column A</SelectItem>
                <SelectItem value="col-b" className="hover:bg-gray-100">Column B</SelectItem>
                <SelectItem value="col-c" className="hover:bg-gray-100">Column C</SelectItem>
                <SelectItem value="col-d" className="hover:bg-gray-100">Column D</SelectItem>
                <SelectItem value="col-e" className="hover:bg-gray-100">Column E</SelectItem>
                <SelectItem value="col-f" className="hover:bg-gray-100">Column F</SelectItem>
                <SelectItem value="col-g" className="hover:bg-gray-100">Column G</SelectItem>
                <SelectItem value="col-h" className="hover:bg-gray-100">Column H</SelectItem>
                <SelectItem value="col-i" className="hover:bg-gray-100">Column I</SelectItem>
                <SelectItem value="col-j" className="hover:bg-gray-100">Column J</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Color IDs" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="red" className="hover:bg-gray-100">🔴 Red</SelectItem>
                <SelectItem value="blue" className="hover:bg-gray-100">🔵 Blue</SelectItem>
                <SelectItem value="green" className="hover:bg-gray-100">🟢 Green</SelectItem>
                <SelectItem value="yellow" className="hover:bg-gray-100">🟡 Yellow</SelectItem>
                <SelectItem value="orange" className="hover:bg-gray-100">🟠 Orange</SelectItem>
                <SelectItem value="purple" className="hover:bg-gray-100">🟣 Purple</SelectItem>
                <SelectItem value="pink" className="hover:bg-gray-100">🩷 Pink</SelectItem>
                <SelectItem value="brown" className="hover:bg-gray-100">🤎 Brown</SelectItem>
                <SelectItem value="black" className="hover:bg-gray-100">⚫ Black</SelectItem>
                <SelectItem value="white" className="hover:bg-gray-100">⚪ White</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedObjectCategory(value)}>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Object IDs" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {Object.entries(objectCategories).map(([category, objects]) => (
                  <SelectItem key={category} value={category} className="hover:bg-gray-100">
                    <div className="flex flex-col">
                      <span className="font-medium">{category}</span>
                      <div className="flex gap-1 mt-1">
                        {objects.slice(0, 5).map((object, index) => (
                          <span key={index} className="text-lg">{object}</span>
                        ))}
                        <span className="text-sm text-gray-500">...</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Full Page Emoji View */}
        {selectedEmojiCategory && (
          <div className="fixed inset-0 bg-lime-400 z-50 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedEmojiCategory(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold">{selectedEmojiCategory}</h1>
              </div>
              
              <div className="grid grid-cols-5 gap-8">
                {emojiCategories[selectedEmojiCategory as keyof typeof emojiCategories]?.map((emoji, index) => (
                   <Card key={index} className="aspect-square flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow h-32 w-32">
                     <CardContent className="p-0 flex items-center justify-center h-full">
                       <span className="text-8xl">{emoji}</span>
                     </CardContent>
                   </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Full Page Object View */}
        {selectedObjectCategory && (
          <div className="fixed inset-0 bg-lime-400 z-50 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedObjectCategory(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold">{selectedObjectCategory}</h1>
              </div>
              
              <div className="grid grid-cols-5 gap-8">
                {objectCategories[selectedObjectCategory as keyof typeof objectCategories]?.map((object, index) => (
                   <Card key={index} className="aspect-square flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow h-32 w-32">
                     <CardContent className="p-0 flex items-center justify-center h-full">
                       <span className="text-8xl">{object}</span>
                     </CardContent>
                   </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LessonVault0406;