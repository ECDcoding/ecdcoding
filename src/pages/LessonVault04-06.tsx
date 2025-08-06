import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown, ArrowLeft, Upload, User, Key, Phone, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const LessonVault0406 = () => {
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState<string | null>(null);
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const languages = [
    "Afrikaans", "isiZulu", "isiXhosa", "isiSwati", 
    "Setswana", "Sepedi", "Xitsonga", "Venda"
  ];

  const emojiCategories = {
    "Facial Recognition": ["👧", "👦", "👦", "👦", "👦", "😀", "😃", "😀", "😀", "😀", "👩", "👨", "👨", "👨", "👨", "😊", "😄", "😊", "😊", "😊", "👶", "👶", "👶", "👶", "🧒"],
    "Fruit Recognition": ["🍎", "🍌", "🍎", "🍎", "🍎", "🥛", "🧀", "🥛", "🥛", "🥛", "🍞", "🥕", "🍞", "🍞", "🍞", "🍕", "🍔", "🍕", "🍕", "🍕", "🥚", "🍗", "🥚", "🥚", "🥚"],
    "Transport Recognition": ["🚗", "🚌", "🚗", "🚗", "🚗", "✈️", "🚲", "✈️", "✈️", "✈️", "🚂", "🛵", "🚂", "🚂", "🚂", "🚁", "⛵", "🚁", "🚁", "🚁", "🚜", "🏍️", "🚜", "🚜", "🚜"],
    "Animal Recognition": ["🐶", "🐱", "🐶", "🐶", "🐶", "🐴", "🐮", "🐴", "🐴", "🐴", "🐷", "🐸", "🐷", "🐷", "🐷", "🐰", "🦆", "🐰", "🐰", "🐰", "🐔", "🐯", "🐔", "🐔", "🐔"]
  };

  const mediaCategories = {
    "Social Media": ["📘", "📷", "🐦", "📺", "💬", "📱", "🎵", "📹", "🌐", "💻", "📞", "📧", "🔗", "📲", "💾", "🖥️", "⌨️", "🖱️", "📀", "💿", "📼", "📻", "🎙️", "🎧", "📢"],
    "AI Engines": ["🤖", "🧠", "⚡", "🔍", "💡", "🎯", "🚀", "⭐", "🔥", "💎", "🎲", "🎭", "🎨", "🎪", "🎊", "🎉", "🎈", "🎁", "🏆", "🥇", "🏅", "⚙️", "🔧", "🛠️", "⚒️"]
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
            <h1 className="text-2xl font-bold">Lesson Vault</h1>
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
            <Select>
              <SelectTrigger className="w-10 h-10 rounded-full border-2 border-primary-foreground bg-primary-foreground/10 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-primary-foreground text-xs">Photo</span>
                )}
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="profile" className="hover:bg-gray-100 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </SelectItem>
                <SelectItem value="change-password" className="hover:bg-gray-100 flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Change Password
                </SelectItem>
                <SelectItem value="contact-details" className="hover:bg-gray-100 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Details
                </SelectItem>
                <SelectItem value="settings" className="hover:bg-gray-100 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </SelectItem>
                <SelectItem value="logout" className="hover:bg-gray-100 text-red-600">
                  Logout
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-center mb-8">
            <img src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png" alt="ECDcoding Logo" className="w-64 h-48 object-contain" />
          </div>
          <div className="mb-16"></div>
          <h2 className="text-3xl font-bold mb-4 text-center">Learning the Basics</h2>
          <p className="text-muted-foreground text-lg text-center">
            Designed specifically for ECD Centers | Pre-Schools | Creches | Primary Schools
          </p>
        </div>


        {/* Lessons Banner */}
        <div className="mt-12 bg-lime-500 text-black p-6 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Select onValueChange={(value) => setSelectedEmojiCategory(value)}>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Emoji AI" />
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
                <SelectValue placeholder="Video Lab" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="upload-video" className="hover:bg-gray-100">📹 Upload Video</SelectItem>
                <SelectItem value="story-videos" className="hover:bg-gray-100">📚 Story Videos</SelectItem>
                <SelectItem value="math-videos" className="hover:bg-gray-100">🔢 Math Videos</SelectItem>
                <SelectItem value="science-videos" className="hover:bg-gray-100">🔬 Science Videos</SelectItem>
                <SelectItem value="art-videos" className="hover:bg-gray-100">🎨 Art Videos</SelectItem>
                <SelectItem value="music-videos" className="hover:bg-gray-100">🎵 Music Videos</SelectItem>
                <SelectItem value="exercise-videos" className="hover:bg-gray-100">🏃 Exercise Videos</SelectItem>
                <SelectItem value="language-videos" className="hover:bg-gray-100">🗣️ Language Videos</SelectItem>
                <SelectItem value="cooking-videos" className="hover:bg-gray-100">👩‍🍳 Cooking Videos</SelectItem>
                <SelectItem value="nature-videos" className="hover:bg-gray-100">🌱 Nature Videos</SelectItem>
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
            <Select onValueChange={(value) => setSelectedMediaCategory(value)}>
              <SelectTrigger className="bg-white text-black border-black hover:bg-gray-100">
                <SelectValue placeholder="Popular Media IDs" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {Object.entries(mediaCategories).map(([category, objects]) => (
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

        {/* Full Page Media View */}
        {selectedMediaCategory && (
          <div className="fixed inset-0 bg-lime-400 z-50 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedMediaCategory(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold">{selectedMediaCategory}</h1>
              </div>
              
              <div className="grid grid-cols-5 gap-8">
                {mediaCategories[selectedMediaCategory as keyof typeof mediaCategories]?.map((object, index) => (
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

        {/* Tailormade Lessons Carousel */}
        <div className="mt-16 p-8" style={{ backgroundColor: '#395B50' }}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-lime-400 mb-4" style={{ fontFamily: '"Bungee Shade", cursive' }}>
              Tailormade Lessons
            </h1>
            <Button 
              className="mb-8 px-8 py-3 bg-transparent text-turquoise border-2 border-dashed border-current hover:bg-turquoise hover:text-white transition-all"
              style={{ color: 'turquoise' }}
            >
              Register to View All Listed Lesson
            </Button>
          </div>
          
          <div className="overflow-hidden w-full relative">
            <div 
              className="flex gap-8 animate-scroll"
              style={{
                animation: 'scroll-horizontal 40s linear infinite',
                width: 'max-content'
              }}
            >
              {/* First set of cards */}
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-yellow-400 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>HTML Basics</h3>
                  <h4 className="text-lg italic mb-4">Bright ideas wrapped in yellow</h4>
                  <p className="text-base mb-4">A vision powered by creativity and a splash of light-hearted boldness.</p>
                  <a href="#" className="font-bold underline text-black hover:text-yellow-400">Read more</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-pink-400 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-pink-400 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Basic Logic</h3>
                  <h4 className="text-lg italic mb-4">Whimsical and wild at heart</h4>
                  <p className="text-base mb-4">Every design begins with a playful thought and a soft edge of wonder.</p>
                  <a href="#" className="font-bold underline text-black hover:text-pink-400">Read more</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-red-400 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-red-400 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Binary Numbers</h3>
                  <h4 className="text-lg italic mb-4">Bold colors for bolder moves</h4>
                  <p className="text-base mb-4">Let your work simmer with energy and burn bright on every screen.</p>
                  <a href="#" className="font-bold underline text-black hover:text-red-400">Read more</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-teal-600 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-teal-600 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Cryptogram</h3>
                  <h4 className="text-lg italic mb-4">Think deep, build deeper</h4>
                  <p className="text-base mb-4">Where calm logic meets complex flows beneath the surface of design.</p>
                  <a href="#" className="font-bold underline text-black hover:text-teal-600">Read more</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-blue-500 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-blue-500 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>IoT</h3>
                  <h4 className="text-lg italic mb-4">Fast ideas in a faster world</h4>
                  <p className="text-base mb-4">Move with clarity, build with momentum. You're ready for the climb.</p>
                  <a href="#" className="font-bold underline text-black hover:text-blue-500">Read more</a>
                </CardContent>
              </Card>
              
              {/* Duplicate cards for infinite loop */}
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-yellow-400 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>HTML Basics</h3>
                  <h4 className="text-lg italic mb-4">Bright ideas wrapped in yellow</h4>
                  <p className="text-base mb-4">A vision powered by creativity and a splash of light-hearted boldness.</p>
                  <a href="#" className="font-bold underline text-black hover:text-yellow-400">Read more</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-pink-400 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-pink-400 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Basic Logic</h3>
                  <h4 className="text-lg italic mb-4">Whimsical and wild at heart</h4>
                  <p className="text-base mb-4">Every design begins with a playful thought and a soft edge of wonder.</p>
                  <a href="#" className="font-bold underline text-black hover:text-pink-400">Read more</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-red-400 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-red-400 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Binary Numbers</h3>
                  <h4 className="text-lg italic mb-4">Bold colors for bolder moves</h4>
                  <p className="text-base mb-4">Let your work simmer with energy and burn bright on every screen.</p>
                  <a href="#" className="font-bold underline text-black hover:text-red-400">Read more</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-teal-600 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-teal-600 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Cryptogram</h3>
                  <h4 className="text-lg italic mb-4">Think deep, build deeper</h4>
                  <p className="text-base mb-4">Where calm logic meets complex flows beneath the surface of design.</p>
                  <a href="#" className="font-bold underline text-black hover:text-teal-600">Read more</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-blue-500 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-blue-500 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>IoT</h3>
                  <h4 className="text-lg italic mb-4">Fast ideas in a faster world</h4>
                  <p className="text-base mb-4">Move with clarity, build with momentum. You're ready for the climb.</p>
                  <a href="#" className="font-bold underline text-black hover:text-blue-500">Read more</a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default LessonVault0406;