import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown, ArrowLeft, Upload, User, Key, Phone, Settings, X, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SiFacebook, SiX, SiTiktok, SiLinkedin, SiBluesky } from "react-icons/si";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import kidWritingLogic from "@/assets/kid-writing-logic.jpg";
import realSquareShape from "@/assets/real-square-shape.jpg";
import childDrawingSquare from "@/assets/child-drawing-square.jpg";
import realTriangleShape from "@/assets/real-triangle-shape.jpg";
import childDrawingTriangle from "@/assets/child-drawing-triangle.jpg";
import realRectangleShape from "@/assets/real-rectangle-shape.jpg";
import childDrawingRectangle from "@/assets/child-drawing-rectangle.jpg";
import realCircleShape from "@/assets/real-circle-shape.jpg";
import childDrawingCircle from "@/assets/child-drawing-circle.jpg";
import bodyPartsDiagram from "@/assets/child-body-parts-diagram.jpg";
import roadTransportVehicles from "@/assets/road-transport-vehicles.jpg";
import railTransportVehicles from "@/assets/rail-transport-vehicles.jpg";
import fourWheelVehicles from "@/assets/four-wheel-vehicles.jpg";
import twoWheelVehicles from "@/assets/two-wheel-vehicles.jpg";

const LessonVault0406 = () => {
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState<string | null>(null);
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [pictureActive, setPictureActive] = useState<boolean>(false);
  const [countingOpen, setCountingOpen] = useState(false);
  const [selectedCountingRange, setSelectedCountingRange] = useState<string | null>(null);
  const [parentsOpen, setParentsOpen] = useState(false);
  const [isAutoCounting, setIsAutoCounting] = useState(false);
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0);
  const [squareShapeOpen, setSquareShapeOpen] = useState(false);
  const [triangleShapeOpen, setTriangleShapeOpen] = useState(false);
  const [rectangleShapeOpen, setRectangleShapeOpen] = useState(false);
  const [circleShapeOpen, setCircleShapeOpen] = useState(false);
  const [selectedTransportType, setSelectedTransportType] = useState<string | null>(null);
  const [transportOpen, setTransportOpen] = useState(false);
  const [danceOpen, setDanceOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [selectedFullScreenColor, setSelectedFullScreenColor] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [starAnimations, setStarAnimations] = useState<{[key: number]: boolean}>({});
  
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

  const vowels = ["A", "E", "I", "O", "U"];
  
  const speakVowel = (vowel: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(vowel);
      utterance.rate = 0.6; // Even slower for vowel pronunciation
      utterance.volume = 0.8;
      
      // Different pitch for each vowel to create distinct tones
      const vowelTones: Record<string, number> = {
        "A": 0.8, // Lower tone
        "E": 1.0, // Mid-low tone  
        "I": 1.4, // Higher tone
        "O": 0.9, // Low-mid tone
        "U": 0.7  // Lowest tone
      };
      
      utterance.pitch = vowelTones[vowel] || 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakInstruction = (instruction: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(instruction);
      utterance.rate = 0.7;
      utterance.pitch = 1.1;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakWhatToExpected = () => {
    const message = "Welcome to My Lesson Vault for Learning the Basic, and as you can see we have a variety of lessons lined up for the kids to start learning immediately, for instance under Numeracy click on Numbers Counting, and when a dropdown menu appears click on it and start counting, and with the Basic Logic dropdown under Emoji AI, we expect your child to be able to identify odd objects that exist in every row; with Literacy, your child will learn Vowels, and Alphabets, Notes to Parents: Parents are encouraged among other, to get involved offline with coding and logic skills at home with the kid to enable them to figure things out on paper first and foremost.";
    speakInstruction(message);
  };

  // Auto-counting functionality
  const startAutoCounting = () => {
    if (!selectedCountingRange || selectedCountingRange === "vowels" || selectedCountingRange === "alphabets") return;
    
    const [start, end] = selectedCountingRange.split('-').map(Number);
    const totalNumbers = end - start + 1;
    
    setIsAutoCounting(true);
    setCurrentAutoIndex(0);
    
    let index = 0;
    intervalRef.current = setInterval(() => {
      const currentNumber = start + index;
      speakNumber(currentNumber);
      setCurrentAutoIndex(index);
      
      index++;
      if (index >= totalNumbers) {
        // Stop after completing the range
        clearInterval(intervalRef.current!);
        setIsAutoCounting(false);
        setCurrentAutoIndex(0);
      }
    }, 2000); // 2-second interval
  };

  const stopAutoCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAutoCounting(false);
    setCurrentAutoIndex(0);
  };

  // Cleanup interval on component unmount or when counting overlay closes
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!countingOpen) {
      stopAutoCounting();
    }
  }, [countingOpen]);

  const languages = [
    "Afrikaans", "isiZulu", "isiXhosa", "isiSwati", 
    "Setswana", "Sepedi", "Xitsonga", "Venda"
  ];

  const emojiCategories = {
    "Facial Recognition": [
      // Row 1: Boys and one man (7 faces)
      "👦", "👦", "👦", "👦", "👨", "👦", "👦",
      // Row 2: Women and one girl (7 faces) 
      "👩", "👩", "👧", "👩", "👩", "👩", "👩",
      // Row 3: Babies and one brown baby (7 faces)
      "👶", "👶", "👶", "👶🏽", "👶", "👶", "👶",
      // Row 4: Happy faces and one different expression (7 faces)
      "😄", "😊", "😊", "😊", "😊", "😊", "😊",
      // Row 5: Smiling faces and one different expression (7 faces)
      "😀", "😀", "😀", "😀", "😃", "😀", "😀"
    ],
    "Food Verification": [
      // Row 1: Apples and one banana (10 items)
      "🍎", "🍎", "🍎", "🍎", "🍌", "🍎", "🍎", "🍎", "🍎", "🍎",
      // Row 2: Milk and one cheese (10 items)
      "🥛", "🥛", "🥛", "🧀", "🥛", "🥛", "🥛", "🥛", "🥛", "🥛",
      // Row 3: Bread and one carrot (10 items)
      "🍞", "🍞", "🍞", "🍞", "🥕", "🍞", "🍞", "🍞", "🍞", "🍞",
      // Row 4: Pizza and one burger (10 items)
      "🍕", "🍕", "🍔", "🍕", "🍕", "🍕", "🍕", "🍕", "🍕", "🍕",
      // Row 5: Eggs and one chicken (10 items)
      "🥚", "🥚", "🥚", "🥚", "🍗", "🥚", "🥚", "🥚", "🥚", "🥚"
    ],
    
    "Transportation": ["🚗", "🚌", "🚗", "🚗", "🚗", "✈️", "🚲", "✈️", "✈️", "✈️", "🚂", "🛵", "🚂", "🚂", "🚂", "🚁", "⛵", "🚁", "🚁", "🚁", "🚜", "🏍️", "🚜", "🚜", "🚜"],
    "Body Types": ["👶", "👦", "👶", "👶", "👶", "👧", "👩", "👧", "👧", "👧", "👨", "👴", "👨", "👨", "👨", "👵", "🧒", "👵", "👵", "👵", "🧓", "👱", "🧓", "🧓", "🧓"],
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
            <h1 className="text-2xl font-bold mb-1">My Lesson Vault</h1>
          </div>
          <div className="flex items-center gap-4">
            <Select>
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
            <div className="mt-4">
              <Button 
                onClick={speakWhatToExpected}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 mx-auto"
              >
                <Volume2 className="h-5 w-5" />
                What to Expect
              </Button>
            </div>
          </div>


        {/* Lessons Banner */}
        <div className="mt-12 p-6 rounded-lg bg-transparent">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Numeracy
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Number Counting
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("1-10"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      1 - 10
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("11-20"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      11 - 20
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("21-30"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      21 - 30
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("31-40"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      31 - 40
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("41-50"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      41 - 50
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("51-60"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      51 - 60
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("61-70"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      61 - 70
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("71-80"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      71 - 80
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("81-90"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      81 - 90
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedCountingRange("91-100"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      91 - 100
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  Problem Solving
                </DropdownMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Shapes
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                     <DropdownMenuItem onClick={() => setSquareShapeOpen(true)} className="font-medium text-white hover:bg-white/20">
                       Square
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTriangleShapeOpen(true)} className="font-medium text-white hover:bg-white/20">
                       Triangle
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setCircleShapeOpen(true)} className="font-medium text-white hover:bg-white/20">
                       Circle
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setRectangleShapeOpen(true)} className="font-medium text-white hover:bg-white/20">
                       Rectangle
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Basic Logic
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                        Emoji AI
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuItem>
                    </DropdownMenuTrigger>
                     <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                       <DropdownMenuItem onClick={() => setSelectedEmojiCategory("Facial Recognition")} className="font-medium text-white hover:bg-white/20">
                         Facial Recognition
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Transportation
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => {setSelectedTransportType("road-transport"); setTransportOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      Road Transport
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedTransportType("rail-transport"); setTransportOpen(true);}} className="font-medium text-white hover:bg-white/20">
                      Rail Transport
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Literacy
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
               <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                 <DropdownMenuItem onClick={() => {setSelectedCountingRange("vowels"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                   Vowels
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => {setSelectedCountingRange("alphabets"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                   Alphabets
                 </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setColorsOpen(true)} className="font-medium text-white hover:bg-white/20">
                   Colors
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
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Arts
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Create: Music | Dance | Drama
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                      🎵 Music
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDanceOpen(true)} className="font-medium text-white hover:bg-white/20">
                      💃 Dance
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                      🎭 Drama
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  🎨 Visual Art
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Science and Discovery
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Domestic Ecology
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Insert Picture
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Insert Video Clip
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
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
                {selectedEmojiCategory === "Facial Recognition" && (
                  <Button
                    variant="outline"
                    onClick={() => speakInstruction("Look carefully at these faces. Can you find the one that is different? Click on the face that looks different from the others.")}
                    className="ml-4 bg-blue-500 text-white hover:bg-blue-600"
                  >
                    🔊 Play Instructions
                  </Button>
                )}
              </div>
              
              {selectedEmojiCategory === "Facial Recognition" ? (
                <div className="text-center mb-8">
                  <p className="text-xl mb-4">Find the odd faces! Look for faces that are different from the others in each row.</p>
                  <div className="grid grid-cols-7 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                     {emojiCategories[selectedEmojiCategory as keyof typeof emojiCategories]?.map((emoji, index) => {
                       // Define which faces are odd in each row (7 faces per row)
                       const oddFaces = [4, 9, 17, 21, 32]; // Man, Girl, Brown baby, 😄, 😃
                       const isOddFace = oddFaces.includes(index);
                       
                       return (
                         <Card 
                           key={index} 
                           className={`aspect-square flex items-center justify-center cursor-pointer hover:shadow-lg transition-all hover:scale-105 w-full relative ${starAnimations[index] ? 'animate-pulse' : ''}`}
                           onClick={() => {
                             if (isOddFace) {
                               const rowNumber = Math.floor(index / 7) + 1;
                               speakInstruction(`Correct! You found the odd face in row ${rowNumber}. Well done!`);
                               // Trigger star animation
                               setStarAnimations(prev => ({...prev, [index]: true}));
                               setTimeout(() => {
                                 setStarAnimations(prev => ({...prev, [index]: false}));
                               }, 2000);
                             } else {
                               speakInstruction("Try again! Look for the face that is different from the others in this row.");
                             }
                           }}
                         >
                           <CardContent className="p-0 flex items-center justify-center h-full">
                             <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{emoji}</span>
                           </CardContent>
                           {starAnimations[index] && (
                             <div className="absolute inset-0 pointer-events-none">
                               <div className="absolute top-2 left-2 text-yellow-400 text-2xl animate-bounce">⭐</div>
                               <div className="absolute top-2 right-2 text-yellow-400 text-2xl animate-bounce" style={{animationDelay: '0.1s'}}>⭐</div>
                               <div className="absolute bottom-2 left-2 text-yellow-400 text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</div>
                               <div className="absolute bottom-2 right-2 text-yellow-400 text-2xl animate-bounce" style={{animationDelay: '0.3s'}}>⭐</div>
                               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-3xl animate-pulse">🌟</div>
                             </div>
                           )}
                         </Card>
                       );
                     })}
                  </div>
                </div>
              ) : selectedEmojiCategory === "Food Verification" ? (
                <div className="text-center mb-8">
                  <p className="text-xl mb-4">Find the odd food items! Look for items that are different from the others in each row.</p>
                  <div className="grid grid-cols-10 gap-3 max-w-full mx-auto">
                     {emojiCategories[selectedEmojiCategory as keyof typeof emojiCategories]?.map((emoji, index) => {
                       // Define which items are odd in each row (10 items per row)
                       const oddItems = [4, 13, 24, 32, 44]; // Banana, Cheese, Carrot, Burger, Chicken
                       const isOddItem = oddItems.includes(index);
                       
                       return (
                         <Card 
                           key={index} 
                           className={`aspect-square flex items-center justify-center cursor-pointer hover:shadow-lg transition-all hover:scale-105 w-full relative ${starAnimations[index] ? 'animate-pulse' : ''}`}
                           onClick={() => {
                             if (isOddItem) {
                                const rowNumber = Math.floor(index / 10) + 1;
                               speakInstruction(`Correct! You found the odd food item in row ${rowNumber}. Well done!`);
                               // Trigger star animation
                               setStarAnimations(prev => ({...prev, [index]: true}));
                               setTimeout(() => {
                                 setStarAnimations(prev => ({...prev, [index]: false}));
                               }, 2000);
                             } else {
                               speakInstruction("Try again! Look for the food item that is different from the others in this row.");
                             }
                           }}
                         >
                           <CardContent className="p-0 flex items-center justify-center h-full">
                              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">{emoji}</span>
                           </CardContent>
                           {starAnimations[index] && (
                             <div className="absolute inset-0 pointer-events-none">
                               <div className="absolute top-2 left-2 text-yellow-400 text-2xl animate-bounce">⭐</div>
                               <div className="absolute top-2 right-2 text-yellow-400 text-2xl animate-bounce" style={{animationDelay: '0.1s'}}>⭐</div>
                               <div className="absolute bottom-2 left-2 text-yellow-400 text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</div>
                               <div className="absolute bottom-2 right-2 text-yellow-400 text-2xl animate-bounce" style={{animationDelay: '0.3s'}}>⭐</div>
                               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-3xl animate-pulse">🌟</div>
                             </div>
                           )}
                         </Card>
                       );
                     })}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
                   {emojiCategories[selectedEmojiCategory as keyof typeof emojiCategories]?.map((emoji, index) => (
                      <Card key={index} className="aspect-square flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow w-full max-w-32">
                        <CardContent className="p-0 flex items-center justify-center h-full">
                          <span className="text-4xl sm:text-6xl md:text-8xl">{emoji}</span>
                        </CardContent>
                      </Card>
                   ))}
                 </div>
               )}
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
              
              <div className="text-center py-8">
                <p className="text-gray-600">No media content available.</p>
              </div>

            </div>
          </div>
        )}

        {/* Square Shape Learning Dialog */}
        {squareShapeOpen && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  Learning Squares
                </h1>
                <button 
                  onClick={() => setSquareShapeOpen(false)}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Column - Real Square Shape */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Real Square Shape</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                      <img 
                        src={realSquareShape} 
                        alt="Real square shape - colorful educational material" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">This is what a square looks like in real life!</p>
                  </div>
                  
                  {/* Right Column - Child Drawing Square */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Drawing a Square</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                      <img 
                        src={childDrawingSquare} 
                        alt="Child's hand drawing a square shape step by step" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">Learn how to draw a square with your hands!</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center flex flex-wrap gap-4 justify-center">
                  <Button 
                    onClick={() => {setSquareShapeOpen(false); setTriangleShapeOpen(true);}}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Triangle
                  </Button>
                  <Button 
                    onClick={() => {setSquareShapeOpen(false); setCircleShapeOpen(true);}}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Circle
                  </Button>
                  <Button 
                    onClick={() => {setSquareShapeOpen(false); setRectangleShapeOpen(true);}}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Rectangle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Triangle Shape Learning Dialog */}
        {triangleShapeOpen && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  Learning Triangles
                </h1>
                <button 
                  onClick={() => setTriangleShapeOpen(false)}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Column - Real Triangle Shape */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Real Triangle Shape</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                      <img 
                        src={realTriangleShape} 
                        alt="Real triangle shape - colorful educational material" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">This is what a triangle looks like in real life!</p>
                  </div>
                  
                  {/* Right Column - Child Drawing Triangle */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Drawing a Triangle</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                      <img 
                        src={childDrawingTriangle} 
                        alt="Child's hand drawing a triangle shape step by step" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">Learn how to draw a triangle with your hands!</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center flex flex-wrap gap-4 justify-center">
                  <Button 
                    onClick={() => {setTriangleShapeOpen(false); setSquareShapeOpen(true);}}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Square
                  </Button>
                  <Button 
                    onClick={() => {setTriangleShapeOpen(false); setCircleShapeOpen(true);}}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Circle
                  </Button>
                  <Button 
                    onClick={() => {setTriangleShapeOpen(false); setRectangleShapeOpen(true);}}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Rectangle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rectangle Shape Learning Dialog */}
        {rectangleShapeOpen && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  Learning Rectangles
                </h1>
                <button 
                  onClick={() => setRectangleShapeOpen(false)}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Column - Real Rectangle Shape */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Real Rectangle Shape</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                      <img 
                        src={realRectangleShape} 
                        alt="Real rectangle shape - colorful educational material" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">This is what a rectangle looks like in real life!</p>
                  </div>
                  
                  {/* Right Column - Child Drawing Rectangle */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Drawing a Rectangle</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                      <img 
                        src={childDrawingRectangle} 
                        alt="Child's hand drawing a rectangle shape step by step" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">Learn how to draw a rectangle with your hands!</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center flex flex-wrap gap-4 justify-center">
                  <Button 
                    onClick={() => {setRectangleShapeOpen(false); setSquareShapeOpen(true);}}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Square
                  </Button>
                  <Button 
                    onClick={() => {setRectangleShapeOpen(false); setTriangleShapeOpen(true);}}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Triangle
                  </Button>
                  <Button 
                    onClick={() => {setRectangleShapeOpen(false); setCircleShapeOpen(true);}}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Circle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Circle Shape Learning Dialog */}
        {circleShapeOpen && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  Learning Circles
                </h1>
                <button 
                  onClick={() => setCircleShapeOpen(false)}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Left Column - Real Circle Shape */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Real Circle Shape</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                      <img 
                        src={realCircleShape} 
                        alt="Real circle shape - colorful educational material" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">This is what a circle looks like in real life!</p>
                  </div>
                  
                  {/* Right Column - Child Drawing Circle */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Drawing a Circle</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                      <img 
                        src={childDrawingCircle} 
                        alt="Child's hand drawing a circle shape step by step" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                      />
                    </div>
                    <p className="text-gray-600 mt-4">Learn how to draw a circle with your hands!</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center flex flex-wrap gap-4 justify-center">
                  <Button 
                    onClick={() => {setCircleShapeOpen(false); setSquareShapeOpen(true);}}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Square
                  </Button>
                  <Button 
                    onClick={() => {setCircleShapeOpen(false); setTriangleShapeOpen(true);}}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Triangle
                  </Button>
                  <Button 
                    onClick={() => {setCircleShapeOpen(false); setRectangleShapeOpen(true);}}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Proceed to Rectangle
                  </Button>
                </div>
              </div>
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
                  <div className="flex items-center justify-between w-full">
                     <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                       {selectedCountingRange === "vowels" ? "Vowels" : 
                        selectedCountingRange === "alphabets" ? "Alphabets" : 
                        "Number Counting"}
                     </h1>
                     {/* Auto-counting controls aligned from position 4 */}
                     {selectedCountingRange && selectedCountingRange !== "vowels" && selectedCountingRange !== "alphabets" && (
                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 flex-1 max-w-3xl ml-8">
                         {/* Empty spaces for positions 1-3 */}
                         <div></div>
                         <div></div>
                         <div></div>
                         
                         {/* Start button in position 4 */}
                         <Button
                           onClick={startAutoCounting}
                           disabled={isAutoCounting}
                           className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg disabled:opacity-50 text-sm"
                         >
                           {isAutoCounting ? "Auto-counting..." : "Start Auto Count"}
                         </Button>
                         
                         {/* Stop button in position 5 */}
                         <Button
                           onClick={stopAutoCounting}
                           disabled={!isAutoCounting}
                           className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg disabled:opacity-50 text-sm"
                         >
                           Stop
                         </Button>
                       </div>
                     )}
                   </div>
                   <button 
                     onClick={() => {setCountingOpen(false); setSelectedCountingRange(null);}}
                     className="text-white hover:text-yellow-400 transition-colors ml-4"
                   >
                     <X className="h-8 w-8" />
                   </button>
                </div>
              </div>
              
                {/* Content */}
               <div className="flex-1 p-6">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto px-4">
                   {(() => {
                      if (selectedCountingRange === "vowels") {
                        const vowelsArray = ['a', 'e', 'i', 'o', 'u'];
                        return vowelsArray.map((vowel, index) => (
                          <div 
                            key={vowel}
                             className="w-full aspect-square text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer text-white"
                            style={{
                              backgroundColor: [
                                '#3a86ff', '#e76f51', '#00afb9', '#ca6702', '#006d77'
                              ][index % 5]
                            }}
                            onClick={() => speakVowel(vowel.toUpperCase())}
                            onMouseEnter={() => speakVowel(vowel.toUpperCase())}
                            title={`Vowel ${vowel.toUpperCase()} - Click to hear tone`}
                          >
                            {vowel}
                          </div>
                        ));
                     } else if (selectedCountingRange === "alphabets") {
                        const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i)); // Capital letters A-Z
                        return alphabet.map((letter, index) => (
                          <div 
                            key={letter}
                            className="w-full aspect-square text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer text-white"
                            style={{
                              backgroundColor: [
                                '#3a86ff', '#e76f51', '#00afb9', '#ca6702', '#006d77'
                              ][index % 5]
                            }}
                            onClick={() => speakVowel(letter)}
                            onMouseEnter={() => speakVowel(letter)}
                            title={`Letter ${letter} - Click to hear pronunciation`}
                          >
                            {letter}
                          </div>
                        ));
                      } else {
                        const [start, end] = selectedCountingRange.split('-').map(Number);
                        return Array.from({ length: end - start + 1 }, (_, index) => start + index).map((number, arrayIndex) => {
                          const isCurrentlyPlaying = isAutoCounting && arrayIndex === currentAutoIndex;
                          return (
                            <div 
                              key={number}
                              className={`w-full aspect-square text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                                isCurrentlyPlaying ? 'animate-pulse ring-4 ring-yellow-400 ring-opacity-75 scale-110' : ''
                              }`}
                              style={{
                                backgroundColor: isCurrentlyPlaying 
                                  ? '#fbbf24' // Yellow when active
                                  : [
                                      '#3a86ff', '#e76f51', '#00afb9', '#ca6702', '#006d77'
                                    ][number % 5]
                              }}
                              onMouseEnter={() => !isAutoCounting && speakNumber(number)}
                              onClick={() => !isAutoCounting && speakNumber(number)}
                              title={`Number ${number} - ${numberWords[number - 1] || number.toString()}`}
                            >
                              {number}
                            </div>
                          );
                        });
                     }
                   })()}
                 </div>
                
                 <div className="mt-8"></div>
                 <div className="mt-8"></div>
                 <div className="mt-8"></div>
                 
                 
                 <div className="max-w-6xl mx-auto flex justify-between items-center relative">
                   <button 
                     onClick={() => {setCountingOpen(false); setSelectedCountingRange(null);}}
                     className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                   >
                      <ArrowLeft className="h-6 w-6" />
                      Back
                   </button>
                   
                   
                    {/* Continue to next range buttons */}
                    {selectedCountingRange === "1-10" && (
                      <button 
                        onClick={() => setSelectedCountingRange("11-20")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 11-20
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "11-20" && (
                      <button 
                        onClick={() => setSelectedCountingRange("21-30")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 21-30
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "21-30" && (
                      <button 
                        onClick={() => setSelectedCountingRange("31-40")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 31-40
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "31-40" && (
                      <button 
                        onClick={() => setSelectedCountingRange("41-50")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 41-50
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "41-50" && (
                      <button 
                        onClick={() => setSelectedCountingRange("51-60")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 51-60
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "51-60" && (
                      <button 
                        onClick={() => setSelectedCountingRange("61-70")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 61-70
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "61-70" && (
                      <button 
                        onClick={() => setSelectedCountingRange("71-80")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 71-80
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "71-80" && (
                      <button 
                        onClick={() => setSelectedCountingRange("81-90")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 81-90
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "81-90" && (
                      <button 
                        onClick={() => setSelectedCountingRange("91-100")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 91-100
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "91-100" && (
                      <button 
                        onClick={() => setSelectedCountingRange("1-10")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Start Over (1-10)
                        <span className="text-2xl">🔄</span>
                      </button>
                    )}
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Transportation Full Overlay */}
        {transportOpen && selectedTransportType && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  Transportation - {selectedTransportType === "road-transport" ? "Road Transport" : "Rail Transport"} (Ages 4-6)
                </h1>
                <button 
                  onClick={() => setTransportOpen(false)}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <p className="text-xl mb-8 text-gray-700">Learn about different types of vehicles!</p>
                  
                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Left Column - Real Vehicles */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Real Vehicles</h3>
                      <div className="bg-white rounded-lg shadow-lg p-4">
                        <img 
                          src={selectedTransportType === "road-transport" ? fourWheelVehicles : railTransportVehicles} 
                          alt={`Real ${selectedTransportType === "road-transport" ? "four-wheeled vehicles" : "rail transport vehicles"}`} 
                          className="w-full h-auto rounded-lg object-contain"
                          style={{minHeight: "300px"}}
                        />
                      </div>
                    </div>
                    
                    {/* Right Column - Child-like Drawings */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Child-like Drawings</h3>
                      <div className="bg-white rounded-lg shadow-lg p-4">
                        <img 
                          src={selectedTransportType === "road-transport" ? twoWheelVehicles : railTransportVehicles} 
                          alt={`${selectedTransportType === "road-transport" ? "Child-like drawings of vehicles" : "Real rail transport vehicles"}`} 
                          className="w-full h-auto rounded-lg object-contain"
                          style={{minHeight: "300px"}}
                        />
                      </div>
                    </div>
                  </div>
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

        {/* Dance Tool Dialog */}
        {danceOpen && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  💃 Dance Creator Tool
                </h1>
                <button 
                  onClick={() => setDanceOpen(false)}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-8 max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 shadow-lg mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Your Own Dance Moves!</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Drag and drop blocks to create your dance program! Just like coding, but visual and fun.
                  </p>
                  
                  {/* Visual Blocks Programming Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Block Palette */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-blue-600 mb-4">🧩 Programming Blocks</h3>
                      
                      {/* Event Block */}
                      <div className="mb-4">
                        <div className="bg-orange-500 text-white p-3 rounded-lg cursor-pointer hover:bg-orange-600 transition-colors shadow-md">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-700 rounded-full"></div>
                            <span className="font-semibold">When Setup</span>
                          </div>
                          <div className="text-xs mt-1 opacity-90">Event - starts the program</div>
                        </div>
                      </div>
                      
                        {/* Action Blocks */}
                        <div className="space-y-3">
                          <div className="bg-purple-500 text-white p-3 rounded-lg cursor-pointer hover:bg-purple-600 transition-colors shadow-md">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-purple-700 rounded-full"></div>
                              <span className="font-semibold">AI Background Effects</span>
                            </div>
                            <div className="text-xs mt-1 space-y-1">
                              <div>Emojis: <span className="bg-white/20 px-2 py-1 rounded text-xs">face emojis</span></div>
                              <div>Effect: <span className="bg-white/20 px-2 py-1 rounded text-xs">spiral</span></div>
                              <div>Style: <span className="bg-white/20 px-2 py-1 rounded text-xs">vintage</span></div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-500 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors shadow-md">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                              <span className="font-semibold">Make Dance Sprite</span>
                            </div>
                            <div className="text-xs mt-1 space-y-1">
                              <div>Character: <span className="bg-white/20 px-2 py-1 rounded text-xs">BEAR</span></div>
                              <div>Position: x: <span className="bg-white/20 px-2 py-1 rounded text-xs">200</span> y: <span className="bg-white/20 px-2 py-1 rounded text-xs">200</span></div>
                            </div>
                          </div>
                          
                          <div className="bg-green-500 text-white p-3 rounded-lg cursor-pointer hover:bg-green-600 transition-colors shadow-md">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-700 rounded-full"></div>
                              <span className="font-semibold">Change Move Each LR</span>
                            </div>
                            <div className="text-xs mt-1 space-y-1">
                              <div>Character: <span className="bg-white/20 px-2 py-1 rounded text-xs">BEAR</span></div>
                              <div>Move: <span className="bg-white/20 px-2 py-1 rounded text-xs">Thriller</span></div>
                              <div>Speed: <span className="bg-white/20 px-2 py-1 rounded text-xs">-1</span></div>
                            </div>
                          </div>
                        </div>
                    </div>
                    
                    {/* Programming Canvas */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Your Program</h3>
                      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[300px]">
                        {/* Assembled Blocks */}
                        <div className="space-y-2">
                          {/* When Setup Block */}
                          <div className="bg-orange-500 text-white p-3 rounded-lg shadow-md border-l-4 border-orange-700">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-orange-700 rounded-full"></div>
                              <span className="font-semibold">When Setup</span>
                            </div>
                          </div>
                          
                        {/* Connected Action Blocks */}
                        <div className="ml-6 space-y-2">
                          <div className="bg-purple-500 text-white p-3 rounded-lg shadow-md border-l-4 border-purple-700">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-purple-700 rounded-full"></div>
                              <span className="font-semibold">AI Background Effects</span>
                            </div>
                            <div className="text-xs mt-1 space-y-1">
                              <div>Emojis: <span className="bg-white/20 px-2 py-1 rounded text-xs">😵‍💫 😋 😃</span></div>
                              <div>Effects: <span className="bg-white/20 px-2 py-1 rounded text-xs">spiral</span> + <span className="bg-white/20 px-2 py-1 rounded text-xs">vintage</span></div>
                            </div>
                          </div>
                          
                          <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md border-l-4 border-blue-700">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
                              <span className="font-semibold">Make Dance Sprite</span>
                            </div>
                            <div className="text-xs mt-1 space-y-1">
                              <div>Character: <span className="bg-white/20 px-2 py-1 rounded text-xs">BEAR</span></div>
                              <div>Position: x: <span className="bg-white/20 px-2 py-1 rounded text-xs">200</span> y: <span className="bg-white/20 px-2 py-1 rounded text-xs">200</span></div>
                            </div>
                          </div>
                          
                          <div className="bg-green-500 text-white p-3 rounded-lg shadow-md border-l-4 border-green-700">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-700 rounded-full"></div>
                              <span className="font-semibold">Change Move Each LR</span>
                            </div>
                            <div className="text-xs mt-1 space-y-1">
                              <div>Character: <span className="bg-white/20 px-2 py-1 rounded text-xs">BEAR</span></div>
                              <div>Move: <span className="bg-white/20 px-2 py-1 rounded text-xs">Thriller</span></div>
                              <div>Speed: <span className="bg-white/20 px-2 py-1 rounded text-xs">-1</span></div>
                            </div>
                          </div>
                        </div>
                        </div>
                        
                        {/* Generated Code Display */}
                        <div className="mt-6 pt-4 border-t border-gray-300">
                          <h4 className="text-sm font-semibold text-gray-600 mb-2">Generated Code:</h4>
                          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`whenSetup(function () {
  ai({"inputs":["face-with-spiral-eyes","face-savoring-food","grinning-face-with-big-eyes"],"backgroundEffect":"spiral","foregroundEffect":"emojis","backgroundColor":"vintage"});
  makeAnonymousDanceSprite("BEAR", {x: 200, y: 200});
  changeMoveEachLR("BEAR", MOVES.Thriller, -1);
});`}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Instructions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-purple-600 mb-3">🎨 How Blocks Work:</h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• <span className="bg-orange-100 px-2 py-1 rounded text-orange-700 font-semibold">Orange blocks</span> are events (when things start)</li>
                        <li>• <span className="bg-purple-100 px-2 py-1 rounded text-purple-700 font-semibold">Purple blocks</span> add AI background effects</li>
                        <li>• <span className="bg-blue-100 px-2 py-1 rounded text-blue-700 font-semibold">Blue blocks</span> create characters</li>
                        <li>• <span className="bg-green-100 px-2 py-1 rounded text-green-700 font-semibold">Green blocks</span> control movement</li>
                        <li>• Connect blocks to build your program</li>
                        <li>• Each block becomes real code!</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-pink-600 mb-3">🚀 Try Experimenting:</h3>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Change character types (CAT, DOG, BEAR)</li>
                        <li>• Try different positions (x: 100, y: 300)</li>
                        <li>• Experiment with dance moves</li>
                        <li>• Change speed values (1, 2, -2)</li>
                        <li>• Add multiple character blocks!</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Demo Area */}
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">🎬 Your Dance Stage</h3>
                    <div className="bg-gradient-to-b from-blue-100 to-green-100 h-64 rounded-lg flex items-center justify-center border-4 border-dashed border-gray-300">
                      <div className="text-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 opacity-50 rounded-lg animate-pulse"></div>
                        <div className="relative z-10">
                          <div className="text-6xl mb-4 animate-bounce">🐻</div>
                          <div className="text-2xl mb-2">😵‍💫 😋 😃</div>
                          <p className="text-gray-600">Your BEAR dancer with AI spiral effects!</p>
                          <p className="text-sm text-gray-500 mt-2">Thriller moves with vintage emoji background</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Colors Learning Dialog */}
        {colorsOpen && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  🌈 Learning Colors
                </h1>
                <Button 
                  onClick={() => setColorsOpen(false)}
                  variant="ghost" 
                  className="text-white hover:bg-white/20 p-2"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Black T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-black rounded-t-3xl rounded-b-lg border-4 border-gray-800"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-black">Black</h3>
                      <Button 
                        className="bg-black hover:bg-gray-800 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a black t-shirt. Black is a dark color.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Blue T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-blue-500 rounded-t-3xl rounded-b-lg border-4 border-blue-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-blue-600">Blue</h3>
                      <Button 
                        className="bg-blue-500 hover:bg-blue-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a blue t-shirt. Blue is the color of the sky and ocean.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Green T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-green-500 rounded-t-3xl rounded-b-lg border-4 border-green-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-green-600">Green</h3>
                      <Button 
                        className="bg-green-500 hover:bg-green-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a green t-shirt. Green is the color of grass and leaves.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Yellow T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-yellow-400 rounded-t-3xl rounded-b-lg border-4 border-yellow-500"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-yellow-600">Yellow</h3>
                      <Button 
                        className="bg-yellow-400 hover:bg-yellow-500 text-black w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a yellow t-shirt. Yellow is the color of the sun and bananas.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Orange T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-orange-500 rounded-t-3xl rounded-b-lg border-4 border-orange-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-orange-600">Orange</h3>
                      <Button 
                        className="bg-orange-500 hover:bg-orange-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is an orange t-shirt. Orange is the color of oranges and carrots.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Purple T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-purple-500 rounded-t-3xl rounded-b-lg border-4 border-purple-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-purple-600">Purple</h3>
                      <Button 
                        className="bg-purple-500 hover:bg-purple-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a purple t-shirt. Purple is a mix of red and blue.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Gray T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-gray-500 rounded-t-3xl rounded-b-lg border-4 border-gray-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-600">Gray</h3>
                      <Button 
                        className="bg-gray-500 hover:bg-gray-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a gray t-shirt. Gray is between black and white.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Brown T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-amber-700 rounded-t-3xl rounded-b-lg border-4 border-amber-800"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-amber-700">Brown</h3>
                      <Button 
                        className="bg-amber-700 hover:bg-amber-800 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a brown t-shirt. Brown is the color of chocolate and trees.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Lime T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-lime-500 rounded-t-3xl rounded-b-lg border-4 border-lime-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-lime-600">Lime</h3>
                      <Button 
                        className="bg-lime-500 hover:bg-lime-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a lime t-shirt. Lime is a bright green color.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Red T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-red-500 rounded-t-3xl rounded-b-lg border-4 border-red-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-red-600">Red</h3>
                      <Button 
                        className="bg-red-500 hover:bg-red-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a red t-shirt. Red is the color of apples and fire trucks.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* Pink T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-pink-500 rounded-t-3xl rounded-b-lg border-4 border-pink-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-pink-600">Pink</h3>
                      <Button 
                        className="bg-pink-500 hover:bg-pink-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a pink t-shirt. Pink is a light red color.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>

                    {/* White T-Shirt */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer">
                      <div className="w-32 h-40 mx-auto mb-4 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center relative">
                        <div className="w-24 h-32 bg-white rounded-t-3xl rounded-b-lg border-4 border-gray-300"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-700">White</h3>
                      <Button 
                        className="bg-white hover:bg-gray-100 text-black border border-gray-300 w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a white t-shirt. White is the lightest color, like snow and clouds.");
                        }}
                      >
                        Click here
                      </Button>
                    </div>
                  </div>

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