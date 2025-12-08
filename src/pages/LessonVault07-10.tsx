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
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown, ArrowLeft, Upload, User, Key, Phone, Settings, X, Volume2, Play, Image as ImageIcon, Film, TreePine, Microscope, Users, Share2, Heart, Coins, Bot, Construction } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SiFacebook, SiX, SiTiktok, SiLinkedin, SiBluesky, SiInstagram, SiWhatsapp } from "react-icons/si";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { ObjectCharacters } from "@/components/ObjectCharacters";
import { PromoCodeBanner } from "@/components/PromoCodeBanner";
import { CourseLikeComment } from "@/components/CourseLikeComment";
import { TrafficLightProgress } from "@/components/TrafficLightProgress";
import { SportPlayField } from "@/components/SportPlayField";
import MusicLabWrapper from "@/components/MusicLabWrapper";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useOnlineUsers } from "@/hooks/useOnlineUsers";
import { useCredits } from "@/hooks/useCredits";
import { supabase } from "@/integrations/supabase/client";
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
import shapesBasicColor from "@/assets/shapes-basic-color.png";
import beeCharacter from "@/assets/bee-character.jpg";
import girlBodyMyBody from "@/assets/girl-body-my-body.jpg";
import boyBodyMyBody from "@/assets/boy-body-my-body.jpg";
import girlBodyPartsDiagram from "@/assets/girl-body-parts-diagram.jpg";
import schoolBusIcon from "@/assets/transport/school-bus.png";
import sedanIcon from "@/assets/transport/sedan.png";
import dumpTruckIcon from "@/assets/transport/dump-truck.png";
import bulldozerIcon from "@/assets/transport/bulldozer.png";
import boatShipIcon from "@/assets/transport/boat-ship.png";
import airplaneIcon from "@/assets/transport/airplane.png";
import deliveryTruckIcon from "@/assets/transport/delivery-truck.png";
import skateShoeIcon from "@/assets/transport/skate-shoe.png";
import craneTruckIcon from "@/assets/transport/crane-truck.png";
import taxiCarIcon from "@/assets/transport/taxi-car.png";
import armyTankIcon from "@/assets/transport/army-tank.png";
import boyBodyPartsDiagram from "@/assets/boy-body-parts-diagram.jpg";
import fiveSensesDiagram from "@/assets/five-senses.jpg";
import alphabetChart from "@/assets/alphabet-chart.jpg";

const LessonVault0710 = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { onlineUsers, onlineCount } = useOnlineUsers('lesson-vault-07-10');
  const { credits, loading: creditsLoading, purchaseCredits, useCredits: consumeCredits } = useCredits();
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
  const [allFeedback, setAllFeedback] = useState<Array<{
    id: string;
    username: string;
    feedback_text: string;
    created_at: string;
    user_id: string;
  }>>([]);
  const [showCommunityFeed, setShowCommunityFeed] = useState(false);
  const [trafficLightsOpen, setTrafficLightsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [sportPlayOpen, setSportPlayOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [selectedCardForTest, setSelectedCardForTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{
    subject: string;
    audioUrl: string;
    score: number;
    grade: string;
    timestamp: string;
  }[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [humanBeingOpen, setHumanBeingOpen] = useState(false);
  const [selectedBodyType, setSelectedBodyType] = useState<'girl' | 'boy' | null>(null);
  const [fiveSensesOpen, setFiveSensesOpen] = useState(false);
  const [narrationPlayed, setNarrationPlayed] = useState(false);
  const verbalTestingRef = useRef<HTMLDivElement>(null);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const cardAutoResumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false);
  const [capsOpen, setCapsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('ZA');
  const [musicLabOpen, setMusicLabOpen] = useState(false);
  const [musicLabTitle, setMusicLabTitle] = useState('');
  const [musicLabUrl, setMusicLabUrl] = useState('');
  const [displayCredits, setDisplayCredits] = useState(100);
  const [gaugeAnimated, setGaugeAnimated] = useState(true);
  const [lowCreditsNotified, setLowCreditsNotified] = useState(false);
  const openMusicLab = (title: string, url: string) => {
    setMusicLabTitle(title);
    setMusicLabUrl(url);
    setMusicLabOpen(true);
  };

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

  // Sync displayCredits with actual credits from database
  useEffect(() => {
    if (!creditsLoading && credits > 0) {
      setDisplayCredits(Math.min(credits, 100));
    }
  }, [credits, creditsLoading]);

  // Alert user when credits reach 20 or below
  useEffect(() => {
    if (displayCredits <= 20 && displayCredits > 0 && !lowCreditsNotified) {
      setLowCreditsNotified(true);
      toast({
        title: "⚠️ Low Credits Alert!",
        description: `You have ${displayCredits} credits remaining. Get ready to buy more credits to continue learning!`,
        variant: "destructive",
      });
    }
    if (displayCredits > 20) {
      setLowCreditsNotified(false);
    }
  }, [displayCredits, lowCreditsNotified, toast]);

  // Track user activity for idle detection
  const [isUserActive, setIsUserActive] = useState(true);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const IDLE_THRESHOLD = 30000;

  useEffect(() => {
    const resetIdleTimer = () => {
      setIsUserActive(true);
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
      idleTimeoutRef.current = setTimeout(() => {
        setIsUserActive(false);
      }, IDLE_THRESHOLD);
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, resetIdleTimer));
    resetIdleTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetIdleTimer));
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (creditsLoading || credits <= 0 || !isUserActive) return;
    
    const creditDeductionInterval = setInterval(async () => {
      if (isUserActive) {
        const success = await consumeCredits(1);
        if (success) {
          setDisplayCredits(prev => Math.max(0, prev - 1));
        }
      }
    }, 60000);
    
    return () => clearInterval(creditDeductionInterval);
  }, [creditsLoading, credits, consumeCredits, isUserActive]);

  useEffect(() => {
    if (displayCredits > 20) {
      setIsBuyCreditsVisible(false);
      return;
    }
    
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

  useEffect(() => {
    if (showCommunityFeed && showProgressDialog) {
      fetchAllFeedback();
      
      const channel = supabase
        .channel('feedback-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_feedback'
          },
          () => fetchAllFeedback()
        )
        .subscribe();
      
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [showCommunityFeed, showProgressDialog]);

  const fetchAllFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('user_feedback')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAllFeedback(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };
  
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
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(numberWords[number - 1]);
      utterance.rate = 0.8;
      utterance.volume = 1.0;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const vowels = ["A", "E", "I", "O", "U"];
  
  const speakVowel = (vowel: string, isAlphabet = false) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(vowel);
      utterance.rate = isAlphabet ? 0.8 : 0.6;
      utterance.volume = isAlphabet ? 1.0 : 0.8;
      
      const vowelTones: Record<string, number> = {
        "A": 0.8,
        "E": 1.0,
        "I": 1.4,
        "O": 0.9,
        "U": 0.7
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
    const message = "Welcome to My Lesson Vault for ages 8 to 12. Here you will find advanced STEM lessons including coding, robotics, data science, and more. Explore the dropdowns to start learning!";
    speakInstruction(message);
  };

  const startAlphabetPlay = () => {
    if (!alphabetAudioRef.current) return;
    
    setIsAlphabetPlaying(true);
    setCurrentAlphabetIndex(-1);
    
    alphabetAudioRef.current.volume = 1.0;
    alphabetAudioRef.current.currentTime = 0;
    alphabetAudioRef.current.play();
    
    setTimeout(() => {
      let index = 0;
      const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
      
      setCurrentAlphabetIndex(0);
      index++;
      
      alphabetIntervalRef.current = setInterval(() => {
        if (index < alphabet.length) {
          setCurrentAlphabetIndex(index);
          index++;
        } else {
          if (alphabetIntervalRef.current) {
            clearInterval(alphabetIntervalRef.current);
            alphabetIntervalRef.current = null;
          }
        }
      }, 1400);
    }, 2000);
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

  const countingAudioRef = useRef<HTMLAudioElement | null>(null);
  const countingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCountingPlay = () => {
    if (!selectedCountingRange || selectedCountingRange === "vowels" || selectedCountingRange === "alphabets") return;
    
    setIsCountingPlaying(true);
    setCurrentCountingIndex(0);
    
    const [start, end] = selectedCountingRange.split('-').map(Number);
    const totalNumbers = end - start + 1;
    
    if (!countingAudioRef.current) {
      countingAudioRef.current = new Audio(countingSong);
    }
    countingAudioRef.current.volume = 0.35;
    countingAudioRef.current.currentTime = 0;
    countingAudioRef.current.play();
    
    let index = 0;
    speakNumber(start);
    index++;
    
    countingIntervalRef.current = setInterval(() => {
      if (index < totalNumbers) {
        setCurrentCountingIndex(index);
        const currentNumber = start + index;
        speakNumber(currentNumber);
        index++;
      } else {
        stopCountingPlay();
      }
    }, 1500);
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
        clearInterval(intervalRef.current!);
        setIsAutoCounting(false);
        setCurrentAutoIndex(0);
      }
    }, 2000);
  };

  const stopAutoCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAutoCounting(false);
    setCurrentAutoIndex(0);
  };

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

  useEffect(() => {
    if (selectedCountingRange && isCountingPlaying && 
        selectedCountingRange !== "vowels" && selectedCountingRange !== "alphabets") {
      const [start, end] = selectedCountingRange.split('-').map(Number);
      const totalNumbers = end - start + 1;
      
      if (countingIntervalRef.current) {
        clearInterval(countingIntervalRef.current);
      }
      
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

  const emojiCategories = {
    "Facial Recognition": [
      "👦", "👦", "👦", "👦", "👨", "👦", "👦",
      "👩", "👩", "👧", "👩", "👩", "👩", "👩",
      "👶", "👶", "👶", "👶🏽", "👶", "👶", "👶",
      "😄", "😊", "😊", "😊", "😊", "😊", "😊",
      "😀", "😀", "😀", "😀", "😃", "😀", "😀"
    ],
    "Food Verification": [
      "🍎", "🍎", "🍎", "🍎", "🍌", "🍎", "🍎", "🍎", "🍎", "🍎",
      "🥛", "🥛", "🥛", "🧀", "🥛", "🥛", "🥛", "🥛", "🥛", "🥛",
      "🍞", "🍞", "🍞", "🍞", "🥕", "🍞", "🍞", "🍞", "🍞", "🍞",
      "🍕", "🍕", "🍔", "🍕", "🍕", "🍕", "🍕", "🍕", "🍕", "🍕",
      "🥚", "🥚", "🥚", "🥚", "🍗", "🥚", "🥚", "🥚", "🥚", "🥚"
    ]
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleSendResponse = async () => {
    if (!responseText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }

    try {
      if (showCommunityFeed) {
        const { error } = await supabase
          .from('user_feedback')
          .insert({
            user_id: profile?.user_id,
            username: profile?.username || profile?.first_name || 'Anonymous',
            feedback_text: responseText.trim()
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Your feedback has been shared with the community!",
        });
      } else {
        toast({
          title: "Success",
          description: "Response sent to ECDCoding team",
        });
      }
      setResponseText("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send feedback",
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
      title: "Python Programming",
      description: "Learn programming fundamentals with Python",
      icon: Code,
      color: "bg-blue-600",
      lessons: 25,
      duration: "30 mins each"
    },
    {
      id: 2,
      title: "Robotics & Engineering",
      description: "Build and program simple robots",
      icon: Calculator,
      color: "bg-green-600",
      lessons: 18,
      duration: "45 mins each"
    },
    {
      id: 3,
      title: "Data Science for Kids",
      description: "Introduction to data analysis and visualization",
      icon: Beaker,
      color: "bg-purple-600",
      lessons: 15,
      duration: "35 mins each"
    },
    {
      id: 4,
      title: "Web Development Basics",
      description: "Create websites with HTML, CSS and JavaScript",
      icon: BookOpen,
      color: "bg-orange-600",
      lessons: 22,
      duration: "40 mins each"
    },
    {
      id: 5,
      title: "AI & Machine Learning",
      description: "Understanding artificial intelligence concepts",
      icon: Gamepad2,
      color: "bg-red-600",
      lessons: 12,
      duration: "50 mins each"
    },
    {
      id: 6,
      title: "Electronics & Circuits",
      description: "Learn about electricity and electronic components",
      icon: Calculator,
      color: "bg-yellow-600",
      lessons: 16,
      duration: "35 mins each"
    }
  ];

  return (
    <div className="min-h-screen bg-[#313056]">
      {/* Navigation Bar */}
      <nav className="bg-[#252045] text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-end gap-4">
            <Link to="/" aria-label="Home" className="hover:opacity-80 transition-opacity">
              <img src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png" alt="ECDcoding Logo" className="w-52 h-36 md:w-60 md:h-40 object-contain cursor-pointer" />
            </Link>
            <h1 className="text-2xl font-bold mb-1">My Lesson Vault (Ages 08-12)</h1>
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
        <PromoCodeBanner />
        
        <div className="mb-8 mt-12 text-center">
          <h2 className="text-4xl font-bold text-center text-yellow-400 inline-block pb-2 border-b-4 border-dotted border-current" style={{fontFamily: 'Bungee Shade, cursive'}}>Advanced STEM Learning</h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button 
              onClick={speakWhatToExpected}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2"
            >
              <Volume2 className="h-5 w-5" />
              What to Expect
            </Button>
            
            {/* Credit Level Gauge */}
            <div className="relative">
              <div className="flex items-center gap-2 bg-[#252045] rounded-full px-4 py-2 shadow-md">
                <Coins className="h-5 w-5 text-yellow-400" />
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between w-24">
                    <span className="text-[10px] text-white/60">0</span>
                    <span className="text-xs font-semibold text-white">{displayCredits}</span>
                    <span className="text-[10px] text-white/60">100</span>
                  </div>
                  <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        displayCredits <= 20 
                          ? 'bg-gradient-to-r from-red-400 to-red-500' 
                          : 'bg-gradient-to-r from-green-400 to-green-500'
                      }`}
                      style={{ width: `${displayCredits}%` }}
                    />
                  </div>
                </div>
              </div>
              
              {credits <= 20 && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg animate-pulse"
                        size="sm"
                      >
                        💳 Add Credits
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-64 bg-white dark:bg-gray-800 z-50">
                      <DropdownMenuItem
                        onClick={async () => {
                          await purchaseCredits(100, 5.0);
                        }}
                        className="cursor-pointer py-3"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">100 Credits</span>
                          <span className="text-sm text-muted-foreground">ZAR 5.00</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          await purchaseCredits(200, 10.0);
                        }}
                        className="cursor-pointer py-3"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">200 Credits</span>
                          <span className="text-sm text-muted-foreground">ZAR 10.00</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={async () => {
                          await purchaseCredits(300, 15.0);
                        }}
                        className="cursor-pointer py-3"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">300 Credits</span>
                          <span className="text-sm text-muted-foreground">ZAR 15.00</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lessons Banner - Similar structure to 04-06 */}
        <div className="mt-12 p-6 rounded-lg bg-transparent">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Numeracy
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Number Counting
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Shapes
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Basic Logic
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                        Emoji AI
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuItem>
                   </DropdownMenuTrigger>
                     <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Literacy
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
               <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Notes to
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem onClick={() => setParentsOpen(true)} className="font-medium text-white hover:bg-white/20">
                  👨‍👩‍👧‍👦 Parents
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  🎓 Tech Teachers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCapsOpen(true)} className="font-medium text-white hover:bg-white/20">
                  🏫 ECD Institutions (CAPS)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Life Skills
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Arts
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                          🎭 Performing Arts
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              🎵 Music Training
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🎹 Piano
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Shared Piano', 'https://musiclab.chromeexperiments.com/Shared-Piano/')}>
                                  🎹 Shared Piano
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Piano Roll', 'https://musiclab.chromeexperiments.com/Piano-Roll/')}>
                                  🎼 Piano Roll
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Arpeggios', 'https://musiclab.chromeexperiments.com/Arpeggios/')}>
                                  🎶 Arpeggios
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Chords', 'https://musiclab.chromeexperiments.com/Chords/')}>
                                  🎵 Chords
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Strings', 'https://musiclab.chromeexperiments.com/Strings/')}>
                              🎻 Strings
                            </DropdownMenuItem>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🥁 Rhythm
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Rhythm Maker', 'https://musiclab.chromeexperiments.com/Rhythm/')}>
                                  🥁 Rhythm Maker
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Song Maker', 'https://musiclab.chromeexperiments.com/Song-Maker/')}>
                                  🎧 Song Maker
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Melody Maker', 'https://musiclab.chromeexperiments.com/Melody-Maker/')}>
                                  🎵 Melody Maker
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🎤 Voice
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Voice Spinner', 'https://musiclab.chromeexperiments.com/Voice-Spinner/')}>
                                  🌀 Voice Spinner
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Spectrogram', 'https://musiclab.chromeexperiments.com/Spectrogram/')}>
                                  📊 Spectrogram
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🔊 Sound Science
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Sound Waves', 'https://musiclab.chromeexperiments.com/Sound-Waves/')}>
                                  🌊 Sound Waves
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Harmonics', 'https://musiclab.chromeexperiments.com/Harmonics/')}>
                                  🎼 Harmonics
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Oscillators', 'https://musiclab.chromeexperiments.com/Oscillators/')}>
                                  📈 Oscillators
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Kandinsky (Art + Music)', 'https://musiclab.chromeexperiments.com/Kandinsky/')}>
                              🎨 Kandinsky (Art + Music)
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              🎬 Drama
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                              🎭 Monologue
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Sport
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                          Play Fields Info
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("soccer");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Soccer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("rugby");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Rugby
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("cricket");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Cricket
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("tennis");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Tennis
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("netball");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Netball
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Science & Discovery
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Animals
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => setSelectedAnimalType("domestic")} className="font-medium text-white hover:bg-white/20">
                      Domestic Animals
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedAnimalType("wild")} className="font-medium text-white hover:bg-white/20">
                      Wild Animals
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setObjectCharactersOpen(true)} className="font-medium text-white hover:bg-white/20">
                      The Young and Old
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Human Being
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                          My Body
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                        <DropdownMenuItem onClick={() => {setSelectedBodyType('girl'); setHumanBeingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                          Girl
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {setSelectedBodyType('boy'); setHumanBeingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                          Boy
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenuItem onClick={() => setFiveSensesOpen(true)} className="font-medium text-white hover:bg-white/20">
                      Five Senses
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {stemCourses.map((course) => {
            const IconComponent = course.icon;
            return (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer bg-white/10 border-white/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`${course.color} p-3 rounded-lg`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{course.title}</CardTitle>
                      <p className="text-sm text-white/70">{course.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-white/70">{course.lessons} lessons</span>
                    <span className="text-sm text-white/70">{course.duration}</span>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Start Learning</Button>
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

      {/* Music Lab Wrapper Dialog */}
      <MusicLabWrapper
        isOpen={musicLabOpen}
        onClose={() => setMusicLabOpen(false)}
        title={musicLabTitle}
        url={musicLabUrl}
      />

      {/* Sport Play Field Dialog */}
      <Dialog open={sportPlayOpen} onOpenChange={setSportPlayOpen}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-screen h-screen p-0">
          {selectedSport && (
            <SportPlayField 
              sport={selectedSport} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Object Characters Dialog */}
      <Dialog open={objectCharactersOpen} onOpenChange={setObjectCharactersOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>The Young and Old</DialogTitle>
          </DialogHeader>
          <ObjectCharacters onClose={() => setObjectCharactersOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Audio elements */}
      <audio ref={alphabetAudioRef} src={alphabetSong} preload="auto" />
    </div>
  );
};

export default LessonVault0710;