import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown, ArrowLeft, Upload, User, Key, Phone, Settings, X, Volume2, Play, Image as ImageIcon, Film, TreePine, Microscope, Users, Share2, Heart, Coins } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SiFacebook, SiX, SiTiktok, SiLinkedin, SiBluesky, SiInstagram, SiWhatsapp } from "react-icons/si";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { ObjectCharacters } from "@/components/ObjectCharacters";
import { PromoCodeBanner } from "@/components/PromoCodeBanner";
import { CourseLikeComment } from "@/components/CourseLikeComment";
import { TrafficLightProgress } from "@/components/TrafficLightProgress";
import { SportPlayField } from "@/components/SportPlayField";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useOnlineUsers } from "@/hooks/useOnlineUsers";
import { useCredits } from "@/hooks/useCredits";
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
import domesticAnimalsChart from "@/assets/domestic-animals-chart.jpg";
import wildAnimalsChart from "@/assets/wild-animals-chart.jpg";
import alphabetSong from "@/assets/ximo-abc-song.mp3";
import countingSong from "@/assets/basic-counting-song.mp3";

const LessonVault0406 = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { onlineUsers, onlineCount } = useOnlineUsers('lesson-vault-04-06');
  const { credits, loading: creditsLoading, purchaseCredits } = useCredits();
  const { profile } = useProfile();
  const [isBuyCreditsVisible, setIsBuyCreditsVisible] = useState(false);
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
  const [selectedAnimalType, setSelectedAnimalType] = useState<string | null>(null);
  const [objectCharactersOpen, setObjectCharactersOpen] = useState(false);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [understandingLevel, setUnderstandingLevel] = useState<'red' | 'yellow' | 'green' | null>(null);
  const [trafficLightsOpen, setTrafficLightsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [sportPlayOpen, setSportPlayOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  // Buy Credits visibility cycle
  useEffect(() => {
    if (credits > 40) return;
    
    const cycle = () => {
      setIsBuyCreditsVisible(false);
      
      const showTimer = setTimeout(() => {
        setIsBuyCreditsVisible(true);
        
        const hideTimer = setTimeout(() => {
          cycle();
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }, 10000);
      
      return () => clearTimeout(showTimer);
    };
    
    const cleanup = cycle();
    return cleanup;
  }, [credits]);
  const alphabetAudioRef = useRef<HTMLAudioElement | null>(null);
  const alphabetIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [starAnimations, setStarAnimations] = useState<{[key: number]: boolean}>({});
  const [isAlphabetPlaying, setIsAlphabetPlaying] = useState(false);
  const [currentAlphabetIndex, setCurrentAlphabetIndex] = useState(0);
  const [isCountingPlaying, setIsCountingPlaying] = useState(false);
  const [currentCountingIndex, setCurrentCountingIndex] = useState(0);
  
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
      utterance.volume = 1.0; // Maximum volume for clear counting voice
      utterance.pitch = 1.2; // Higher pitch for child-friendly voice
      window.speechSynthesis.speak(utterance);
    }
  };

  const vowels = ["A", "E", "I", "O", "U"];
  
  const speakVowel = (vowel: string, isAlphabet = false) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(vowel);
      utterance.rate = isAlphabet ? 0.8 : 0.6; // Slightly faster for alphabets to match rhythm
      utterance.volume = isAlphabet ? 1.0 : 0.8; // Louder for alphabets to be heard over music
      
      // Different pitch for each vowel to create distinct tones
      const vowelTones: Record<string, number> = {
        "A": 0.8, // Lower tone
        "E": 1.0, // Mid-low tone  
        "I": 1.4, // Higher tone
        "O": 0.9, // Low-mid tone
        "U": 0.7  // Lowest tone
      };
      
      utterance.pitch = isAlphabet ? 1.2 : (vowelTones[vowel] || 1.0);
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
    const message = "Welcome to My Lesson Vault for Learning the Basic, and as you can see we have a variety of lessons lined up for the kids to start learning immediately, for instance under Numeracy click on Numbers Counting, and when a dropdown menu appears click on it and start counting, and with the Basic Logic dropdown under Emoji AI, we expect your child to be able to identify odd objects that exist in every row; with Literacy your child will learn vowels alphabets and colors, Notes to Parents parent are encouraged among other to get involved offline with coding and logic skills at home with the kid to enable them to figure things out on paper first and foremost.";
    speakInstruction(message);
  };

  // Alphabet auto-play with music
  const startAlphabetPlay = () => {
    if (!alphabetAudioRef.current) return;
    
    setIsAlphabetPlaying(true);
    setCurrentAlphabetIndex(0);
    
    // Start the music
    alphabetAudioRef.current.volume = 1.0; // Full volume for the song
    alphabetAudioRef.current.currentTime = 0;
    alphabetAudioRef.current.play();
    
    // Highlight letters with rhythm matching the music
    let index = 0;
    const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
    
    // Start with first letter
    setCurrentAlphabetIndex(0);
    index++;
    
    // Continue with rhythm (approximately 1.2 seconds per letter to match music tempo)
    alphabetIntervalRef.current = setInterval(() => {
      if (index < alphabet.length) {
        setCurrentAlphabetIndex(index);
        index++;
      } else {
        stopAlphabetPlay();
      }
    }, 1200); // 1.2 seconds per letter for rhythmic flow
  };

  const stopAlphabetPlay = () => {
    setIsAlphabetPlaying(false);
    setCurrentAlphabetIndex(0);
    
    if (alphabetIntervalRef.current) {
      clearInterval(alphabetIntervalRef.current);
      alphabetIntervalRef.current = null;
    }
    
    if (alphabetAudioRef.current) {
      alphabetAudioRef.current.pause();
      alphabetAudioRef.current.currentTime = 0;
    }
    
    window.speechSynthesis.cancel();
  };

  // Counting song functionality
  const countingAudioRef = useRef<HTMLAudioElement | null>(null);
  const countingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountingPlay = () => {
    if (!selectedCountingRange || selectedCountingRange === "vowels" || selectedCountingRange === "alphabets") return;
    
    setIsCountingPlaying(true);
    setCurrentCountingIndex(0);
    
    const [start, end] = selectedCountingRange.split('-').map(Number);
    const totalNumbers = end - start + 1;
    
    // Create and play the audio
    if (!countingAudioRef.current) {
      countingAudioRef.current = new Audio(countingSong);
    }
    countingAudioRef.current.volume = 0.35; // Background music at 35% volume
    countingAudioRef.current.currentTime = 0;
    countingAudioRef.current.play();
    
    // Start speaking numbers with rhythm matching the music
    let index = 0;
    
    // Speak first number immediately
    speakNumber(start);
    index++;
    
    // Continue with rhythm (approximately 1.5 seconds per number to match music tempo)
    countingIntervalRef.current = setInterval(() => {
      if (index < totalNumbers) {
        setCurrentCountingIndex(index);
        const currentNumber = start + index;
        speakNumber(currentNumber);
        index++;
      } else {
        stopCountingPlay();
      }
    }, 1500); // 1.5 seconds per number for rhythmic flow
  };

  const stopCountingPlay = () => {
    setIsCountingPlaying(false);
    setCurrentCountingIndex(0);
    
    if (countingIntervalRef.current) {
      clearInterval(countingIntervalRef.current);
      countingIntervalRef.current = null;
    }
    
    if (countingAudioRef.current) {
      countingAudioRef.current.pause();
      countingAudioRef.current.currentTime = 0;
    }
    
    window.speechSynthesis.cancel();
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
      stopCountingPlay();
      stopAlphabetPlay();
    }
  }, [countingOpen]);

  // Continue music when counting range changes
  useEffect(() => {
    if (selectedCountingRange && isCountingPlaying && 
        selectedCountingRange !== "vowels" && selectedCountingRange !== "alphabets") {
      // Keep music playing, just restart the counting interval for new range
      const [start, end] = selectedCountingRange.split('-').map(Number);
      const totalNumbers = end - start + 1;
      
      // Clear existing interval
      if (countingIntervalRef.current) {
        clearInterval(countingIntervalRef.current);
      }
      
      // Restart counting for new range without stopping music
      setCurrentCountingIndex(0);
      let index = 0;
      
      countingIntervalRef.current = setInterval(() => {
        if (index < totalNumbers) {
          setCurrentCountingIndex(index);
          const currentNumber = start + index;
          speakNumber(currentNumber);
          index++;
        } else {
          if (countingIntervalRef.current) {
            clearInterval(countingIntervalRef.current);
            countingIntervalRef.current = null;
          }
        }
      }, 1500);
    }
  }, [selectedCountingRange]);

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

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleSendResponse = async () => {
    if (!responseText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you can implement sending the response to ecdcoding
      // For now, we'll just show a success message
      toast({
        title: "Success",
        description: "Response sent to ECDCoding team",
      });
      setResponseText("");
      setShowProgressDialog(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send response",
        variant: "destructive",
      });
    }
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
            <Link to="/" aria-label="Home" className="hover:opacity-80 transition-opacity">
              <img src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png" alt="ECDcoding Logo" className="w-52 h-36 md:w-60 md:h-40 object-contain cursor-pointer" />
            </Link>
            <h1 className="text-2xl font-bold mb-1">My Lesson Vault</h1>
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
                <div className="flex flex-wrap gap-1 justify-end">
                  {onlineUsers.map((u) => (
                    <Badge 
                      key={u.user_id}
                      className="text-xs capitalize cursor-pointer hover:opacity-80 transition-opacity bg-white/20 text-white border-white/30"
                      onClick={() => setShowProgressDialog(true)}
                    >
                      {u.registration_type?.replace('-', ' ').replace('parent', 'feedback') || u.first_name || u.username}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

        {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
          <div className="mb-8 mt-12 text-center">
            <h2 className="text-4xl font-bold text-center text-yellow-400 inline-block pb-2 border-b-4 border-dotted border-current" style={{fontFamily: 'Bungee Shade, cursive'}}>Learning the Basics</h2>
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button 
                onClick={speakWhatToExpected}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2"
              >
                <Volume2 className="h-5 w-5" />
                What to Expect
              </Button>
              
              {credits <= 5 && isBuyCreditsVisible ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 animate-fade-in"
                    >
                      <Coins className="h-5 w-5" />
                      {creditsLoading ? "..." : `${credits} Credits - Buy More`}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-64 bg-white dark:bg-gray-800 z-50">
                    <DropdownMenuItem
                      onClick={async () => {
                        await purchaseCredits(2000, 100.0);
                      }}
                      className="cursor-pointer py-3"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">2000 Credits</span>
                        <span className="text-sm text-muted-foreground">ZAR 100.00</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await purchaseCredits(4000, 200.0);
                      }}
                      className="cursor-pointer py-3"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">4000 Credits</span>
                        <span className="text-sm text-muted-foreground">ZAR 200.00</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await purchaseCredits(6000, 300.0);
                      }}
                      className="cursor-pointer py-3"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">6000 Credits</span>
                        <span className="text-sm text-muted-foreground">ZAR 300.00</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2"
                >
                  <Coins className="h-5 w-5" />
                  {creditsLoading ? "..." : `${credits} Credits`}
                </Button>
              )}
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
                       <DropdownMenuItem onClick={() => navigate('/fruit-item-recognition')} className="font-medium text-white hover:bg-white/20">
                         Fruit Item Recognition
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
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  🎭 Performing Arts
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  🎨 Visual Art
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  ✂️ Craft
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Sport
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                        Play
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuItem>
                   </DropdownMenuTrigger>
                     <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                       <DropdownMenuItem onClick={() => {
                         setSelectedSport("soccer");
                         setSportPlayOpen(true);
                       }} className="font-medium text-white hover:bg-white/20">
                         Soccer Tips
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => {
                         setSelectedSport("rugby");
                         setSportPlayOpen(true);
                       }} className="font-medium text-white hover:bg-white/20">
                         Rugby Tips
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => {
                         setSelectedSport("cricket");
                         setSportPlayOpen(true);
                       }} className="font-medium text-white hover:bg-white/20">
                         Cricket Tips
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => {
                         setSelectedSport("tennis");
                         setSportPlayOpen(true);
                       }} className="font-medium text-white hover:bg-white/20">
                         Tennis Tips
                       </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Transportation
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50 w-64">
                <DropdownMenuItem 
                  className="font-medium text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => {setSelectedTransportType("road-transport"); setTransportOpen(true);}}
                >
                  🚗 Road Transport
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="font-medium text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => {setSelectedTransportType("rail-transport"); setTransportOpen(true);}}
                >
                  🚂 Rail Transport
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Road Safety
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50 w-64">
                <DropdownMenuItem 
                  className="font-medium text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => setTrafficLightsOpen(true)}
                >
                  🚦 Traffic Lights
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  <div className="flex flex-col gap-1">
                    <span>🛑 Crossing at a Four-Way Stop</span>
                    <a 
                      href="https://pin.it/5DOPuodGE" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-300 hover:text-blue-200 underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Example
                    </a>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  🚸 Traffic Road Signs
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
                      Animals
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 cursor-pointer"
                      onClick={() => setSelectedAnimalType("domestic")}
                    >
                      Domestic Animals
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 cursor-pointer"
                      onClick={() => setSelectedAnimalType("wild")}
                    >
                      Wild Animals
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 cursor-pointer"
                      onClick={() => setObjectCharactersOpen(true)}
                    >
                      Object Characters
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Videos
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 flex items-center gap-2 cursor-pointer"
                      onClick={() => window.location.href = '/domestic-ecology'}
                    >
                      <BookOpen className="h-4 w-4" />
                      Domestic Ecology
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 flex items-center gap-2 cursor-pointer"
                      onClick={() => navigate('/biology-nature')}
                    >
                      <Microscope className="h-4 w-4" />
                      Biology & Nature
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
                  Square
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
                  {/* Left Column - Simple Square Shape */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">This is a Square</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex items-center justify-center" style={{ minHeight: '350px' }}>
                      <div className="mx-auto" style={{ width: '250px', height: '250px', backgroundColor: '#9333ea', borderRadius: '8px' }}></div>
                    </div>
                    <p className="text-gray-600 mt-4">A square has 4 equal sides and 4 right angles!</p>
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
                  Triangle
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">This is a Triangle</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex items-center justify-center" style={{ minHeight: '350px' }}>
                      <img 
                        src={realTriangleShape} 
                        alt="Real triangle shape - colorful educational material" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                        style={{ maxHeight: '320px', objectFit: 'contain' }}
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
                  Rectangle
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">This is a Rectangle</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex items-center justify-center" style={{ minHeight: '350px' }}>
                      <div className="mx-auto" style={{ width: '320px', height: '200px', backgroundColor: '#dc2626', borderRadius: '8px' }}></div>
                    </div>
                    <p className="text-gray-600 mt-4">A rectangle has 2 long sides and 2 short sides!</p>
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
                  Circle
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">This is a Circle</h2>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex items-center justify-center" style={{ minHeight: '350px' }}>
                      <img 
                        src={realCircleShape} 
                        alt="Real circle shape - colorful educational material" 
                        className="mx-auto rounded-lg max-w-full h-auto"
                        style={{ maxHeight: '250px', maxWidth: '250px', objectFit: 'contain' }}
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
              ref={carouselRef}
              className="flex gap-8 animate-scroll"
              style={{
                animation: 'scroll-horizontal 40s linear infinite',
                width: 'max-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animationPlayState = 'paused';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animationPlayState = 'running';
              }}
              onTouchStart={(e) => {
                setTouchStart(e.targetTouches[0].clientX);
                if (carouselRef.current) {
                  carouselRef.current.style.animationPlayState = 'paused';
                }
              }}
              onTouchMove={(e) => {
                setTouchEnd(e.targetTouches[0].clientX);
              }}
              onTouchEnd={() => {
                if (carouselRef.current) {
                  const swipeDistance = touchStart - touchEnd;
                  const minSwipeDistance = 50;
                  
                  if (Math.abs(swipeDistance) > minSwipeDistance) {
                    // Scroll the carousel based on swipe direction
                    const scrollAmount = swipeDistance > 0 ? 400 : -400;
                    carouselRef.current.scrollBy({
                      left: scrollAmount,
                      behavior: 'smooth'
                    });
                  }
                  
                  // Resume animation after a short delay
                  setTimeout(() => {
                    if (carouselRef.current) {
                      carouselRef.current.style.animationPlayState = 'running';
                    }
                  }, 500);
                }
                
                setTouchStart(0);
                setTouchEnd(0);
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
                  <a href="/emoji-ai" className="block font-bold underline text-black hover:text-pink-400">🎨 Emoji AI</a>
                </CardContent>
              </Card>
              
              <Card className="bg-white p-8 w-80 border-4 border-dashed border-blue-600 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Transportation</h3>
                  <h4 className="text-lg italic mb-4">Exploring vehicles and travel</h4>
                  <p className="text-base mb-4">Learn about different types of transport and how they move us around.</p>
                  <div className="space-y-2">
                    <button onClick={() => {setSelectedTransportType("road-transport"); setTransportOpen(true);}} className="block font-bold underline text-black hover:text-blue-600 text-left">🚗 Road Transport</button>
                    <button onClick={() => {setSelectedTransportType("rail-transport"); setTransportOpen(true);}} className="block font-bold underline text-black hover:text-blue-600 text-left">🚂 Rail Transport</button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white p-8 w-80 border-4 border-dashed border-red-400 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-red-400 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Numbers</h3>
                  <h4 className="text-lg italic mb-4">Bold colors for bolder moves</h4>
                  <p className="text-base mb-4">Let your work simmer with energy and burn bright on every screen.</p>
                  <a href="#" className="font-bold underline text-black hover:text-red-400">Read more</a>
                </CardContent>
              </Card>

              <Card className="bg-white p-8 w-80 border-4 border-dashed border-purple-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-purple-500 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Basic Counting</h3>
                  <h4 className="text-lg italic mb-4">Building blocks of numeracy</h4>
                  <p className="text-base mb-4">Master counting from 1-20 with fun interactive exercises and engaging activities.</p>
                  <a href="#" className="font-bold underline text-black hover:text-purple-500">Read more</a>
                </CardContent>
              </Card>

              <Card className="bg-white p-8 w-80 border-4 border-dashed border-orange-500 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-orange-500 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Problem Solving</h3>
                  <h4 className="text-lg italic mb-4">Think smart, solve fast</h4>
                  <p className="text-base mb-4">Develop critical thinking skills through fun challenges and puzzles.</p>
                  <a href="#" className="font-bold underline text-black hover:text-orange-500">Read more</a>
                </CardContent>
              </Card>

              <Card className="bg-white p-8 w-80 border-4 border-dashed border-green-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-green-500 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Shapes</h3>
                  <h4 className="text-lg italic mb-4">Explore the world of geometry</h4>
                  <p className="text-base mb-4">Learn to identify and draw basic shapes with hands-on activities.</p>
                  <a href="#" className="font-bold underline text-black hover:text-green-500">Read more</a>
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
                  <a href="/emoji-ai" className="block font-bold underline text-black hover:text-pink-400">🎨 Emoji AI</a>
                </CardContent>
              </Card>

              <Card className="bg-white p-8 w-80 border-4 border-dashed border-red-400 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-red-400 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Numbers</h3>
                  <h4 className="text-lg italic mb-4">Bold colors for bolder moves</h4>
                  <p className="text-base mb-4">Let your work simmer with energy and burn bright on every screen.</p>
                  <a href="#" className="font-bold underline text-black hover:text-red-400">Read more</a>
                </CardContent>
              </Card>

              <Card className="bg-white p-8 w-80 border-4 border-dashed border-purple-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-purple-500 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Basic Counting</h3>
                  <h4 className="text-lg italic mb-4">Building blocks of numeracy</h4>
                  <p className="text-base mb-4">Master counting from 1-20 with fun interactive exercises and engaging activities.</p>
                  <a href="#" className="font-bold underline text-black hover:text-purple-500">Read more</a>
                </CardContent>
              </Card>

              <Card className="bg-white p-8 w-80 border-4 border-dashed border-orange-500 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-orange-500 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Problem Solving</h3>
                  <h4 className="text-lg italic mb-4">Think smart, solve fast</h4>
                  <p className="text-base mb-4">Develop critical thinking skills through fun challenges and puzzles.</p>
                  <a href="#" className="font-bold underline text-black hover:text-orange-500">Read more</a>
                </CardContent>
              </Card>

              <Card className="bg-white p-8 w-80 border-4 border-dashed border-green-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold text-green-500 mb-2" style={{ fontFamily: '"Bungee Shade", cursive' }}>Shapes</h3>
                  <h4 className="text-lg italic mb-4">Explore the world of geometry</h4>
                  <p className="text-base mb-4">Learn to identify and draw basic shapes with hands-on activities.</p>
                  <a href="#" className="font-bold underline text-black hover:text-green-500">Read more</a>
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
            {/* Hidden audio element for alphabet background music */}
            {selectedCountingRange === "alphabets" && (
              <audio
                ref={alphabetAudioRef}
                src={alphabetSong}
                loop
                preload="auto"
              />
            )}
            <div className="min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-yellow-400 flex items-center gap-3" style={{fontFamily: 'Bungee Shade, cursive'}}>
                    {selectedCountingRange === "vowels" ? "Vowels" : 
                     selectedCountingRange === "alphabets" ? (
                       <>
                         Alphabets
                         <CourseLikeComment courseId="alphabets" courseName="Alphabets" />
                       </>
                     ) : (
                       <>
                         Basic Counting
                         <CourseLikeComment courseId="basic-counting" courseName="Basic Counting" />
                       </>
                     )}
                  </h1>
                   <div className="flex items-center gap-4">
                      {/* Play Counting Song button - Top Right */}
                      {selectedCountingRange !== "vowels" && selectedCountingRange !== "alphabets" && (
                        <Button
                          onClick={isCountingPlaying ? stopCountingPlay : startCountingPlay}
                          className={`${
                            isCountingPlaying 
                              ? "bg-purple-500 hover:bg-purple-600" 
                              : "bg-blue-500 hover:bg-blue-600"
                          } text-white font-bold py-3 px-6 rounded-lg`}
                        >
                          {isCountingPlaying ? "Stop Song" : "Play Counting Song"}
                        </Button>
                      )}
                     {/* Start Alphabet Play button */}
                     {selectedCountingRange === "alphabets" && (
                       <Button
                         onClick={isAlphabetPlaying ? stopAlphabetPlay : startAlphabetPlay}
                         className={`${
                           isAlphabetPlaying 
                             ? "bg-red-500 hover:bg-red-600" 
                             : "bg-green-500 hover:bg-green-600"
                         } text-white font-bold py-3 px-6 rounded-lg`}
                       >
                         {isAlphabetPlaying ? "Stop" : "Start Alphabet Song"}
                       </Button>
                     )}
                    <button 
                      onClick={() => {setCountingOpen(false); setSelectedCountingRange(null);}}
                      className="text-white hover:text-yellow-400 transition-colors"
                    >
                      <X className="h-8 w-8" />
                    </button>
                  </div>
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
                            onMouseLeave={() => window.speechSynthesis.cancel()}
                            title={`Vowel ${vowel.toUpperCase()} - Click to hear tone`}
                          >
                            {vowel}
                          </div>
                        ));
                     } else if (selectedCountingRange === "alphabets") {
                        const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i)); // Capital letters A-Z
                        return alphabet.map((letter, index) => {
                          const isCurrentlyPlaying = isAlphabetPlaying && index === currentAlphabetIndex;
                          return (
                            <div 
                              key={letter}
                              className={`w-full aspect-square text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer text-white ${
                                isCurrentlyPlaying ? 'animate-pulse ring-4 ring-yellow-400 ring-opacity-75 scale-110' : ''
                              }`}
                              style={{
                                backgroundColor: isCurrentlyPlaying 
                                  ? '#fbbf24' // Yellow when active
                                  : [
                                      '#3a86ff', '#e76f51', '#00afb9', '#ca6702', '#006d77'
                                    ][index % 5]
                              }}
                              onClick={() => !isAlphabetPlaying && speakVowel(letter, true)}
                              onMouseEnter={() => !isAlphabetPlaying && speakVowel(letter, true)}
                              onMouseLeave={() => !isAlphabetPlaying && window.speechSynthesis.cancel()}
                              title={`Letter ${letter} - Click to hear pronunciation`}
                            >
                              {letter}
                            </div>
                          );
                        });
                       } else {
                         const [start, end] = selectedCountingRange.split('-').map(Number);
                         return Array.from({ length: end - start + 1 }, (_, index) => start + index).map((number, arrayIndex) => {
                           const isCurrentlyPlaying = (isAutoCounting && arrayIndex === currentAutoIndex) || (isCountingPlaying && arrayIndex === currentCountingIndex);
                           const isInteractive = !isAutoCounting && !isCountingPlaying;
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
                               onMouseEnter={() => isInteractive && speakNumber(number)}
                               onMouseLeave={() => isInteractive && window.speechSynthesis.cancel()}
                               onClick={() => isInteractive && speakNumber(number)}
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
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 11-20
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "11-20" && (
                      <button 
                        onClick={() => setSelectedCountingRange("21-30")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 21-30
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "21-30" && (
                      <button 
                        onClick={() => setSelectedCountingRange("31-40")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 31-40
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "31-40" && (
                      <button 
                        onClick={() => setSelectedCountingRange("41-50")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 41-50
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "41-50" && (
                      <button 
                        onClick={() => setSelectedCountingRange("51-60")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 51-60
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "51-60" && (
                      <button 
                        onClick={() => setSelectedCountingRange("61-70")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 61-70
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "61-70" && (
                      <button 
                        onClick={() => setSelectedCountingRange("71-80")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 71-80
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "71-80" && (
                      <button 
                        onClick={() => setSelectedCountingRange("81-90")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 81-90
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "81-90" && (
                      <button 
                        onClick={() => setSelectedCountingRange("91-100")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                      >
                        Continue to 91-100
                        <span className="text-2xl">🚀</span>
                      </button>
                    )}
                    {selectedCountingRange === "91-100" && (
                      <button 
                        onClick={() => setSelectedCountingRange("1-10")}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
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

        {/* Full Page Animal View */}
        {selectedAnimalType && (
          <div className="fixed inset-0 tailormade-lessons-texture z-50 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-6">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedAnimalType(null)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-4xl font-bold text-white">
                  {selectedAnimalType === "domestic" ? "Domestic Animals" : "Wild Animals"}
                </h1>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl">
                  <img 
                    src={selectedAnimalType === "domestic" ? domesticAnimalsChart : wildAnimalsChart}
                    alt={selectedAnimalType === "domestic" ? "Domestic Animals Chart" : "Wild Animals Chart"}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Object Characters View */}
        {objectCharactersOpen && (
          <ObjectCharacters onClose={() => setObjectCharactersOpen(false)} />
        )}

       </main>

      <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>Progress Report Communication</DialogTitle>
                <DialogDescription>
                  Track your child's understanding level and share comments
                </DialogDescription>
              </div>
              <Badge className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-3 py-1 text-sm">
                {credits} Credits
              </Badge>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Traffic Light Understanding Checklist */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <Label className="text-sm font-semibold mb-3 block">Child's Understanding Level</Label>
              <div className="flex items-start gap-6">
                <div className="mt-14">
                  <TrafficLightProgress 
                    initialLevel={understandingLevel}
                    onLevelChange={(level) => setUnderstandingLevel(level)}
                  />
                </div>
                <div className="flex-1">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="numeracy">
                      <AccordionTrigger>Numeracy</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">Track progress in counting, numbers, and basic math skills.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="basic-logic">
                      <AccordionTrigger>Basic Logic</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">Monitor development in problem-solving and logical thinking.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="literacy">
                      <AccordionTrigger>Literacy</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">Assess reading, writing, and language comprehension skills.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="arts">
                      <AccordionTrigger>Arts</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">Evaluate creative expression and artistic development.</p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="sport">
                      <AccordionTrigger>Sport</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-4">Track physical development and motor skills.</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Play</h4>
                          <div className="flex flex-col gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedSport("soccer");
                                setSportPlayOpen(true);
                              }}
                              className="justify-start"
                            >
                              ⚽ Soccer
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedSport("rugby");
                                setSportPlayOpen(true);
                              }}
                              className="justify-start"
                            >
                              🏉 Rugby
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedSport("cricket");
                                setSportPlayOpen(true);
                              }}
                              className="justify-start"
                            >
                              🏏 Cricket
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedSport("tennis");
                                setSportPlayOpen(true);
                              }}
                              className="justify-start"
                            >
                              🎾 Tennis
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedSport("indigenous");
                                setSportPlayOpen(true);
                              }}
                              className="justify-start"
                            >
                              🥎 Indigenous Games
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="science-discovery">
                      <AccordionTrigger>Science and Discovery</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground">Observe curiosity and understanding of the natural world.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* User Profile Information - Click to Comment */}
            <div>
              <Label className="text-sm font-semibold">User Information</Label>
              <div className="mt-2 p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                <div 
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  onClick={() => setShowProgressDialog(true)}
                >
                  <Avatar className="h-20 w-20 border-2 border-primary group-hover:scale-110 transition-transform">
                    <AvatarImage src={profile?.profile_image_url || ''} alt={profile?.username || 'User'} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    profile?.registration_type === 'parent' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {profile?.registration_type === 'parent' ? '👨‍👩‍👧 Parent' : '🏫 ECD Manager'}
                  </span>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div>
              <Label htmlFor="response" className="text-sm font-semibold">Feedback</Label>
              <Textarea
                id="response"
                placeholder="Share your thoughts, ask questions, or provide feedback..."
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="mt-2 min-h-[120px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowProgressDialog(false);
                  setResponseText("");
                  setUnderstandingLevel(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSendResponse}>
                Reply
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Traffic Lights Dialog */}
      <Dialog open={trafficLightsOpen} onOpenChange={setTrafficLightsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Traffic Lights</DialogTitle>
            <DialogDescription>
              Learn about traffic light signals and their meanings
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="scale-150">
              <TrafficLightProgress />
            </div>
            
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-red-500"></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Red Light</p>
                  <p className="text-xs text-muted-foreground">Stop and wait</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Yellow Light</p>
                  <p className="text-xs text-muted-foreground">Slow down and prepare to stop</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Green Light</p>
                  <p className="text-xs text-muted-foreground">Go - it's safe to proceed</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sport Play Field Full Screen Overlay */}
      {sportPlayOpen && selectedSport && (
        <div className="fixed inset-0 z-[100] bg-background">
          <div className="absolute top-4 left-4 z-50">
            <Button
              variant="outline"
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90 gap-2"
              onClick={() => {
                setSportPlayOpen(false);
                setSelectedSport(null);
              }}
            >
              <X className="h-4 w-4" />
              Back to My Lesson Vault
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => {
              setSportPlayOpen(false);
              setSelectedSport(null);
            }}
          >
            <X className="h-6 w-6" />
          </Button>
          <SportPlayField sport={selectedSport} />
        </div>
      )}
      
    </div>
  );
};

export default LessonVault0406;