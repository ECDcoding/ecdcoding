import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown, ArrowLeft, Upload, User, Key, Phone, Settings, X } from "lucide-react";
import { Link } from "react-router-dom";
import { SiFacebook, SiX, SiTiktok, SiLinkedin, SiBluesky } from "react-icons/si";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import kidWritingLogic from "@/assets/kid-writing-logic.jpg";

const LessonVault0406 = () => {
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState<string | null>(null);
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [pictureActive, setPictureActive] = useState<boolean>(false);
  const [countingOpen, setCountingOpen] = useState(false);
  const [selectedCountingRange, setSelectedCountingRange] = useState<string | null>(null);
  const [parentsOpen, setParentsOpen] = useState(false);
  
  const numberWords = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", 
    "eighteen", "nineteen", "twenty", "twenty-one", "twenty-two", "twenty-three", 
    "twenty-four", "twenty-five", "twenty-six", "twenty-seven", "twenty-eight", "twenty-nine",
    "thirty", "thirty-one", "thirty-two", "thirty-three", "thirty-four", "thirty-five",
    "thirty-six", "thirty-seven", "thirty-eight", "thirty-nine", "forty", "forty-one",
    "forty-two", "forty-three", "forty-four", "forty-five", "forty-six", "forty-seven",
    "forty-eight", "forty-nine", "fifty", "fifty-one", "fifty-two", "fifty-three",
    "fifty-four", "fifty-five", "fifty-six", "fifty-seven", "fifty-eight", "fifty-nine",
    "sixty", "sixty-one", "sixty-two", "sixty-three", "sixty-four", "sixty-five",
    "sixty-six", "sixty-seven", "sixty-eight", "sixty-nine", "seventy", "seventy-one",
    "seventy-two", "seventy-three", "seventy-four", "seventy-five", "seventy-six",
    "seventy-seven", "seventy-eight", "seventy-nine", "eighty", "eighty-one", "eighty-two",
    "eighty-three", "eighty-four", "eighty-five", "eighty-six", "eighty-seven", "eighty-eight",
    "eighty-nine", "ninety", "ninety-one", "ninety-two", "ninety-three", "ninety-four",
    "ninety-five", "ninety-six", "ninety-seven", "ninety-eight", "ninety-nine", "one hundred"
  ];

  const speakNumber = (number: number) => {
    // For now using Web Speech API, can be replaced with ElevenLabs
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(numberWords[number - 1]);
      utterance.rate = 0.8; // Slower rate for kids
      utterance.pitch = 1.2; // Higher pitch for child-friendly voice
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

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
    <div className="min-h-screen tailormade-lessons-texture">
      {/* Navigation Bar */}
      <nav className="bg-[#395B50] text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-end gap-4">
            <img src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png" alt="ECDcoding Logo" className="w-40 h-28 md:w-48 md:h-32 object-contain" />
            <Link to="/" aria-label="Home" className="text-white hover:text-lime-300 transition-colors mb-1">
              <Home className="h-8 w-8" />
            </Link>
            <h1 className="text-2xl font-bold mb-1">Lesson Vault</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search lessons..." 
                className="pl-10 w-64 bg-white text-foreground"
              />
            </div>
            <Select>
              <SelectTrigger className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-white text-xs">Photo</span>
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
                <SelectItem value="logout" className="hover:bg-gray-100 text-red-600">
                  Logout
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
          <div className="mb-8 mt-12 text-center">
            <h2 className="text-4xl font-bold text-center text-yellow-400 inline-block pb-2 border-b-4 border-dotted border-current" style={{fontFamily: 'Bungee Shade, cursive'}}>Learning the Basics</h2>
          </div>


        {/* Lessons Banner */}
        <div className="mt-12 p-6 rounded-lg bg-transparent">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Numeracy
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium hover:bg-gray-100 flex items-center justify-between cursor-pointer">
                      Number Counting
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="bg-white border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("1-10"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      1 - 10
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("11-20"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      11 - 20
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("21-30"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      21 - 30
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("31-40"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      31 - 40
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("41-50"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      41 - 50
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("51-60"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      51 - 60
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("61-70"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      61 - 70
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("71-80"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      71 - 80
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("81-90"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      81 - 90
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("91-100"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                      91 - 100
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenuItem className="font-medium hover:bg-gray-100">
                  Problem Solving
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium hover:bg-gray-100">
                  Shapes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Emoji AI
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem onClick={() => setSelectedEmojiCategory("Facial Recognition")} className="font-medium hover:bg-gray-100">
                  Facial Recognition
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedEmojiCategory("Transport Groups")} className="font-medium hover:bg-gray-100">
                  Transport Groups
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Literacy
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem onClick={() => {setSelectedCountingRange("vowels"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                  Vowels
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {setSelectedCountingRange("alphabets"); setCountingOpen(true);}} className="font-medium hover:bg-gray-100">
                  Alphabets
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Notes to
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem onClick={() => setParentsOpen(true)} className="font-medium hover:bg-gray-100">
                  👨‍👩‍👧‍👦 Parents
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium hover:bg-gray-100">
                  🎓 Tech Teachers
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium hover:bg-gray-100">
                  🏫 ECD Institutions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Select>
              <SelectTrigger className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold">
                <SelectValue placeholder="Arts" />
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
              <SelectTrigger className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold">
                <SelectValue placeholder="Media Icons" />
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
          <div className="fixed inset-0 tailormade-lessons-texture z-50 overflow-y-auto">
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
          <div className="fixed inset-0 tailormade-lessons-texture z-50 overflow-y-auto">
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
                   <Card 
                     key={index} 
                     onClick={() => { if (object === "📷") setPictureActive((prev) => !prev); }}
                     className={`aspect-square flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow h-32 w-32 ${object === "📷" && pictureActive ? "bg-brand-green text-foreground" : ""}`}
                   >
                     <CardContent className="p-0 flex items-center justify-center h-full">
                       <span className="text-8xl">{object}</span>
                     </CardContent>
                   </Card>
                ))}
              </div>

              {selectedMediaCategory === "Social Media" && (
                <div className="mt-10">
                  <img
                    src="/lovable-uploads/b7647a0f-f531-4bd1-82fe-d8b4d9c54fc1.png"
                    alt="Media icons: Facebook, X, LinkedIn, YouTube, WhatsApp, Google Plus, Instagram, Pinterest, Snapchat"
                    loading="lazy"
                    className="mx-auto max-w-xl w-full h-auto rounded-md shadow"
                  />

                  <div className="mt-6 flex items-center justify-center gap-6">
                    <button aria-label="Facebook" className="p-3 rounded-full bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
                      <SiFacebook size={28} />
                    </button>
                    <button aria-label="X" className="p-3 rounded-full bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
                      <SiX size={28} />
                    </button>
                    <button aria-label="TikTok" className="p-3 rounded-full bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
                      <SiTiktok size={28} />
                    </button>
                    <button aria-label="LinkedIn" className="p-3 rounded-full bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
                      <SiLinkedin size={28} />
                    </button>
                    <button aria-label="Bluesky" className="p-3 rounded-full bg-card text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-colors">
                      <SiBluesky size={28} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tailormade Lessons Carousel */}
        <div className="mt-16 p-8" style={{ backgroundColor: '#395B50' }}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-lime-400 inline-block pb-2 border-b-4 border-dotted border-current" style={{ fontFamily: '"Bungee Shade", cursive' }}>
              Tailormade Lessons
            </h1>
            <p className="mt-6 text-foreground/90">
              Outsourced from Reputable Service Providers and Researchers
            </p>
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
        {/* Number Counting Full Overlay */}
        {countingOpen && selectedCountingRange && (
          <div className="fixed inset-0 bg-[#395B50] z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                       {selectedCountingRange === "vowels" ? "Vowels" : 
                        selectedCountingRange === "alphabets" ? "Alphabets" : 
                        "Number Counting"}
                     </h1>
                     {selectedCountingRange && selectedCountingRange !== "vowels" && selectedCountingRange !== "alphabets" && (
                       <span className="text-2xl font-bold text-white">({selectedCountingRange})</span>
                     )}
                  </div>
                  <button 
                    onClick={() => {setCountingOpen(false); setSelectedCountingRange(null);}}
                    className="text-white hover:text-yellow-400 transition-colors"
                  >
                    <X className="h-8 w-8" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6">
                 <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
                   {(() => {
                     if (selectedCountingRange === "vowels") {
                       const vowels = ['a', 'e', 'i', 'o', 'u'];
                       return vowels.map((vowel, index) => (
                         <div 
                           key={vowel}
                           className="w-full aspect-square text-7xl font-bold flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer text-white"
                           style={{
                             backgroundColor: [
                               '#3a86ff', '#e76f51', '#00afb9', '#ca6702', '#006d77'
                             ][index % 5]
                           }}
                           title={`Vowel ${vowel.toUpperCase()}`}
                         >
                           {vowel}
                         </div>
                       ));
                     } else if (selectedCountingRange === "alphabets") {
                       const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i));
                       return alphabet.map((letter, index) => (
                         <div 
                           key={letter}
                           className="w-full aspect-square text-7xl font-bold flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer text-white"
                           style={{
                             backgroundColor: [
                               '#3a86ff', '#e76f51', '#00afb9', '#ca6702', '#006d77'
                             ][index % 5]
                           }}
                           title={`Letter ${letter.toUpperCase()}`}
                         >
                           {letter}
                         </div>
                       ));
                     } else {
                       const [start, end] = selectedCountingRange.split('-').map(Number);
                       return Array.from({ length: end - start + 1 }, (_, index) => start + index).map((number) => (
                         <div 
                           key={number}
                           className="w-full aspect-square text-7xl font-bold flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                           style={{
                             backgroundColor: [
                               '#3a86ff', '#e76f51', '#00afb9', '#ca6702', '#006d77'
                             ][number % 5]
                           }}
                           onMouseEnter={() => speakNumber(number)}
                           title={`Number ${number} - ${numberWords[number - 1] || number.toString()}`}
                         >
                           {number}
                         </div>
                       ));
                     }
                   })()}
                 </div>
                
                <div className="mt-8"></div>
                <div className="mt-8"></div>
                
                <div className="max-w-6xl mx-auto">
                  <button 
                    onClick={() => {setCountingOpen(false); setSelectedCountingRange(null);}}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                     <ArrowLeft className="h-6 w-6" />
                     Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Parents Notes Full Overlay */}
        {parentsOpen && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  Notes to Parents
                </h1>
                <button 
                  onClick={() => setParentsOpen(false)}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-8 max-w-4xl mx-auto">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Get Involved Offline</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Parents must get involved offline with coding and logic skills at home with the kid to enable them to figure things out on paper first
                  </p>
                </div>
                
                <div className="text-center">
                  <img 
                    src={kidWritingLogic} 
                    alt="Child writing logical concepts on paper" 
                    className="mx-auto rounded-lg shadow-lg max-w-2xl w-full"
                  />
                  <p className="text-gray-600 mt-4 italic">A child practicing logical thinking and problem-solving on paper</p>
                </div>
              </div>
            </div>
          </div>
        )}

       </main>
      
    </div>
  );
};

export default LessonVault0406;