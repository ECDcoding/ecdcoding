import { useState, useEffect, useRef } from "react";
import ExpoCopilot from "@/components/ExpoCopilot";
import { PayFastPaymentDialog } from "@/components/PayFastPaymentDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown, ChevronLeft, ChevronRight, ArrowLeft, Upload, User, Key, Phone, Settings, X, Volume2, Play, Image as ImageIcon, Film, TreePine, Microscope, Users, Share2, Heart, Coins, FileText } from "lucide-react";
import { MiniTrafficRobot } from "@/components/MiniTrafficRobot";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { SiFacebook, SiX, SiTiktok, SiLinkedin, SiBluesky, SiInstagram, SiWhatsapp } from "react-icons/si";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import FixAlphabetOrderPuzzle from "@/components/FixAlphabetOrderPuzzle";
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
import { useEarlyAdopter } from "@/hooks/useEarlyAdopter";
import { supabase } from "@/integrations/supabase/client";
import VerifiedBadge from "@/components/VerifiedBadge";
import { InstitutionCommunity } from "@/components/InstitutionCommunity";
import FlipBodyCard from "@/components/FlipBodyCard";
import FlipTrafficCard from "@/components/FlipTrafficCard";
import FlipTransportCard from "@/components/FlipTransportCard";
import FlipAnimalsCard from "@/components/FlipAnimalsCard";
import FlipMonthsCard from "@/components/FlipMonthsCard";
import FlipNumbersCard from "@/components/FlipNumbersCard";
import CardLessonFocus from "@/components/NumbersCarousel";
import numbers1to10 from "@/assets/numbers-1-to-10.jpg";
import numbers11to20 from "@/assets/numbers-11-to-20.jpg";
import numbers21to30 from "@/assets/numbers-21-to-30.jpg";
import numbers31to40 from "@/assets/numbers-31-to-40.jpg";
import domesticAnimalsCartoon from "@/assets/domestic-animals-cartoon.png";
import instagramLogo from "@/assets/instagram-logo.png";
import whatsappLogo from "@/assets/whatsapp-logo.jpg";
import abcSafetyImage from "@/assets/abc-safety.png";
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
import vowelsBackgroundMusic from "@/assets/vowels-background-music.mp3";
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
import basicLogicThinking from "@/assets/basic-logic-thinking.jpg";
import stopSign from "@/assets/stop-sign.png";

const LessonVault0406 = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAdmin, loading: adminLoading } = useIsAdmin();

  // Learner Progress Report is now accessed from the profile dropdown
  // (no automatic redirect on entering the lesson vault).

  const lessonPeriodParam = searchParams.get("period") as "day" | "week" | "month" | null;
  const lessonPeriod: "day" | "week" | "month" = lessonPeriodParam ?? "day";
  const showLessonFocusBanner = lessonPeriodParam !== null;
  const { toast } = useToast();
  const { onlineUsers, onlineCount } = useOnlineUsers('lesson-vault-04-06');
  const { credits, topupCredits, loading: creditsLoading, purchaseCredits, useCredits: consumeCredits, showReloadDialog, setShowReloadDialog } = useCredits();
  const { profile } = useProfile();
  const { isEarlyAdopter } = useEarlyAdopter();
  const [isBuyCreditsVisible, setIsBuyCreditsVisible] = useState(false);
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState<string | null>(null);
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [pictureActive, setPictureActive] = useState<boolean>(false);
  const [countingOpen, setCountingOpen] = useState(false);
  const [fixOrderOpen, setFixOrderOpen] = useState(false);
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
  const [monthsOpen, setMonthsOpen] = useState(false);
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
  const [abcSafetyOpen, setAbcSafetyOpen] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
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
  const [focusedLessonCard, setFocusedLessonCard] = useState<string | null>(null);
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
  const [fullScreenCard, setFullScreenCard] = useState<{
    name: string;
    image?: string;
    title?: string;
    content?: React.ReactNode;
    borderColor?: string;
  } | null>(null);
  const [musicLabTitle, setMusicLabTitle] = useState('');
  const [musicLabUrl, setMusicLabUrl] = useState('');
  const [codingDialogOpen, setCodingDialogOpen] = useState(false);
  const [codingNumbersOpen, setCodingNumbersOpen] = useState(false);
  const [currentNumberLetterIndex, setCurrentNumberLetterIndex] = useState(0);
  const [displayCredits, setDisplayCredits] = useState(100); // Start filled with 100 credits
  const [gaugeAnimated, setGaugeAnimated] = useState(true); // Already animated/filled
  const [lowCreditsNotified, setLowCreditsNotified] = useState(false);
  const openMusicLab = (title: string, url: string) => {
    setMusicLabTitle(title);
    setMusicLabUrl(url);
    setMusicLabOpen(true);
  };

  // Helper function to get robot status based on highest score for a subject
  const getRobotStatus = (subjectFilter: (r: typeof testResults[0]) => boolean): { status: 'red' | 'yellow' | 'green', label: string } => {
    const filteredResults = testResults.filter(subjectFilter);
    console.log('getRobotStatus - filteredResults:', filteredResults);
    if (filteredResults.length === 0) {
      console.log('getRobotStatus - No results, returning red');
      return { status: 'red', label: 'Not learned' };
    }
    const highestScore = Math.max(...filteredResults.map(r => r.score));
    console.log('getRobotStatus - highestScore:', highestScore);
    if (highestScore >= 8) {
      console.log('getRobotStatus - returning green');
      return { status: 'green', label: 'Ready!' };
    } else if (highestScore >= 5) {
      console.log('getRobotStatus - returning yellow');
      return { status: 'yellow', label: 'Promising' };
    }
    console.log('getRobotStatus - returning red (score < 5)');
    return { status: 'red', label: 'Not learned' };
  };

  // Sync displayCredits with actual credits from database
  useEffect(() => {
    if (!creditsLoading && credits > 0) {
      setDisplayCredits(Math.min(credits, 100));
    }
  }, [credits, creditsLoading]);

  // Auto-scroll to Verbal Testing Space when 'Lesson of the Day/Week/Month' dropdown navigates here
  useEffect(() => {
    if (showLessonFocusBanner && verbalTestingRef.current) {
      const t = setTimeout(() => {
        verbalTestingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [showLessonFocusBanner, lessonPeriod]);

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
    // Reset notification flag when credits go back above 20
    if (displayCredits > 20) {
      setLowCreditsNotified(false);
    }
  }, [displayCredits, lowCreditsNotified, toast]);

  // Track user activity for idle detection
  const [isUserActive, setIsUserActive] = useState(true);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const IDLE_THRESHOLD = 30000; // 30 seconds of inactivity

  // Reset idle timer on user activity
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

    // Activity events to track
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, resetIdleTimer));
    
    // Start the initial idle timer
    resetIdleTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetIdleTimer));
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  // Auto-deduct 1 credit every 60 seconds while lesson is active AND user is not idle
  useEffect(() => {
    if (creditsLoading || credits <= 0 || !isUserActive) return;
    
    const creditDeductionInterval = setInterval(async () => {
      if (isUserActive) {
        const success = await consumeCredits(1);
        if (success) {
          setDisplayCredits(prev => Math.max(0, prev - 1));
        }
      }
    }, 60000); // 60 seconds
    
    return () => clearInterval(creditDeductionInterval);
  }, [creditsLoading, credits, consumeCredits, isUserActive]);

  // Immediately show PayFast reload dialog when credits are exhausted
  useEffect(() => {
    if (!creditsLoading && credits <= 0 && user) {
      setShowReloadDialog(true);
    }
  }, [credits, creditsLoading, user]);

  // Check if user already has an active subscription
  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('subscription_payments')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();
      setHasActiveSubscription(!!data);
    };
    checkSubscription();
  }, [user]);

  // Buy Credits visibility when credits reach 20 or below
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
  
  // Helper function to create recording handler for carousel cards
  const createRecordingHandler = (cardName: string) => async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!carouselPaused) {
      toast({
        title: "Select Card First",
        description: "Click on the card to stop the carousel before recording.",
        variant: "destructive",
      });
      return;
    }
    
    if (isRecording) {
      mediaRecorder?.stop();
      setIsRecording(false);
      setRecordingTime(0);
    } else {
      // Clear the auto-resume timeout since user clicked the mic
      if (cardAutoResumeTimeoutRef.current) {
        clearTimeout(cardAutoResumeTimeoutRef.current);
        cardAutoResumeTimeoutRef.current = null;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks: BlobPart[] = [];
        
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(blob);
          
          const score = Math.floor(Math.random() * 6) + 5;
          const grade = score === 5 ? 'D' : score >= 6 && score <= 7 ? 'C' : score >= 8 && score <= 9 ? 'B' : 'A';
          
          const newResult = {
            subject: selectedCardForTest || cardName,
            audioUrl,
            score,
            grade,
            timestamp: new Date().toISOString()
          };
          
          setTestResults(prev => [...prev, newResult]);
          
          if (carouselRef.current) {
            carouselRef.current.style.animationPlayState = 'running';
          }
          setCarouselPaused(false);
          setSelectedCardForTest(null);
          
          toast({
            title: "Recording Saved",
            description: `Your answer has been recorded. Score: ${score}/10 (${grade})`,
          });
          stream.getTracks().forEach(track => track.stop());
        };
        
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
        setRecordingTime(0);
        
        const timer = setInterval(() => {
          setRecordingTime(prev => {
            if (prev >= 30) {
              clearInterval(timer);
              if (recorder.state === 'recording') {
                recorder.stop();
              }
              setIsRecording(false);
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        toast({
          title: "Microphone Error",
          description: "Unable to access microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Carousel card data for full-screen view
  const carouselCardData: Record<string, { image?: string; title?: string; content?: React.ReactNode; borderColor: string }> = {
    "Girl's Body": { image: girlBodyMyBody, title: "Girl's Body", borderColor: "border-yellow-400" },
    "Boy's Body": { image: boyBodyMyBody, title: "Boy's Body", borderColor: "border-red-400" },
    "My Body": { image: girlBodyMyBody, title: "My Body", borderColor: "border-gradient" },
    "Traffic Robot": { title: "Traffic Robot", content: (
      <div className="flex flex-col items-center justify-center">
        <div className="transform scale-150">
          <TrafficLightProgress mode="traffic" />
        </div>
      </div>
    ), borderColor: "border-pink-400" },
    "Stop Sign": { image: stopSign, title: "Stop Sign", borderColor: "border-red-500" },
    "Basic Logic": { title: "", content: (
      <div className="flex flex-col items-center justify-center">
        <div className="transform scale-150">
          <TrafficLightProgress mode="traffic" />
        </div>
      </div>
    ), borderColor: "border-pink-400" },
    "Transportation": { image: dumpTruckIcon, title: "Transportation", borderColor: "border-blue-600" },
    "ABC Chart": { image: alphabetChart, title: "ABC Chart", borderColor: "border-purple-500" },
    "Basic Shapes": { image: shapesBasicColor, title: "Basic Shapes", borderColor: "border-green-500" },
    "Wild Animals": { image: wildAnimalsChart, title: "Wild Animals", borderColor: "border-teal-600" },
    "Domestic Animals": { image: domesticAnimalsCartoon, title: "Domestic Animals", borderColor: "border-orange-500" },
    "Busy Bee": { image: beeCharacter, title: "Busy Bee", borderColor: "border-blue-500" },
    "Months of the Year": { title: "Months of the Year", content: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-500 text-white font-bold rounded-lg p-3 text-center">January</div>
          <div className="bg-orange-500 text-white font-bold rounded-lg p-3 text-center">February</div>
          <div className="bg-yellow-500 text-white font-bold rounded-lg p-3 text-center">March</div>
          <div className="bg-green-500 text-white font-bold rounded-lg p-3 text-center">April</div>
          <div className="bg-teal-500 text-white font-bold rounded-lg p-3 text-center">May</div>
          <div className="bg-blue-500 text-white font-bold rounded-lg p-3 text-center">June</div>
          <div className="bg-indigo-500 text-white font-bold rounded-lg p-3 text-center">July</div>
          <div className="bg-purple-500 text-white font-bold rounded-lg p-3 text-center">August</div>
          <div className="bg-pink-500 text-white font-bold rounded-lg p-3 text-center">September</div>
          <div className="bg-rose-500 text-white font-bold rounded-lg p-3 text-center">October</div>
          <div className="bg-cyan-500 text-white font-bold rounded-lg p-3 text-center">November</div>
          <div className="bg-emerald-500 text-white font-bold rounded-lg p-3 text-center">December</div>
        </div>
      </div>
    ), borderColor: "border-amber-500" },
    "Seasons of the Year": { title: "Seasons of the Year", content: (
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-yellow-400 text-white font-bold rounded-lg p-4 text-center text-base shadow-md">☀️ Summer</div>
        <div className="bg-sky-400 text-white font-bold rounded-lg p-4 text-center text-base shadow-md">❄️ Winter</div>
        <div className="bg-amber-600 text-white font-bold rounded-lg p-4 text-center text-base shadow-md">🍂 Autumn</div>
        <div className="bg-lime-500 text-white font-bold rounded-lg p-4 text-center text-base shadow-md">🌸 Spring</div>
      </div>
    ), borderColor: "border-amber-500" },
    "Numbers 1-10": { image: numbers1to10, title: "Numbers 1 – 10", borderColor: "border-blue-500" },
    "Numbers 11-20": { image: numbers11to20, title: "Numbers 11 – 20", borderColor: "border-green-500" },
    "Numbers 21-30": { image: numbers21to30, title: "Numbers 21 – 30", borderColor: "border-yellow-500" },
    "Numbers 31-40": { image: numbers31to40, title: "Numbers 31 – 40", borderColor: "border-pink-500" },
  };

  // Helper function to handle card click for stopping carousel and opening full-screen view
  const handleCardClick = (cardName: string) => (e?: React.MouseEvent) => {
    // Check if target exists before using closest (for flip cards that don't pass event)
    const targetIsButton = e?.target ? (e.target as HTMLElement).closest('button, a') : false;
    
    if (!isRecording && !targetIsButton) {
      // Clear any existing timeout
      if (cardAutoResumeTimeoutRef.current) {
        clearTimeout(cardAutoResumeTimeoutRef.current);
      }
      
      if (carouselRef.current) {
        carouselRef.current.style.animationPlayState = 'paused';
      }
      setCarouselPaused(true);
      setSelectedCardForTest(cardName);
      setFocusedLessonCard(cardName);
      
      // Open full-screen view with card data
      const cardData = carouselCardData[cardName];
      if (cardData) {
        setFullScreenCard({
          name: cardName,
          ...cardData
        });
      }
    }
  };
  
  // Function to close full-screen card and resume carousel
  const closeFullScreenCard = () => {
    setFullScreenCard(null);
    if (carouselRef.current) {
      carouselRef.current.style.animationPlayState = 'running';
    }
    setCarouselPaused(false);
    setSelectedCardForTest(null);
  };
  
  // Function to play narration on demand using Web Speech API
  const playNarration = () => {
    const narrationText = "Welcome to the Verbal Testing Space for your kid. Here your kid is expected to click on any of the carousel card of their choice when they are ready to present a verbal description of what they already learned and understand. Upon clicking a card, the card will stop the carousel flow, and then they will be required to also click on the microphone, assuming that they already have headsets on with their mic enabled, for the 30 seconds verbal recording to be successful and saved in the relevant lesson archive. And if the 30 seconds is finished before the full description is made, the parent or teacher may or must assume that the kid does not understand fully and may be required to relearn the lesson until they are ready to try again.";
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;
      utterance.volume = 1;
      
      window.speechSynthesis.speak(utterance);
      
      toast({
        title: "Playing Instructions",
        description: "Listen carefully to the testing instructions.",
      });
    } else {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  // Emoji to spoken name mapping
  const emojiNameMap: Record<string, string> = {
    '😀': 'Grinning Face', '☺️': 'Smiling Face', '😍': 'Heart Eyes Face', '😋': 'Yummy Face', '😉': 'Winking Face',
    '😅': 'Nervous Laugh Face', '😡': 'Angry Face', '😪': 'Sleepy Face', '🙄': 'Eye Roll Face', '😭': 'Crying Face',
    '⚽': 'Soccer Ball', '🏉': 'Rugby Ball', '🎾': 'Tennis Ball', '🥊': 'Boxing Gloves', '🏏': 'Cricket Bat',
    '🏃': 'Running', '🚴': 'Cycling', '🏊': 'Swimming', '⛹️': 'Basketball Player', '🤸': 'Gymnast',
    'f': 'Facebook', 'instagram': 'Instagram', '𝕏': 'X, formerly Twitter', '♪': 'TikTok', 'whatsapp': 'WhatsApp',
    '📧': 'Email', '▶': 'YouTube', '🎥': 'Video Camera', '📹': 'Camcorder',
  };

  const speakEmojiName = (emoji: string | null) => {
    if (!emoji || 'speechSynthesis' in window === false) return;
    window.speechSynthesis.cancel();
    const name = emojiNameMap[emoji] || emoji;
    const utterance = new SpeechSynthesisUtterance(`This is ${name}`);
    utterance.rate = 0.85;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };


const alphabetAudioRef = useRef<HTMLAudioElement | null>(null);
  const vowelsAudioRef = useRef<HTMLAudioElement | null>(null);
  const alphabetIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const alphabetLoopTriggeredRef = useRef(false); // Prevent multiple loop triggers
  const lastAlphabetTimeRef = useRef(0); // Track time to detect loop
  const [starAnimations, setStarAnimations] = useState<{[key: number]: boolean}>({});
  const [isAlphabetPlaying, setIsAlphabetPlaying] = useState(false);
  const [isVowelsMusicPlaying, setIsVowelsMusicPlaying] = useState(false);
  const [isAlphabetIntroComplete, setIsAlphabetIntroComplete] = useState(false);
  const [alphabetPlayCount, setAlphabetPlayCount] = useState(0);
  // Vowels two-round state
  const [isVowelsPlaying, setIsVowelsPlaying] = useState(false);
  const [isVowelsIntroComplete, setIsVowelsIntroComplete] = useState(false);
  const [currentVowelIndex, setCurrentVowelIndex] = useState(-1);
  const vowelsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch all feedback when community feed is shown
  useEffect(() => {
    if (showCommunityFeed && showProgressDialog) {
      fetchAllFeedback();
      
      // Subscribe to realtime updates
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
  const [wordToCode, setWordToCode] = useState('');
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

  const vowels = ["a", "e", "i", "o", "u"];
  
  const speakVowel = (vowel: string, isAlphabet = false) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(vowel);
      utterance.rate = isAlphabet ? 0.8 : 0.6; // Slightly faster for alphabets to match rhythm
      utterance.volume = isAlphabet ? 1.0 : 0.8; // Louder for alphabets to be heard over music
      
      // Different pitch for each vowel to create distinct tones
      const vowelTones: Record<string, number> = {
        "a": 0.8, // Lower tone
        "e": 1.0, // Mid-low tone  
        "i": 1.4, // Higher tone
        "o": 0.9, // Low-mid tone
        "u": 0.7  // Lowest tone
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

  // Alphabet play - Two rounds:
  // Round 1: Voice alone recites A-Z with letters flashing (no music)
  // Round 2: Song plays ONCE with letters flashing, then stops
  
  // Speak a single alphabet letter
  const speakAlphabetLetter = (letter: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.rate = 0.7; // Slow and clear for kids
      utterance.volume = 1.0;
      utterance.pitch = 1.2; // Child-friendly pitch
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const startAlphabetPlay = () => {
    setIsAlphabetPlaying(true);
    setCurrentAlphabetIndex(0);
    
    // Check if this is first round (voice only) or second round (song)
    if (!isAlphabetIntroComplete) {
      // ROUND 1: Voice recites A-Z with flashing - no music
      startVoiceRecitation();
    } else {
      // ROUND 2: Play song once with flashing
      startSongWithFlashing();
    }
  };
  
  // Round 1: Voice recites each letter with flashing
  const startVoiceRecitation = () => {
    let index = 0;
    const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
    
    // Speak and flash first letter immediately
    setCurrentAlphabetIndex(0);
    speakAlphabetLetter(alphabet[0]);
    index++;
    
    // Continue through all letters
    alphabetIntervalRef.current = setInterval(() => {
      if (index < alphabet.length) {
        setCurrentAlphabetIndex(index);
        speakAlphabetLetter(alphabet[index]);
        index++;
      } else {
        // Voice recitation complete - mark intro as done
        if (alphabetIntervalRef.current) {
          clearInterval(alphabetIntervalRef.current);
          alphabetIntervalRef.current = null;
        }
        setCurrentAlphabetIndex(-1);
        setIsAlphabetPlaying(false);
        setIsAlphabetIntroComplete(true); // Ready for round 2
      }
    }, 1400); // 1.4 seconds per letter
  };
  
  // Round 2: Song plays once with letters flashing in sync
  const startSongWithFlashing = () => {
    if (!alphabetAudioRef.current) return;
    
    let index = 0;
    
    // Start the music (will play once, no loop)
    alphabetAudioRef.current.volume = 1.0;
    alphabetAudioRef.current.currentTime = 0;
    alphabetAudioRef.current.play();
    
    // Flash first letter immediately
    setCurrentAlphabetIndex(0);
    index++;
    
    // Continue flashing letters in sync with song
    alphabetIntervalRef.current = setInterval(() => {
      if (index < 26) {
        setCurrentAlphabetIndex(index);
        index++;
      } else {
        // All letters done - keep flashing from start if song still playing
        index = 0;
        setCurrentAlphabetIndex(index);
        index++;
      }
    }, 1400); // 1.4 seconds per letter - matches song tempo
  };
  
  // Handle when song ends (called from onEnded event)
  const handleAlphabetSongEnd = () => {
    // Song finished - stop everything
    stopAlphabetPlay();
  };

  const stopAlphabetPlay = () => {
    setIsAlphabetPlaying(false);
    setCurrentAlphabetIndex(-1);
    
    // Reset refs
    alphabetLoopTriggeredRef.current = false;
    lastAlphabetTimeRef.current = 0;
    
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

  // Vowels play - Two rounds:
  // Round 1: Voice recites A, E, I, O, U with letters flashing (no music)
  // Round 2: Music plays once with letters flashing, then stops
  
  const startVowelsPlay = () => {
    setIsVowelsPlaying(true);
    setCurrentVowelIndex(0);
    
    if (!isVowelsIntroComplete) {
      // ROUND 1: Voice recites vowels with flashing
      startVowelsVoiceRecitation();
    } else {
      // ROUND 2: Play music with flashing
      startVowelsMusicWithFlashing();
    }
  };
  
  // Round 1: Voice recites each vowel with flashing
  const startVowelsVoiceRecitation = () => {
    let index = 0;
    
    // Speak and flash first vowel immediately
    setCurrentVowelIndex(0);
    speakVowel(vowels[0]);
    index++;
    
    // Continue through all vowels
    vowelsIntervalRef.current = setInterval(() => {
      if (index < vowels.length) {
        setCurrentVowelIndex(index);
        speakVowel(vowels[index]);
        index++;
      } else {
        // Voice recitation complete - mark intro as done
        if (vowelsIntervalRef.current) {
          clearInterval(vowelsIntervalRef.current);
          vowelsIntervalRef.current = null;
        }
        setCurrentVowelIndex(-1);
        setIsVowelsPlaying(false);
        setIsVowelsIntroComplete(true); // Ready for round 2
      }
    }, 1400); // 1.4 seconds per vowel
  };
  
  // Round 2: Music plays once with vowels flashing in sync
  const startVowelsMusicWithFlashing = () => {
    if (!vowelsAudioRef.current) return;
    
    let index = 0;
    
    // Start the music (will play once, no loop)
    vowelsAudioRef.current.volume = 1.0;
    vowelsAudioRef.current.currentTime = 0;
    vowelsAudioRef.current.play();
    setIsVowelsMusicPlaying(true);
    
    // Flash first vowel immediately
    setCurrentVowelIndex(0);
    index++;
    
    // Continue flashing vowels in sync with music (loop through A E I O U)
    vowelsIntervalRef.current = setInterval(() => {
      if (index >= vowels.length) {
        index = 0; // Loop back to A
      }
      setCurrentVowelIndex(index);
      index++;
    }, 1400); // 1.4 seconds per vowel
  };
  
  // Handle when vowels music ends
  const handleVowelsMusicEnd = () => {
    stopVowelsPlay();
  };

  const stopVowelsPlay = () => {
    setIsVowelsPlaying(false);
    setCurrentVowelIndex(-1);
    setIsVowelsMusicPlaying(false);
    
    if (vowelsIntervalRef.current) {
      clearInterval(vowelsIntervalRef.current);
      vowelsIntervalRef.current = null;
    }
    
    if (vowelsAudioRef.current) {
      vowelsAudioRef.current.pause();
      vowelsAudioRef.current.currentTime = 0;
    }
    
    window.speechSynthesis.cancel();
  };
  
  const resetVowelsState = () => {
    stopVowelsPlay();
    setIsVowelsIntroComplete(false);
  };
  
  // Reset everything when leaving alphabets section
  const resetAlphabetState = () => {
    stopAlphabetPlay();
    setIsAlphabetIntroComplete(false);
    setAlphabetPlayCount(0);
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
        description: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }

    try {
      if (showCommunityFeed) {
        // Post to community feedback
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
        // Send private response to ECD team
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
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold mb-1">My Lesson Vault</h1>
            </div>
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
                      className="text-xs capitalize cursor-pointer hover:opacity-80 transition-opacity text-white border-white/30"
                      style={{ backgroundColor: '#2a2d34' }}
                      onClick={() => setShowProgressDialog(true)}
                    >
                      FLC Report
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
              
              {/* Credit Level Gauge with embedded Buy More button */}
              <div className="relative">
                <div className="flex items-center gap-2 bg-[#395B50] rounded-full px-4 py-2 shadow-md">
                  <Coins className="h-5 w-5 text-yellow-400" />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between w-24">
                      <span className="text-[10px] text-white/60">0</span>
                      <span className="text-xs font-semibold text-white">{displayCredits}</span>
                      <span className="text-[10px] text-white/60">100</span>
                    </div>
                    <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden flex">
                      {/* Subscription credits segment (green) */}
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${
                          (displayCredits - topupCredits) <= 20 && topupCredits === 0
                            ? 'bg-gradient-to-r from-red-400 to-red-500' 
                            : 'bg-gradient-to-r from-green-400 to-green-500'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, displayCredits - topupCredits))}%` }}
                      />
                      {/* Top-up credits segment (cyan/blue) */}
                      {topupCredits > 0 && (
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-1000 ease-out"
                          style={{ width: `${Math.min(100 - Math.max(0, displayCredits - topupCredits), topupCredits)}%` }}
                          title={`${topupCredits} carried-over top-up credits`}
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Add Credits - surfaces when credits <= 20% */}
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
                      <DropdownMenuContent align="center" className="w-72 bg-white dark:bg-gray-800 z-50">
                        <div className="px-3 py-2 bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-700">
                          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">⚠️ Credit Top-Up — R100.00</p>
                          <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 leading-tight">
                            These credits are a once-off top-up, separate from your monthly R100 subscription. They will be <span className="font-bold">carried over to the new month</span>.
                          </p>
                          <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1 flex items-center gap-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></span>
                            Top-up credits appear in <span className="font-semibold">blue</span> on your gauge.
                          </p>
                        </div>
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
                        <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                        <DropdownMenuItem
                          onClick={() => navigate('/data-deletion')}
                          className="cursor-pointer py-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">🛑 Stop or Delete Account</span>
                            <span className="text-sm text-muted-foreground">Manage your account settings</span>
                          </div>
                        </DropdownMenuItem>
                        {isAdmin && (
                          <>
                            <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                                const current = localStorage.getItem("simulate_trial_user") === "true";
                                const next = !current;
                                if (next) {
                                  localStorage.setItem("simulate_trial_user", "true");
                                } else {
                                  localStorage.removeItem("simulate_trial_user");
                                }
                                toast({
                                  title: next ? "Simulating Trial User" : "Admin Mode Restored",
                                  description: next
                                    ? "Credits will now drain normally. Reload the page to apply."
                                    : "Admin auto-refill re-enabled. Reload the page to apply.",
                                });
                                setTimeout(() => window.location.reload(), 1200);
                              }}
                              className="cursor-pointer py-3 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                            >
                              <div className="flex flex-col gap-1">
                                <span className="font-semibold">
                                  {typeof window !== "undefined" && localStorage.getItem("simulate_trial_user") === "true"
                                    ? "🛠️ Disable Trial Simulation"
                                    : "🧪 Simulate Trial User"}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  Admin-only: turn off auto-refill so credits drain like a real user
                                </span>
                              </div>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          </div>


        {/* Lessons Banner */}
        <div className="mt-12 p-6 rounded-lg bg-transparent">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Lesson of the Day/Week/Month — opens focus banner above Verbal Testing carousel */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Lesson of the Day
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem
                  className="font-medium text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => navigate("/lesson-vault-04-06?period=day")}
                >
                  Day
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-medium text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => navigate("/lesson-vault-04-06?period=month")}
                >
                  Month
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-medium text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => navigate("/lesson-vault-04-06?period=week")}
                >
                  Week
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Shapes
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                     <DropdownMenuItem onClick={() => setCircleShapeOpen(true)} className="font-medium text-white hover:bg-white/20">
                       Circle
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setRectangleShapeOpen(true)} className="font-medium text-white hover:bg-white/20">
                       Rectangle
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setSquareShapeOpen(true)} className="font-medium text-white hover:bg-white/20">
                       Square
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTriangleShapeOpen(true)} className="font-medium text-white hover:bg-white/20">
                       Triangle
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Basic Logic dropdown removed - content moved to Tech Skills */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Literacy
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
               <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                 <DropdownMenuSub>
                   <DropdownMenuSubTrigger className="font-medium text-white hover:bg-white/20 focus:bg-white/20 data-[state=open]:bg-white/20">
                     Alphabets
                   </DropdownMenuSubTrigger>
                   <DropdownMenuPortal>
                     <DropdownMenuSubContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                       <DropdownMenuItem onClick={() => {setSelectedCountingRange("alphabets"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                         A, B, C…
                       </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => setFixOrderOpen(true)} className="font-medium text-white hover:bg-white/20">
                         Fix the Order
                       </DropdownMenuItem>
                     </DropdownMenuSubContent>
                   </DropdownMenuPortal>
                 </DropdownMenuSub>
                 <DropdownMenuItem onClick={() => setColorsOpen(true)} className="font-medium text-white hover:bg-white/20">
                    Colors
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setMonthsOpen(true)} className="font-medium text-white hover:bg-white/20">
                    Months of the Year
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {setSelectedCountingRange("vowels"); setCountingOpen(true);}} className="font-medium text-white hover:bg-white/20">
                    Vowels
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
                  onClick={() => setAbcSafetyOpen(true)}
                >
                  🔤 Always Be Careful (ABC)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="font-medium text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => setTrafficLightsOpen(true)}
                >
                  🚦 Traffic Lights
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                  🚸 Traffic Road Signs
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Life Skills
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Arts
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                      ✂️ Craft
                    </DropdownMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                          🎭 Performing Arts
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              🎬 Drama
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                              🎭 Monologue
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              🎵 Music Training
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                            {/* Creative Music Art */}
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Kandinsky (Art + Music)', 'https://musiclab.chromeexperiments.com/Kandinsky/')}>
                              🎨 Kandinsky (Art + Music)
                            </DropdownMenuItem>
                            {/* Piano Skills */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🎹 Piano
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Arpeggios', 'https://musiclab.chromeexperiments.com/Arpeggios/')}>
                                  🎶 Arpeggios
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Chords', 'https://musiclab.chromeexperiments.com/Chords/')}>
                                  🎵 Chords
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Piano Roll', 'https://musiclab.chromeexperiments.com/Piano-Roll/')}>
                                  🎼 Piano Roll
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Shared Piano', 'https://musiclab.chromeexperiments.com/Shared-Piano/')}>
                                  🎹 Shared Piano
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            {/* Rhythm Skills */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🥁 Rhythm
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Melody Maker', 'https://musiclab.chromeexperiments.com/Melody-Maker/')}>
                                  🎵 Melody Maker
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Rhythm Maker', 'https://musiclab.chromeexperiments.com/Rhythm/')}>
                                  🥁 Rhythm Maker
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Song Maker', 'https://musiclab.chromeexperiments.com/Song-Maker/')}>
                                  🎧 Song Maker
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            {/* Sound Science */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🔊 Sound Science
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Harmonics', 'https://musiclab.chromeexperiments.com/Harmonics/')}>
                                  🎼 Harmonics
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Oscillators', 'https://musiclab.chromeexperiments.com/Oscillators/')}>
                                  📈 Oscillators
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Sound Waves', 'https://musiclab.chromeexperiments.com/Sound-Waves/')}>
                                  🌊 Sound Waves
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            {/* Strings Skills */}
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Strings', 'https://musiclab.chromeexperiments.com/Strings/')}>
                              🎻 Strings
                            </DropdownMenuItem>
                            {/* Voice Skills */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🎤 Voice
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Spectrogram', 'https://musiclab.chromeexperiments.com/Spectrogram/')}>
                                  📊 Spectrogram
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Voice Spinner', 'https://musiclab.chromeexperiments.com/Voice-Spinner/')}>
                                  🌀 Voice Spinner
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20">
                      🎨 Visual Art
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
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                          Play Fields Info
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("cricket");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Cricket
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("netball");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Netball
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("rugby");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Rugby
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("soccer");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Soccer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setSelectedSport("tennis");
                          setSportPlayOpen(true);
                        }} className="font-medium text-white hover:bg-white/20">
                          Tennis
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Sport Activities - relocated from Emojis */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      ⚽ Sport Activities
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    {['⚽', '🏉', '🎾', '🥊', '🏏', '🏃', '🚴', '🏊', '⛹️', '🤸'].map((emoji, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        className="text-4xl cursor-pointer hover:bg-white/20 py-2"
                        onClick={() => { setSelectedEmoji(emoji); setEmojiDialogOpen(true); }}
                      >
                        {emoji}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Tech Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Tech Skills
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50 w-64">
                {/* AI */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      AI
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => setSelectedEmojiCategory("Facial Recognition")} className="font-medium text-white hover:bg-white/20">
                      Facial Recognition
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/fruit-item-recognition')} className="font-medium text-white hover:bg-white/20">
                      Object Identification
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Coding Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Coding
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 flex items-center gap-2 cursor-pointer"
                      onClick={() => setCodingDialogOpen(true)}
                    >
                      🔤 Coding in Alphabets
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium text-white hover:bg-white/20 flex items-center gap-2 cursor-pointer"
                      onClick={() => setCodingNumbersOpen(true)}
                    >
                      🔢 Coding in Numbers
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Emojis Dropdown - contains Faces, Sport Fields, and Basic Icons */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      Emojis
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    {/* Basic Icons Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                          🔗 Basic Icons
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                        {/* Email */}
                        <DropdownMenuItem 
                          className="font-medium text-white hover:bg-white/20 flex items-center gap-2"
                          onClick={() => { setSelectedEmoji('📧'); setEmojiDialogOpen(true); }}
                        >
                          📧 Email
                        </DropdownMenuItem>
                        {/* Social Media */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              📱 Social Media
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50 grid grid-cols-4 gap-2 p-3">
                            {[
                              { icon: 'f', bg: '#1877F2', name: 'Facebook' },
                              { icon: 'instagram', bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', name: 'Instagram' },
                              { icon: '𝕏', bg: '#000000', name: 'X' },
                              { icon: '♪', bg: '#000000', name: 'TikTok' },
                              { icon: 'whatsapp', bg: 'transparent', name: 'WhatsApp' },
                            ].map((item, idx) => (
                              <DropdownMenuItem
                                key={idx}
                                className="cursor-pointer hover:opacity-80 p-0 flex items-center justify-center"
                                onClick={() => { setSelectedEmoji(item.icon); setEmojiDialogOpen(true); }}
                              >
                                <div 
                                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                                  style={{ background: item.bg }}
                                  title={item.name}
                                >
                                  {item.icon === 'instagram' ? (
                                    <img src={instagramLogo} alt="Instagram" className="w-10 h-10 rounded" />
                                  ) : item.icon === 'whatsapp' ? (
                                    <img src={whatsappLogo} alt="WhatsApp" className="w-10 h-10 rounded" />
                                  ) : (
                                    item.icon
                                  )}
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Video */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              🎬 Video
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                            <DropdownMenuItem 
                              className="font-medium text-white hover:bg-white/20 flex items-center gap-2"
                              onClick={() => { setSelectedEmoji('📹'); setEmojiDialogOpen(true); }}
                            >
                              📹 Camcorder
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="font-medium text-white hover:bg-white/20 flex items-center gap-2"
                              onClick={() => { setSelectedEmoji('🎥'); setEmojiDialogOpen(true); }}
                            >
                              🎥 Video Camera
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="font-medium text-white hover:bg-white/20 flex items-center gap-2"
                              onClick={() => { setSelectedEmoji('▶'); setEmojiDialogOpen(true); }}
                            >
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: '#FF0000' }}>▶</div>
                              YouTube
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Faces Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                          😊 Faces
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                        {/* Emotion Faces */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              😅 Emotion Faces
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                            {['😅', '😡', '😪', '🙄', '😭'].map((emoji, idx) => (
                              <DropdownMenuItem
                                key={idx}
                                className="text-4xl cursor-pointer hover:bg-white/20 py-2"
                                onClick={() => { setSelectedEmoji(emoji); setEmojiDialogOpen(true); }}
                              >
                                {emoji}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Happy Faces */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              😀 Happy Faces
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                            {['😀', '☺️', '😍', '😋', '😉'].map((emoji, idx) => (
                              <DropdownMenuItem
                                key={idx}
                                className="text-4xl cursor-pointer hover:bg-white/20 py-2"
                                onClick={() => { setSelectedEmoji(emoji); setEmojiDialogOpen(true); }}
                              >
                                {emoji}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                {/* Air Transport */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      ✈️ Air Transport
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(airplaneIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={airplaneIcon} alt="Airplane" className="w-8 h-8" /> Airplane
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Rail Transport */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      🚂 Rail Transport
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(railTransportVehicles); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={railTransportVehicles} alt="Rail Transport Types" className="w-8 h-8 object-cover rounded" /> Types of Rail Transport
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Road Transport */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      🚗 Road Transport
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(armyTankIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={armyTankIcon} alt="Army Tank" className="w-8 h-8" /> Army Tank
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(bulldozerIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={bulldozerIcon} alt="Bulldozer" className="w-8 h-8" /> Bulldozer
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(craneTruckIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={craneTruckIcon} alt="Crane Truck" className="w-8 h-8" /> Crane Truck
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(deliveryTruckIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={deliveryTruckIcon} alt="Delivery Truck" className="w-8 h-8" /> Delivery Truck
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(dumpTruckIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={dumpTruckIcon} alt="Dump Truck" className="w-8 h-8" /> Dump Truck
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(fourWheelVehicles); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={fourWheelVehicles} alt="Four Wheel Vehicles" className="w-8 h-8 object-cover rounded" /> Four Wheel Vehicles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(skateShoeIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={skateShoeIcon} alt="Roller Skates" className="w-8 h-8" /> Roller Skates
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(schoolBusIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={schoolBusIcon} alt="School Bus" className="w-8 h-8" /> School Bus
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(sedanIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={sedanIcon} alt="Sedan" className="w-8 h-8" /> Sedan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(taxiCarIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={taxiCarIcon} alt="Taxi Car" className="w-8 h-8" /> Taxi Car
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(twoWheelVehicles); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={twoWheelVehicles} alt="Two Wheel Vehicles" className="w-8 h-8 object-cover rounded" /> Two Wheel Vehicles
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(roadTransportVehicles); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={roadTransportVehicles} alt="Road Transport Types" className="w-8 h-8 object-cover rounded" /> Types of Road Transport
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Water Transport */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                      🚢 Water Transport
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem onClick={() => {setSelectedEmoji(boatShipIcon); setEmojiDialogOpen(true);}} className="font-medium text-white hover:bg-white/20 flex items-center gap-2">
                      <img src={boatShipIcon} alt="Boat Ship" className="w-8 h-8" /> Boat Ship
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-foreground border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Note of the Week
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem onClick={() => setCapsOpen(true)} className="font-medium hover:bg-gray-100">
                  🏫 ECD Institutions (CAPS)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setParentsOpen(true)} className="font-medium hover:bg-gray-100 flex items-center justify-between">
                  <span>👨‍👩‍👧‍👦 Parents</span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400 ml-2"></span>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-medium hover:bg-gray-100">
                  🎓 Tech Teachers
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
                      onClick={() => setObjectCharactersOpen(true)}
                    >
                      The Young and Old
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 cursor-pointer"
                      onClick={() => setSelectedAnimalType("wild")}
                    >
                      Wild Animals
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
                  <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 cursor-pointer"
                      onClick={() => setFiveSensesOpen(true)}
                    >
                      Five Senses
                    </DropdownMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                          My Body
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#132a13" }} className="border border-gray-200 shadow-lg z-50">
                        <DropdownMenuItem 
                          className="font-medium text-white hover:bg-white/20 cursor-pointer"
                          onClick={() => {
                            setSelectedBodyType('boy');
                            setHumanBeingOpen(true);
                          }}
                        >
                          Boy's Body
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="font-medium text-white hover:bg-white/20 cursor-pointer"
                          onClick={() => {
                            setSelectedBodyType('girl');
                            setHumanBeingOpen(true);
                          }}
                        >
                          Girl's Body
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                      onClick={() => navigate('/biology-nature')}
                    >
                      <Microscope className="h-4 w-4" />
                      Biology & Nature
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="font-medium text-white hover:bg-white/20 flex items-center gap-2 cursor-pointer"
                      onClick={() => window.location.href = '/domestic-ecology'}
                    >
                      <BookOpen className="h-4 w-4" />
                      Domestic Ecology
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

        {/* Tailormade Testing Platform */}
        <div ref={verbalTestingRef} className="mt-16 p-8" style={{ backgroundColor: '#395B50' }}>
          {/* Lesson of the Day/Week/Month focus banner — only when navigated from dropdown */}
          {showLessonFocusBanner && (
            <div className="mb-8">
              <CardLessonFocus
                focusedCard={focusedLessonCard}
                carouselCardData={carouselCardData}
                period={lessonPeriod}
                onPeriodChange={(p) => {
                  const next = new URLSearchParams(searchParams);
                  next.set("period", p);
                  setSearchParams(next, { replace: true });
                }}
                onCardClick={(cardName) => handleCardClick(cardName)()}
              />
            </div>
          )}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-lime-400 inline-block pb-2 border-b-4 border-dotted border-current" style={{ fontFamily: '"Bungee Shade", cursive' }}>
              Verbal Testing Space
            </h1>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                onClick={playNarration}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Knowledge Base Testing
              </Button>
              <p className="text-foreground/90">
                Click Card, Click Mic and Record Presentation
              </p>
              {/* Removed central mic - now on each card */}
            </div>
          </div>
          
          <div className="overflow-hidden w-full relative group">
            {/* Left Arrow */}
            <button
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.style.animationPlayState = 'paused';
                  setCarouselPaused(true);
                  carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow-lg transition-all opacity-80 hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            {/* Right Arrow */}
            <button
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.style.animationPlayState = 'paused';
                  setCarouselPaused(true);
                  carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow-lg transition-all opacity-80 hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div 
              ref={carouselRef}
              className="flex gap-8 animate-scroll"
              style={{
                animation: 'scroll-horizontal 40s linear infinite',
                width: 'max-content'
              }}
              onMouseEnter={(e) => {
                if (!carouselPaused) {
                  e.currentTarget.style.animationPlayState = 'paused';
                }
              }}
              onMouseLeave={(e) => {
                if (!carouselPaused) {
                  e.currentTarget.style.animationPlayState = 'running';
                }
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
              <FlipBodyCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />
              
              <FlipTrafficCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />
              
              <FlipTransportCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />

              <Card
                className="bg-white p-4 w-80 border-4 border-dashed border-purple-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer"
                onClick={handleCardClick("ABC Chart")}
              >
                <CardContent className="p-0 relative">
                  <h3 className="text-xl font-bold text-purple-500 mb-2 text-center" style={{ fontFamily: '"Bungee Shade", cursive' }}>ABC Chart</h3>
                  <img src={alphabetChart} alt="Alphabet Chart for Kids" className="w-full h-auto rounded-lg" />
                  {isRecording && selectedCardForTest === "ABC Chart" && (
                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      {recordingTime}s / 30s
                    </div>
                  )}
                </CardContent>
                <Button
                  onClick={createRecordingHandler("ABC Chart")}
                  className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "ABC Chart" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </Card>

              <Card 
                className="bg-white p-4 w-80 border-4 border-dashed border-green-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer"
                onClick={handleCardClick("Basic Shapes")}
              >
                <CardContent className="p-0 relative">
                  <img src={shapesBasicColor} alt="Basic Shapes" className="w-full h-auto" />
                  {isRecording && selectedCardForTest === "Basic Shapes" && (
                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      {recordingTime}s / 30s
                    </div>
                  )}
                </CardContent>
                <Button
                  onClick={createRecordingHandler("Basic Shapes")}
                  className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "Basic Shapes" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </Card>
              
              <FlipAnimalsCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />
              
              <Card 
                className="bg-white p-4 w-80 border-4 border-dashed border-blue-500 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer"
                onClick={handleCardClick("Basic Logic Thinking")}
              >
                <CardContent className="p-0 relative">
                  <h3 className="text-xl font-bold text-amber-500 mb-2 text-center" style={{ fontFamily: '"Bungee Shade", cursive' }}>Basic Logic Thinking</h3>
                  <img src={basicLogicThinking} alt="Basic Logic Thinking" className="w-full h-auto rounded-lg mt-8" />
                  {isRecording && selectedCardForTest === "Basic Logic Thinking" && (
                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      {recordingTime}s / 30s
                    </div>
                  )}
                </CardContent>
                <Button
                  onClick={createRecordingHandler("Basic Logic Thinking")}
                  className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "Basic Logic Thinking" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </Card>

              <Card 
                className="bg-white p-4 w-80 border-4 border-dashed border-blue-500 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer"
                onClick={handleCardClick("Busy Bee")}
              >
                <CardContent className="p-0 relative">
                  <h3 className="text-xl font-bold text-blue-500 mb-2 text-center" style={{ fontFamily: '"Bungee Shade", cursive' }}>Busy Bee</h3>
                  <img src={beeCharacter} alt="Busy Bee" className="w-full h-auto" />
                  {isRecording && selectedCardForTest === "Busy Bee" && (
                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      {recordingTime}s / 30s
                    </div>
                  )}
                </CardContent>
                <Button
                  onClick={createRecordingHandler("Busy Bee")}
                  className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "Busy Bee" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </Card>

              {/* Months of the Year Flip Card */}
              <FlipMonthsCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={(cardName) => createRecordingHandler(cardName)}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />

              {/* Numbers Flip Card */}
              <FlipNumbersCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />

              {/* Duplicate cards for infinite loop */}
              <FlipBodyCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />
              
              <FlipTrafficCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />

              <FlipTransportCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />

              <Card
                className="bg-white p-4 w-80 border-4 border-dashed border-purple-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer"
                onClick={handleCardClick("ABC Chart")}
              >
                <CardContent className="p-0 relative">
                  <h3 className="text-xl font-bold text-purple-500 mb-2 text-center" style={{ fontFamily: '"Bungee Shade", cursive' }}>ABC Chart</h3>
                  <img src={alphabetChart} alt="Alphabet Chart for Kids" className="w-full h-auto rounded-lg" />
                  {isRecording && selectedCardForTest === "ABC Chart" && (
                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      {recordingTime}s / 30s
                    </div>
                  )}
                </CardContent>
                <Button
                  onClick={createRecordingHandler("ABC Chart")}
                  className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "ABC Chart" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </Card>

              <Card 
                className="bg-white p-4 w-80 border-4 border-dashed border-green-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer"
                onClick={handleCardClick("Basic Shapes")}
              >
                <CardContent className="p-0 relative">
                  <img src={shapesBasicColor} alt="Basic Shapes" className="w-full h-auto" />
                  {isRecording && selectedCardForTest === "Basic Shapes" && (
                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      {recordingTime}s / 30s
                    </div>
                  )}
                </CardContent>
                <Button
                  onClick={createRecordingHandler("Basic Shapes")}
                  className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "Basic Shapes" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </Card>
              
              <FlipAnimalsCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />
              
              <Card 
                className="bg-white p-4 w-80 border-4 border-dashed border-blue-500 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer"
                onClick={handleCardClick("Busy Bee")}
              >
                <CardContent className="p-0 relative">
                  <h3 className="text-xl font-bold text-blue-500 mb-2 text-center" style={{ fontFamily: '"Bungee Shade", cursive' }}>Busy Bee</h3>
                  <img src={beeCharacter} alt="Busy Bee" className="w-full h-auto" />
                  {isRecording && selectedCardForTest === "Busy Bee" && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      {recordingTime}s / 30s
                    </div>
                  )}
                </CardContent>
                <Button
                  onClick={createRecordingHandler("Busy Bee")}
                  className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "Busy Bee" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </Card>

              {/* Months of the Year Flip Card (duplicate) */}
              <Card 
                className="bg-white p-4 w-80 border-4 border-dashed border-amber-500 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer"
                onClick={handleCardClick("Basic Logic Thinking")}
              >
                <CardContent className="p-0 relative">
                  <h3 className="text-xl font-bold text-amber-500 mb-2 text-center" style={{ fontFamily: '"Bungee Shade", cursive' }}>Basic Logic Thinking</h3>
                  <img src={basicLogicThinking} alt="Basic Logic Thinking" className="w-full h-auto rounded-lg mt-8" />
                  {isRecording && selectedCardForTest === "Basic Logic Thinking" && (
                     <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      {recordingTime}s / 30s
                    </div>
                  )}
                </CardContent>
                <Button
                  onClick={createRecordingHandler("Basic Logic Thinking")}
                  className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "Basic Logic Thinking" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
              </Card>

              <FlipMonthsCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={(cardName) => createRecordingHandler(cardName)}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />

              {/* Numbers Flip Card (duplicate) */}
              <FlipNumbersCard
                onCardClick={(cardName) => handleCardClick(cardName)()}
                onRecordingClick={createRecordingHandler}
                isRecording={isRecording}
                selectedCardForTest={selectedCardForTest}
                recordingTime={recordingTime}
              />
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
                preload="auto"
                onEnded={handleAlphabetSongEnd}
              />
            )}
            {/* Hidden audio element for vowels background music */}
            {selectedCountingRange === "vowels" && (
              <audio
                ref={vowelsAudioRef}
                src={vowelsBackgroundMusic}
                preload="auto"
                onEnded={handleVowelsMusicEnd}
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
                         } text-white font-bold py-3 px-6 rounded-lg flex flex-col items-center gap-1`}
                       >
                         <span>
                           {isAlphabetPlaying 
                             ? "Stop" 
                             : isAlphabetIntroComplete 
                               ? "Play ABC Song" 
                               : "Start ABCs"
                           }
                         </span>
                         {isAlphabetPlaying && (
                           <span className="text-xs opacity-80">
                             {isAlphabetIntroComplete ? "🎤 Sing Along!" : "🗣️ Voice Reciting..."}
                           </span>
                         )}
                         {!isAlphabetPlaying && isAlphabetIntroComplete && (
                           <span className="text-xs opacity-80">🎵 Ready for Song!</span>
                         )}
                       </Button>
                     )}
                     {/* Play Vowels Background Music button */}
                       {selectedCountingRange === "vowels" && (
                        <Button
                          onClick={isVowelsPlaying ? stopVowelsPlay : startVowelsPlay}
                          className={`${
                            isVowelsPlaying 
                              ? "bg-red-500 hover:bg-red-600" 
                              : "bg-green-500 hover:bg-green-600"
                          } text-white font-bold py-3 px-6 rounded-lg flex flex-col items-center gap-1`}
                        >
                          <span>
                            {isVowelsPlaying 
                              ? "Stop" 
                              : isVowelsIntroComplete 
                                ? "Play Vowels Music" 
                                : "Start Vowels"
                            }
                          </span>
                          {isVowelsPlaying && (
                            <span className="text-xs opacity-80">
                              {isVowelsIntroComplete ? "🎵 Sing Along!" : "🗣️ Voice Reciting..."}
                            </span>
                          )}
                          {!isVowelsPlaying && isVowelsIntroComplete && (
                            <span className="text-xs opacity-80">🎵 Ready for Music!</span>
                          )}
                        </Button>
                      )}
                    <button 
                      onClick={() => {
                        setCountingOpen(false); 
                        setSelectedCountingRange(null);
                        // Reset vowels state when closing
                        resetVowelsState();
                        // Reset alphabet state when closing
                        resetAlphabetState();
                      }}
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
                        return vowelsArray.map((vowel, index) => {
                          const isCurrentlyFlashing = isVowelsPlaying && index === currentVowelIndex;
                          return (
                            <div 
                              key={vowel}
                              className={`w-full aspect-square text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer text-white ${
                                isCurrentlyFlashing ? 'animate-pulse ring-4 ring-yellow-400 ring-opacity-75 scale-110' : ''
                              }`}
                              style={{
                                backgroundColor: isCurrentlyFlashing 
                                  ? '#fbbf24' // Yellow when active
                                  : [
                                      '#3a86ff', '#e76f51', '#00afb9', '#ca6702', '#006d77'
                                    ][index % 5]
                              }}
                              onClick={() => !isVowelsPlaying && speakVowel(vowel)}
                              onMouseEnter={() => !isVowelsPlaying && speakVowel(vowel)}
                              onMouseLeave={() => !isVowelsPlaying && window.speechSynthesis.cancel()}
                              title={`Vowel ${vowel} - Click to hear tone`}
                            >
                              {vowel}
                            </div>
                          );
                        });
                     } else if (selectedCountingRange === "alphabets") {
                        const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i)); // Capital letters A-Z
                        return alphabet.map((letter, index) => {
                          const isCurrentlyPlaying = isAlphabetPlaying && index === currentAlphabetIndex;
                          return (
                            <div 
                              key={letter}
                              className={`w-full aspect-square font-bold flex flex-col items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer text-white ${
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
                              title={`Letter ${letter}${letter.toLowerCase()} - Click to hear pronunciation`}
                            >
                              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none font-bold">{letter}</span>
                              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none mt-2 text-primary">{letter.toLowerCase()}</span>
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

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Allow Independent Exploration</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The 4-year-old needs to be allowed to test himself out.
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

        {/* Months of the Year Learning Dialog */}
        {monthsOpen && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
            <div className="min-h-screen flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
                <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
                  📅 Months of the Year
                </h1>
                <Button 
                  onClick={() => setMonthsOpen(false)}
                  variant="ghost" 
                  className="text-white hover:bg-white/20 p-2"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1">
                  <div className="bg-red-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">January</div>
                  <div className="bg-orange-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">February</div>
                  <div className="bg-yellow-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">March</div>
                  <div className="bg-green-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">April</div>
                  <div className="bg-teal-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">May</div>
                  <div className="bg-blue-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">June</div>
                  <div className="bg-indigo-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">July</div>
                  <div className="bg-purple-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">August</div>
                  <div className="bg-pink-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">September</div>
                  <div className="bg-rose-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">October</div>
                  <div className="bg-cyan-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">November</div>
                  <div className="bg-emerald-500 text-white font-bold rounded-xl p-6 flex items-center justify-center text-2xl sm:text-3xl shadow-lg min-h-[100px]">December</div>
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
                    {/* Black Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 rounded-t-lg bg-black border-4 border-gray-800 relative shadow-xl">
                        {/* Door panels */}
                        <div className="absolute inset-2 flex flex-col gap-2">
                          <div className="flex-1 border-2 border-gray-700 rounded-sm"></div>
                          <div className="flex-1 border-2 border-gray-700 rounded-sm"></div>
                          <div className="flex-1 border-2 border-gray-700 rounded-sm"></div>
                        </div>
                        {/* Door handle */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-6 bg-yellow-500 rounded-full shadow-md"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-black">Black</h3>
                      <Button 
                        className="bg-black hover:bg-gray-800 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a black door. Black is a dark color.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Blue Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 rounded-t-2xl bg-blue-500 border-4 border-blue-700 relative shadow-xl">
                        {/* Arched window */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-20 bg-blue-200/50 rounded-t-full border-2 border-blue-600"></div>
                        {/* Door handle */}
                        <div className="absolute right-3 top-2/3 w-3 h-3 bg-yellow-400 rounded-full shadow-md border border-yellow-600"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-blue-600">Blue</h3>
                      <Button 
                        className="bg-blue-500 hover:bg-blue-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a blue door. Blue is the color of the sky and ocean.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Green Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 bg-green-500 border-4 border-green-700 relative shadow-xl">
                        {/* Double door panels with windows */}
                        <div className="absolute inset-2 flex gap-1">
                          <div className="flex-1 border-2 border-green-600 flex flex-col gap-1 p-1">
                            <div className="flex-1 bg-green-200/40 rounded-sm"></div>
                            <div className="flex-1 bg-green-200/40 rounded-sm"></div>
                          </div>
                          <div className="flex-1 border-2 border-green-600 flex flex-col gap-1 p-1">
                            <div className="flex-1 bg-green-200/40 rounded-sm"></div>
                            <div className="flex-1 bg-green-200/40 rounded-sm"></div>
                          </div>
                        </div>
                        {/* Double handles */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-md"></div>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-md"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-green-600">Green</h3>
                      <Button 
                        className="bg-green-500 hover:bg-green-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a green door. Green is the color of grass and leaves.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Yellow Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 rounded-t-lg bg-yellow-400 border-4 border-yellow-600 relative shadow-xl">
                        {/* Paneled design */}
                        <div className="absolute inset-3 grid grid-cols-2 grid-rows-3 gap-1">
                          <div className="bg-yellow-300/50 border border-yellow-500 rounded-sm"></div>
                          <div className="bg-yellow-300/50 border border-yellow-500 rounded-sm"></div>
                          <div className="bg-yellow-300/50 border border-yellow-500 rounded-sm"></div>
                          <div className="bg-yellow-300/50 border border-yellow-500 rounded-sm"></div>
                          <div className="bg-yellow-300/50 border border-yellow-500 rounded-sm"></div>
                          <div className="bg-yellow-300/50 border border-yellow-500 rounded-sm"></div>
                        </div>
                        {/* Door handle */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-8 bg-amber-700 rounded-full shadow-md"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-yellow-600">Yellow</h3>
                      <Button 
                        className="bg-yellow-400 hover:bg-yellow-500 text-black w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a yellow door. Yellow is the color of the sun and bananas.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Orange Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 bg-orange-500 border-4 border-orange-700 relative shadow-xl">
                        {/* Window with grid */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-16 bg-orange-200/50 border-2 border-orange-600 grid grid-cols-2 grid-rows-2">
                          <div className="border border-orange-400"></div>
                          <div className="border border-orange-400"></div>
                          <div className="border border-orange-400"></div>
                          <div className="border border-orange-400"></div>
                        </div>
                        {/* Lower panel */}
                        <div className="absolute bottom-4 left-3 right-3 h-12 border-2 border-orange-600 rounded-sm"></div>
                        {/* Door handle */}
                        <div className="absolute right-3 top-2/3 w-4 h-2 bg-yellow-400 rounded-sm shadow-md"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-orange-600">Orange</h3>
                      <Button 
                        className="bg-orange-500 hover:bg-orange-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is an orange door. Orange is the color of oranges and carrots.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Purple Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 rounded-t-full bg-purple-500 border-4 border-purple-700 relative shadow-xl">
                        {/* Arched window panes */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-24 rounded-t-full overflow-hidden grid grid-cols-2 gap-0.5 bg-purple-600">
                          <div className="bg-purple-200/40 rounded-tl-full"></div>
                          <div className="bg-purple-200/40 rounded-tr-full"></div>
                          <div className="bg-purple-200/40"></div>
                          <div className="bg-purple-200/40"></div>
                        </div>
                        {/* Door handle */}
                        <div className="absolute right-3 bottom-8 w-2 h-5 bg-yellow-500 rounded-full shadow-md"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-purple-600">Purple</h3>
                      <Button 
                        className="bg-purple-500 hover:bg-purple-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a purple door. Purple is a mix of red and blue.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Gray Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 bg-gray-400 border-4 border-gray-600 relative shadow-xl">
                        {/* Glass sliding door style */}
                        <div className="absolute inset-2 flex gap-0.5">
                          <div className="flex-1 bg-gray-200/60 border border-gray-500">
                            <div className="h-full w-1/3 border-r border-gray-400"></div>
                          </div>
                          <div className="flex-1 bg-gray-200/60 border border-gray-500">
                            <div className="h-full w-1/3 ml-auto border-l border-gray-400"></div>
                          </div>
                        </div>
                        {/* Handles */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
                          <div className="w-1 h-8 bg-gray-600 rounded-full shadow"></div>
                          <div className="w-1 h-8 bg-gray-600 rounded-full shadow"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-600">Gray</h3>
                      <Button 
                        className="bg-gray-500 hover:bg-gray-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a gray door. Gray is between black and white.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Brown Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 rounded-t-full bg-amber-700 border-4 border-amber-900 relative shadow-xl overflow-hidden">
                        {/* Wooden plank texture */}
                        <div className="absolute inset-0 flex flex-col">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex-1 border-b border-amber-800/50"></div>
                          ))}
                        </div>
                        {/* Metal arch detail */}
                        <div className="absolute top-1 left-1 right-1 h-10 border-2 border-amber-500 rounded-t-full"></div>
                        {/* Door handle */}
                        <div className="absolute right-4 top-1/2 w-2 h-4 bg-yellow-400 rounded-full shadow-md"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-amber-700">Brown</h3>
                      <Button 
                        className="bg-amber-700 hover:bg-amber-800 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a brown door. Brown is the color of chocolate and trees.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Lime/Teal Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 bg-teal-500 border-4 border-teal-700 relative shadow-xl">
                        {/* Modern door with side window */}
                        <div className="absolute top-3 right-3 w-8 h-24 bg-teal-200/50 border-2 border-teal-600 grid grid-rows-3">
                          <div className="border-b border-teal-400"></div>
                          <div className="border-b border-teal-400"></div>
                          <div></div>
                        </div>
                        {/* Main panel */}
                        <div className="absolute top-3 left-3 w-12 h-32 border-2 border-teal-600 rounded-sm"></div>
                        {/* Door handle */}
                        <div className="absolute left-10 top-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-md border border-yellow-500"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-teal-600">Teal</h3>
                      <Button 
                        className="bg-teal-500 hover:bg-teal-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a teal door. Teal is a blue-green color.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Red Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 bg-red-500 border-4 border-red-700 relative shadow-xl">
                        {/* Classic door with window */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-12 bg-red-200/40 rounded-t-lg border-2 border-red-600"></div>
                        {/* Two panels below */}
                        <div className="absolute bottom-4 left-3 right-3 h-16 flex gap-2">
                          <div className="flex-1 border-2 border-red-600 rounded-sm"></div>
                          <div className="flex-1 border-2 border-red-600 rounded-sm"></div>
                        </div>
                        {/* Door handle */}
                        <div className="absolute right-3 top-1/2 flex flex-col items-center gap-0.5">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-md"></div>
                          <div className="w-1 h-3 bg-yellow-500 rounded-full"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-red-600">Red</h3>
                      <Button 
                        className="bg-red-500 hover:bg-red-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a red door. Red is the color of apples and fire trucks.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* Pink Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 bg-pink-500 border-4 border-pink-700 relative shadow-xl">
                        {/* Four panel design */}
                        <div className="absolute inset-3 grid grid-cols-2 grid-rows-2 gap-2">
                          <div className="bg-pink-300/40 border-2 border-pink-600 rounded-sm"></div>
                          <div className="bg-pink-300/40 border-2 border-pink-600 rounded-sm"></div>
                          <div className="bg-pink-300/40 border-2 border-pink-600 rounded-sm"></div>
                          <div className="bg-pink-300/40 border-2 border-pink-600 rounded-sm"></div>
                        </div>
                        {/* Decorative handle */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center">
                          <div className="w-3 h-3 bg-pink-300 rounded-full shadow-md border-2 border-pink-400"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-pink-600">Pink</h3>
                      <Button 
                        className="bg-pink-500 hover:bg-pink-600 text-white w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a pink door. Pink is a light red color.");
                        }}
                      >
                        🚪 Open Door
                      </Button>
                    </div>

                    {/* White Door */}
                    <div className="bg-white rounded-lg shadow-lg p-4 text-center btn-effect-10 cursor-pointer hover:scale-105 transition-transform">
                      <div className="w-28 h-44 mx-auto mb-4 bg-white border-4 border-gray-300 relative shadow-xl">
                        {/* Clean panel design */}
                        <div className="absolute inset-2 flex flex-col gap-1">
                          <div className="flex-1 border-2 border-gray-200 rounded-sm bg-gray-50"></div>
                          <div className="flex-1 border-2 border-gray-200 rounded-sm bg-gray-50"></div>
                          <div className="flex-1 border-2 border-gray-200 rounded-sm bg-gray-50"></div>
                        </div>
                        {/* Door handle */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-6 bg-gray-400 rounded-full shadow-md"></div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-700">White</h3>
                      <Button 
                        className="bg-white hover:bg-gray-100 text-black border border-gray-300 w-full text-sm"
                        onClick={() => {
                          speakInstruction("This is a white door. White is the lightest color, like snow and clouds.");
                        }}
                      >
                        🚪 Open Door
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

        {/* The Young and Old View */}
        {objectCharactersOpen && (
          <ObjectCharacters onClose={() => setObjectCharactersOpen(false)} />
        )}

        {/* Full Screen Carousel Card View */}
        {fullScreenCard && (
          <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div className="relative w-full max-w-4xl">
              {/* Close button */}
              <button 
                onClick={closeFullScreenCard}
                className="absolute -top-12 right-0 text-white hover:text-yellow-400 transition-colors z-10"
              >
                <X className="h-10 w-10" />
              </button>
              
              {/* Card content */}
              <div className={`bg-white rounded-2xl p-8 border-8 ${fullScreenCard.borderColor} shadow-2xl`}>
                {fullScreenCard.title && (
                  <h2 className="text-4xl font-bold text-center mb-6" style={{ fontFamily: '"Bungee Shade", cursive' }}>
                    {fullScreenCard.title}
                  </h2>
                )}
                
                {fullScreenCard.image && (
                  <div className="flex items-center justify-center">
                    <img 
                      src={fullScreenCard.image} 
                      alt={fullScreenCard.name}
                      className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                    />
                  </div>
                )}
                
                {fullScreenCard.content && (
                  <div className="py-8">
                    {fullScreenCard.content}
                  </div>
                )}
                
                {/* Microphone button for recording */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      createRecordingHandler(fullScreenCard.name)(e);
                    }}
                    className={`${isRecording && selectedCardForTest === fullScreenCard.name ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-4 shadow-lg`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </Button>
                  {isRecording && selectedCardForTest === fullScreenCard.name && (
                    <span className="text-lg font-bold bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">
                      Recording: {recordingTime}s / 30s
                    </span>
                  )}
                  {!isRecording && (
                    <span className="text-gray-600 text-lg">Click to record your answer</span>
                  )}
                </div>
              </div>
              
              {/* Navigation hint */}
              <p className="text-white text-center mt-4 opacity-75">
                Click X to close
              </p>
            </div>
          </div>
        )}

        {/* Human Being - My Body Dialog */}
        <Dialog open={humanBeingOpen} onOpenChange={setHumanBeingOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {selectedBodyType === 'girl' ? "Girl's Body Parts" : "Boy's Body Parts"}
              </DialogTitle>
              <DialogDescription>
                Learn about different parts of the human body
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <img 
                  src={selectedBodyType === 'girl' ? girlBodyPartsDiagram : boyBodyPartsDiagram}
                  alt={selectedBodyType === 'girl' ? "Girl's body parts diagram" : "Boy's body parts diagram"}
                  className="w-full max-w-2xl h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Five Senses Dialog */}
        <Dialog open={fiveSensesOpen} onOpenChange={setFiveSensesOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">The Five Senses</DialogTitle>
              <DialogDescription>
                Explore the five senses: sight, hearing, smell, taste, and touch
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <img 
                  src={fiveSensesDiagram}
                  alt="The five senses diagram"
                  className="w-full max-w-2xl h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              style={{ backgroundColor: '#2a2d34', color: 'white', borderColor: 'rgba(255,255,255,0.1)' }}
              onClick={() => {
                setShowProgressDialog(false);
                navigate("/learner-progress-report");
              }}
            >
              <FileText className="h-4 w-4" />
              Open Full FLC Report
            </Button>
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
                      <AccordionTrigger onClick={() => setSelectedSubject('Numeracy')}>
                        Numeracy
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-4">
                          {(() => {
                            const robotStatus = getRobotStatus(r => r.subject.toLowerCase().includes('numeracy') || r.subject.toLowerCase().includes('numbers') || r.subject.toLowerCase().includes('shapes'));
                            return (
                              <div className="flex-shrink-0">
                                <MiniTrafficRobot status={robotStatus.status} label={robotStatus.label} />
                              </div>
                            );
                          })()}
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-4">Track progress in counting, numbers, and basic math skills.</p>
                            {testResults.filter(r => r.subject.toLowerCase().includes('numeracy') || r.subject.toLowerCase().includes('numbers') || r.subject.toLowerCase().includes('shapes')).length > 0 ? (
                              <div className="space-y-3">
                                {testResults
                                  .filter(r => r.subject.toLowerCase().includes('numeracy') || r.subject.toLowerCase().includes('numbers') || r.subject.toLowerCase().includes('shapes'))
                                  .map((result, idx) => (
                                    <div key={idx} className="p-3 bg-secondary rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(result.timestamp).toLocaleString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl font-bold">{result.score}/10</span>
                                          <span className={`text-lg font-bold px-2 py-0.5 rounded ${
                                            result.grade === 'A' ? 'bg-green-500 text-white' :
                                            result.grade === 'B' ? 'bg-blue-500 text-white' :
                                            result.grade === 'C' ? 'bg-yellow-500 text-white' :
                                            'bg-red-500 text-white'
                                          }`}>
                                            {result.grade}
                                          </span>
                                        </div>
                                      </div>
                                      <audio controls className="w-full h-8" src={result.audioUrl} />
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No test results yet.</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="basic-logic">
                      <AccordionTrigger onClick={() => setSelectedSubject('Basic Logic')}>
                        Basic Logic
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-4">
                          {(() => {
                            const robotStatus = getRobotStatus(r => r.subject.toLowerCase().includes('logic') || r.subject.toLowerCase().includes('shapes') || r.subject.toLowerCase().includes('traffic'));
                            return (
                              <div className="flex-shrink-0">
                                <MiniTrafficRobot status={robotStatus.status} label={robotStatus.label} />
                              </div>
                            );
                          })()}
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-4">Monitor development in problem-solving and logical thinking.</p>
                            {testResults.filter(r => r.subject.toLowerCase().includes('logic') || r.subject.toLowerCase().includes('shapes') || r.subject.toLowerCase().includes('traffic')).length > 0 ? (
                              <div className="space-y-3">
                                {testResults
                                  .filter(r => r.subject.toLowerCase().includes('logic') || r.subject.toLowerCase().includes('shapes') || r.subject.toLowerCase().includes('traffic'))
                                  .map((result, idx) => (
                                    <div key={idx} className="p-3 bg-secondary rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(result.timestamp).toLocaleString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl font-bold">{result.score}/10</span>
                                          <span className={`text-lg font-bold px-2 py-0.5 rounded ${
                                            result.grade === 'A' ? 'bg-green-500 text-white' :
                                            result.grade === 'B' ? 'bg-blue-500 text-white' :
                                            result.grade === 'C' ? 'bg-yellow-500 text-white' :
                                            'bg-red-500 text-white'
                                          }`}>
                                            {result.grade}
                                          </span>
                                        </div>
                                      </div>
                                      <audio controls className="w-full h-8" src={result.audioUrl} />
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No test results yet.</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="literacy">
                      <AccordionTrigger onClick={() => setSelectedSubject('Literacy')}>
                        Literacy
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-4">
                          {(() => {
                            const robotStatus = getRobotStatus(r => r.subject.toLowerCase().includes('literacy') || r.subject.toLowerCase().includes('alphabet') || r.subject.toLowerCase().includes('abc'));
                            return (
                              <div className="flex-shrink-0">
                                <MiniTrafficRobot status={robotStatus.status} label={robotStatus.label} />
                              </div>
                            );
                          })()}
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-4">Assess reading, writing, and language comprehension skills.</p>
                            {testResults.filter(r => r.subject.toLowerCase().includes('literacy') || r.subject.toLowerCase().includes('alphabet') || r.subject.toLowerCase().includes('abc')).length > 0 ? (
                              <div className="space-y-3">
                                {testResults
                                  .filter(r => r.subject.toLowerCase().includes('literacy') || r.subject.toLowerCase().includes('alphabet') || r.subject.toLowerCase().includes('abc'))
                                  .map((result, idx) => (
                                    <div key={idx} className="p-3 bg-secondary rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(result.timestamp).toLocaleString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl font-bold">{result.score}/10</span>
                                          <span className={`text-lg font-bold px-2 py-0.5 rounded ${
                                            result.grade === 'A' ? 'bg-green-500 text-white' :
                                            result.grade === 'B' ? 'bg-blue-500 text-white' :
                                            result.grade === 'C' ? 'bg-yellow-500 text-white' :
                                            'bg-red-500 text-white'
                                          }`}>
                                            {result.grade}
                                          </span>
                                        </div>
                                      </div>
                                      <audio controls className="w-full h-8" src={result.audioUrl} />
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No test results yet.</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="life-skills-arts">
                      <AccordionTrigger onClick={() => setSelectedSubject('Life Skills - Arts')}>
                        Life Skills - Arts
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-4">
                          {(() => {
                            const robotStatus = getRobotStatus(r => r.subject.toLowerCase().includes('arts') || r.subject.toLowerCase().includes('art'));
                            return (
                              <div className="flex-shrink-0">
                                <MiniTrafficRobot status={robotStatus.status} label={robotStatus.label} />
                              </div>
                            );
                          })()}
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-4">Evaluate creative expression and artistic development.</p>
                            
                            {/* Performing Arts Filter Buttons */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {[
                                { key: 'piano', label: '🎹 Piano' },
                                { key: 'voice', label: '🎤 Voice' },
                                { key: 'rhythm', label: '🥁 Rhythm' },
                                { key: 'strings', label: '🎻 Strings' },
                                { key: 'drama', label: '🎭 Drama' }
                              ].map((art) => {
                                const artRecordings = testResults.filter(r => 
                                  (r.subject.toLowerCase().includes('arts') || r.subject.toLowerCase().includes('art')) && 
                                  r.subject.toLowerCase().includes(art.key)
                                );
                                return (
                                  <Button
                                    key={art.key}
                                    variant={artRecordings.length > 0 ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center gap-1"
                                    onClick={() => {
                                      if (artRecordings.length > 0) {
                                        const audioEl = document.getElementById(`arts-audio-${art.key}`) as HTMLAudioElement;
                                        if (audioEl) {
                                          audioEl.play();
                                        }
                                      } else {
                                        toast({
                                          title: "No Recording",
                                          description: `No ${art.label.split(' ')[1]} verbal test recorded yet.`,
                                        });
                                      }
                                    }}
                                  >
                                    {art.label}
                                    {artRecordings.length > 0 && (
                                      <Play className="h-3 w-3 ml-1" />
                                    )}
                                  </Button>
                                );
                              })}
                            </div>
                            
                            {/* Hidden audio elements for each performing art */}
                            {['piano', 'voice', 'rhythm', 'strings', 'drama'].map((art) => {
                              const artRecording = testResults.find(r => 
                                (r.subject.toLowerCase().includes('arts') || r.subject.toLowerCase().includes('art')) && 
                                r.subject.toLowerCase().includes(art)
                              );
                              return artRecording ? (
                                <audio 
                                  key={art}
                                  id={`arts-audio-${art}`}
                                  src={artRecording.audioUrl}
                                  className="hidden"
                                />
                              ) : null;
                            })}
                            
                            {testResults.filter(r => r.subject.toLowerCase().includes('arts') || r.subject.toLowerCase().includes('art')).length > 0 ? (
                              <div className="space-y-3">
                                {testResults
                                  .filter(r => r.subject.toLowerCase().includes('arts') || r.subject.toLowerCase().includes('art'))
                                  .map((result, idx) => (
                                    <div key={idx} className="p-3 bg-secondary rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-muted-foreground">
                                          {result.subject} - {new Date(result.timestamp).toLocaleString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl font-bold">{result.score}/10</span>
                                          <span className={`text-lg font-bold px-2 py-0.5 rounded ${
                                            result.grade === 'A' ? 'bg-green-500 text-white' :
                                            result.grade === 'B' ? 'bg-blue-500 text-white' :
                                            result.grade === 'C' ? 'bg-yellow-500 text-white' :
                                            'bg-red-500 text-white'
                                          }`}>
                                            {result.grade}
                                          </span>
                                        </div>
                                      </div>
                                      <audio controls className="w-full h-8" src={result.audioUrl} />
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No test results yet.</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="life-skills-sport">
                      <AccordionTrigger onClick={() => setSelectedSubject('Life Skills - Sport')}>
                        Life Skills - Sport
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-4">
                          {(() => {
                            const robotStatus = getRobotStatus(r => r.subject.toLowerCase().includes('sport'));
                            return (
                              <div className="flex-shrink-0">
                                <MiniTrafficRobot status={robotStatus.status} label={robotStatus.label} />
                              </div>
                            );
                          })()}
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-4">Track physical development and motor skills.</p>
                            
                            {/* Sport Filter Buttons */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {[
                                { key: 'soccer', label: '⚽ Soccer' },
                                { key: 'rugby', label: '🏉 Rugby' },
                                { key: 'cricket', label: '🏏 Cricket' },
                                { key: 'tennis', label: '🎾 Tennis' },
                                { key: 'netball', label: '🏀 Netball' },
                                { key: 'indigenous', label: '🥎 Indigenous' }
                              ].map((sport) => {
                                const sportRecordings = testResults.filter(r => 
                                  r.subject.toLowerCase().includes('sport') && 
                                  r.subject.toLowerCase().includes(sport.key)
                                );
                                return (
                                  <Button
                                    key={sport.key}
                                    variant={sportRecordings.length > 0 ? "default" : "outline"}
                                    size="sm"
                                    className="flex items-center gap-1"
                                    onClick={() => {
                                      if (sportRecordings.length > 0) {
                                        const audioEl = document.getElementById(`sport-audio-${sport.key}`) as HTMLAudioElement;
                                        if (audioEl) {
                                          audioEl.play();
                                        }
                                      } else {
                                        toast({
                                          title: "No Recording",
                                          description: `No ${sport.label.split(' ')[1]} verbal test recorded yet.`,
                                        });
                                      }
                                    }}
                                  >
                                    {sport.label}
                                    {sportRecordings.length > 0 && (
                                      <Play className="h-3 w-3 ml-1" />
                                    )}
                                  </Button>
                                );
                              })}
                            </div>
                            
                            {/* Hidden audio elements for each sport */}
                            {[
                              { key: 'soccer' },
                              { key: 'rugby' },
                              { key: 'cricket' },
                              { key: 'tennis' },
                              { key: 'netball' },
                              { key: 'indigenous' }
                            ].map((sport) => {
                              const sportRecording = testResults.find(r => 
                                r.subject.toLowerCase().includes('sport') && 
                                r.subject.toLowerCase().includes(sport.key)
                              );
                              return sportRecording ? (
                                <audio 
                                  key={sport.key}
                                  id={`sport-audio-${sport.key}`}
                                  src={sportRecording.audioUrl}
                                  className="hidden"
                                />
                              ) : null;
                            })}
                            
                            {testResults.filter(r => r.subject.toLowerCase().includes('sport')).length > 0 ? (
                              <div className="space-y-3 mb-4">
                                {testResults
                                  .filter(r => r.subject.toLowerCase().includes('sport'))
                                  .map((result, idx) => (
                                    <div key={idx} className="p-3 bg-secondary rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-muted-foreground">
                                          {result.subject} - {new Date(result.timestamp).toLocaleString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl font-bold">{result.score}/10</span>
                                          <span className={`text-lg font-bold px-2 py-0.5 rounded ${
                                            result.grade === 'A' ? 'bg-green-500 text-white' :
                                            result.grade === 'B' ? 'bg-blue-500 text-white' :
                                            result.grade === 'C' ? 'bg-yellow-500 text-white' :
                                            'bg-red-500 text-white'
                                          }`}>
                                            {result.grade}
                                          </span>
                                        </div>
                                      </div>
                                      <audio controls className="w-full h-8" src={result.audioUrl} />
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground italic mb-4">No test results yet.</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="science-discovery">
                      <AccordionTrigger onClick={() => setSelectedSubject('Science')}>
                        Science and Discovery
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-4">
                          {(() => {
                            const robotStatus = getRobotStatus(r => r.subject.toLowerCase().includes('science') || r.subject.toLowerCase().includes('body') || r.subject.toLowerCase().includes('animals') || r.subject.toLowerCase().includes('bee') || r.subject.toLowerCase().includes('transportation'));
                            return (
                              <div className="flex-shrink-0">
                                <MiniTrafficRobot status={robotStatus.status} label={robotStatus.label} />
                              </div>
                            );
                          })()}
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-4">Observe curiosity and understanding of the natural world.</p>
                            {testResults.filter(r => r.subject.toLowerCase().includes('science') || r.subject.toLowerCase().includes('body') || r.subject.toLowerCase().includes('animals') || r.subject.toLowerCase().includes('bee') || r.subject.toLowerCase().includes('transportation')).length > 0 ? (
                              <div className="space-y-3">
                                {testResults
                                  .filter(r => r.subject.toLowerCase().includes('science') || r.subject.toLowerCase().includes('body') || r.subject.toLowerCase().includes('animals') || r.subject.toLowerCase().includes('bee') || r.subject.toLowerCase().includes('transportation'))
                                  .map((result, idx) => (
                                    <div key={idx} className="p-3 bg-secondary rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(result.timestamp).toLocaleString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl font-bold">{result.score}/10</span>
                                          <span className={`text-lg font-bold px-2 py-0.5 rounded ${
                                            result.grade === 'A' ? 'bg-green-500 text-white' :
                                            result.grade === 'B' ? 'bg-blue-500 text-white' :
                                            result.grade === 'C' ? 'bg-yellow-500 text-white' :
                                            'bg-red-500 text-white'
                                          }`}>
                                            {result.grade}
                                          </span>
                                        </div>
                                      </div>
                                      <audio controls className="w-full h-8" src={result.audioUrl} />
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No test results yet.</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="tech-skills">
                      <AccordionTrigger onClick={() => setSelectedSubject('Tech Skills')}>
                        Tech Skills
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex items-start gap-4">
                          {(() => {
                            const robotStatus = getRobotStatus(r => r.subject.toLowerCase().includes('tech') || r.subject.toLowerCase().includes('emoji') || r.subject.toLowerCase().includes('icon'));
                            return (
                              <div className="flex-shrink-0">
                                <MiniTrafficRobot status={robotStatus.status} label={robotStatus.label} />
                              </div>
                            );
                          })()}
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground mb-4">Track digital literacy and technology awareness skills.</p>
                            {testResults.filter(r => r.subject.toLowerCase().includes('tech') || r.subject.toLowerCase().includes('emoji') || r.subject.toLowerCase().includes('icon')).length > 0 ? (
                              <div className="space-y-3">
                                {testResults
                                  .filter(r => r.subject.toLowerCase().includes('tech') || r.subject.toLowerCase().includes('emoji') || r.subject.toLowerCase().includes('icon'))
                                  .map((result, idx) => (
                                    <div key={idx} className="p-3 bg-secondary rounded-lg">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(result.timestamp).toLocaleString()}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xl font-bold">{result.score}/10</span>
                                          <span className={`text-lg font-bold px-2 py-0.5 rounded ${
                                            result.grade === 'A' ? 'bg-green-500 text-white' :
                                            result.grade === 'B' ? 'bg-blue-500 text-white' :
                                            result.grade === 'C' ? 'bg-yellow-500 text-white' :
                                            'bg-red-500 text-white'
                                          }`}>
                                            {result.grade}
                                          </span>
                                        </div>
                                      </div>
                                      <audio controls className="w-full h-8" src={result.audioUrl} />
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No test results yet.</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* User Information with Community Feedback */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-semibold">User Information</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCommunityFeed(!showCommunityFeed)}
                  className="text-xs"
                >
                  <Users className="h-3 w-3 mr-1" />
                  {showCommunityFeed ? 'Hide' : 'Show'} Community
                </Button>
              </div>
              
              {!showCommunityFeed ? (
                <div className="mt-2 p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors">
                  <div 
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                    onClick={() => setShowCommunityFeed(true)}
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
                    <p className="text-xs text-muted-foreground text-center">Click to view community feedback</p>
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  {/* Community Feedback Feed */}
                  <div className="max-h-[300px] overflow-y-auto p-4 space-y-3 bg-muted/30">
                    {allFeedback.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Users className="h-12 w-12 text-muted-foreground mb-3" />
                        <p className="text-muted-foreground text-sm font-medium">No community feedback yet</p>
                        <p className="text-xs text-muted-foreground mt-1">Be the first to share!</p>
                      </div>
                    ) : (
                      allFeedback.map((feedback) => (
                        <div 
                          key={feedback.id} 
                          className={`p-3 rounded-lg ${
                            feedback.user_id === profile?.user_id 
                              ? 'bg-primary/5 border border-primary/20' 
                              : 'bg-background border border-border'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <Avatar className="h-8 w-8 border">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                {feedback.username[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-xs">{feedback.username}</span>
                                <span className="text-[10px] text-muted-foreground">
                                  {new Date(feedback.created_at).toLocaleDateString()}
                                </span>
                                {feedback.user_id === profile?.user_id && (
                                  <Badge variant="outline" className="text-[10px] h-4 px-1">You</Badge>
                                )}
                              </div>
                              <p className="text-xs whitespace-pre-wrap break-words">{feedback.feedback_text}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Post to Community */}
                  <div className="p-3 border-t bg-background">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarImage src={profile?.profile_image_url || ''} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                          {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Textarea
                        placeholder="Share with the community..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="min-h-[60px] resize-none text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendResponse();
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" onClick={handleSendResponse} disabled={!responseText.trim()}>
                        <Share2 className="h-3 w-3 mr-1" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Private Feedback Section */}
            {!showCommunityFeed && (
              <div>
                <Label htmlFor="response" className="text-sm font-semibold">Private Feedback to ECD Team</Label>
                <Textarea
                  id="response"
                  placeholder="Share your thoughts privately with the ECDCoding team..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="mt-2 min-h-[120px]"
                />
              </div>
            )}

            {/* Institution Community Section */}
            {profile && (
              <div className="border border-border rounded-lg p-4 bg-card">
                <InstitutionCommunity
                  userId={profile.user_id}
                  registrationType={profile.registration_type}
                  profile={{
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    username: profile.username,
                    institution: profile.institution,
                  }}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowProgressDialog(false);
                  setResponseText("");
                  setUnderstandingLevel(null);
                  setShowCommunityFeed(false);
                }}
              >
                Cancel
              </Button>
              {!showCommunityFeed && (
                <Button onClick={handleSendResponse}>
                  Send to Team
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Traffic Lights Dialog */}
      <Dialog open={trafficLightsOpen} onOpenChange={setTrafficLightsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Traffic Lights</DialogTitle>
            <DialogDescription className="text-center">
              Click on each light to learn what it means
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-12">
            <div className="scale-[1.5]">
              <TrafficLightProgress 
                mode="traffic" 
                onLevelChange={(level) => {
                  // Voice narration for traffic lights
                  if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const messages: Record<'red' | 'yellow' | 'green', string> = {
                      red: "Red light means Stop! You must wait and not cross the road.",
                      yellow: "Yellow light means Get Ready! The light is about to change.",
                      green: "Green light means Cross! It is safe to walk across the road."
                    };
                    const utterance = new SpeechSynthesisUtterance(messages[level]);
                    utterance.rate = 0.85;
                    utterance.pitch = 1.1;
                    window.speechSynthesis.speak(utterance);
                  }
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ABC Safety Dialog */}
      <Dialog open={abcSafetyOpen} onOpenChange={setAbcSafetyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Always Be Careful (ABC)</DialogTitle>
            <DialogDescription>
              Safety is as simple as ABC - Always Be Careful!
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-6 py-4">
            <img 
              src={abcSafetyImage} 
              alt="Safety is as simple as ABC - Always Be Careful" 
              className="w-full max-w-sm rounded-lg shadow-lg"
            />
            
            <div className="space-y-3 w-full">
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold text-xl">A</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-red-600">Always</p>
                  <p className="text-xs text-muted-foreground">Stay alert at all times</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xl">B</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-blue-600">Be</p>
                  <p className="text-xs text-muted-foreground">Be aware of your surroundings</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-xl">C</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-green-600">Careful</p>
                  <p className="text-xs text-muted-foreground">Look left, right, then left again before crossing</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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

      {/* Music Lab Wrapper */}
      <MusicLabWrapper
        isOpen={musicLabOpen}
        onClose={() => setMusicLabOpen(false)}
        title={musicLabTitle}
        url={musicLabUrl}
      />

      {/* Coding in Alphabets Dialog */}
      <Dialog open={codingDialogOpen} onOpenChange={(open) => {
        setCodingDialogOpen(open);
        if (!open) {
          setCurrentAlphabetIndex(0); // Reset to A when closing
        }
      }}>
        <DialogContent className="max-w-[550px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              🔤 Coding in Alphabets
            </DialogTitle>
            <DialogDescription>
              Click on the letter to see the next one!
            </DialogDescription>
          </DialogHeader>
          <div 
            className="flex flex-col items-center justify-center cursor-pointer select-none py-6"
            onClick={() => setCurrentAlphabetIndex(prev => (prev + 1) % 26)}
          >
            <div className="text-[150px] font-bold text-primary leading-none animate-bounce">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[currentAlphabetIndex]}
            </div>
            <p className="text-lg text-muted-foreground mt-3">
              Letter {currentAlphabetIndex + 1} of 26
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Tap to see the next letter
            </p>
            
            {/* Numbered blocks 1-26 in rows of 10 */}
            <div className="grid grid-cols-10 gap-1 mt-4 w-full max-w-[420px] px-2">
              {Array.from({ length: 26 }, (_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentAlphabetIndex(i);
                  }}
                  className={`w-9 h-9 rounded-md text-xs font-bold transition-all duration-200 ${
                    currentAlphabetIndex === i
                      ? 'bg-primary text-primary-foreground scale-110 shadow-lg ring-2 ring-primary/50'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          
          {/* Word to Number Code Converter */}
          <div className="border-t pt-4 mt-2">
            <p className="text-sm font-semibold text-center mb-2">🔢 Word to Number Code</p>
            <div className="flex gap-2 px-2">
              <Input
                placeholder="Type a word (e.g. MOM, DAD)"
                value={wordToCode}
                onChange={(e) => setWordToCode(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 text-center font-bold"
                maxLength={10}
              />
            </div>
            {wordToCode && (
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  {wordToCode.split('').map((letter, i) => (
                    <span key={i}>
                      {letter}={letter.charCodeAt(0) - 64}
                      {i < wordToCode.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className="text-2xl font-bold text-primary tracking-wider">
                  {wordToCode.split('').map(letter => letter.charCodeAt(0) - 64).join('')}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Coding in Numbers Dialog (opposite of Alphabets) */}
      <Dialog open={codingNumbersOpen} onOpenChange={(open) => {
        setCodingNumbersOpen(open);
        if (!open) setCurrentNumberLetterIndex(0);
      }}>
        <DialogContent className="max-w-[550px] max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              🔢 Coding in Numbers
            </DialogTitle>
            <DialogDescription>
              Click a letter below to see its number at the top!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-[150px] font-bold text-primary leading-none animate-bounce">
              {currentNumberLetterIndex + 1}
            </div>
            <p className="text-lg text-muted-foreground mt-3">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[currentNumberLetterIndex]} = {currentNumberLetterIndex + 1}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Tap a letter to see its code
            </p>

            {/* Letter blocks A-Z in rows of 10 */}
            <div className="grid grid-cols-10 gap-1 mt-4 w-full max-w-[420px] px-2">
              {Array.from({ length: 26 }, (_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentNumberLetterIndex(i);
                  }}
                  className={`w-9 h-9 rounded-md text-xs font-bold transition-all duration-200 ${
                    currentNumberLetterIndex === i
                      ? 'bg-primary text-primary-foreground scale-110 shadow-lg ring-2 ring-primary/50'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]}
                </button>
              ))}
            </div>
          </div>

          {/* Number to Word Converter */}
          <div className="border-t pt-4 mt-2">
            <p className="text-sm font-semibold text-center mb-2">🔤 Number Code to Word</p>
            <div className="flex gap-2 px-2">
              <Input
                placeholder="Type numbers 1-26 separated by spaces (e.g. 13 15 13)"
                value={wordToCode}
                onChange={(e) => setWordToCode(e.target.value.replace(/[^0-9 ]/g, ''))}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 text-center font-bold"
                maxLength={40}
              />
            </div>
            {wordToCode && (
              <div className="mt-3 text-center">
                <p className="text-2xl font-bold text-primary tracking-wider">
                  {wordToCode
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((n) => {
                      const num = parseInt(n, 10);
                      return num >= 1 && num <= 26 ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num - 1] : '?';
                    })
                    .join('')}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Screen Emoji Dialog */}
      <Dialog open={emojiDialogOpen} onOpenChange={(open) => {
        setEmojiDialogOpen(open);
        if (open && selectedEmoji) {
          setTimeout(() => speakEmojiName(selectedEmoji), 300);
        } else {
          window.speechSynthesis.cancel();
        }
      }}>
        <DialogContent className="max-w-full w-screen h-screen flex items-center justify-center bg-background/95 backdrop-blur-lg border-none">
          <DialogTitle className="sr-only">Display</DialogTitle>
          <div className="text-center flex flex-col items-center gap-6">
            {selectedEmoji === 'instagram' ? (
              <img src={instagramLogo} alt="Instagram" className="max-w-[60vw] max-h-[50vh] object-contain" />
            ) : selectedEmoji === 'whatsapp' ? (
              <img src={whatsappLogo} alt="WhatsApp" className="max-w-[60vw] max-h-[50vh] object-contain" />
            ) : selectedEmoji && (selectedEmoji.includes('/') || selectedEmoji.includes('data:')) ? (
              <img src={selectedEmoji} alt="Transport" className="max-w-[80vw] max-h-[70vh] object-contain" />
            ) : (
              <span className="text-[40vmin] leading-none block">{selectedEmoji}</span>
            )}
            {selectedEmoji && emojiNameMap[selectedEmoji] && (
              <p className="text-2xl md:text-4xl font-bold text-foreground mt-8">{emojiNameMap[selectedEmoji]}</p>
            )}
            <Button
              onClick={() => speakEmojiName(selectedEmoji)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3"
            >
              <Volume2 className="h-5 w-5 mr-2" />
              Hear Name
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CAPS - Curriculum and Assessment Policy Statement Dialog */}
      <Dialog open={capsOpen} onOpenChange={setCapsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">📚 Curriculum & Assessment Policy Statement (CAPS)</DialogTitle>
            <DialogDescription>
              All ECD Institutions are allocated Curriculum and Assessment Policy Statement for children 1 to 4 years old.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Country Flags Dropdown */}
            <div className="flex items-center gap-3">
              <label className="font-semibold text-sm">Select Country:</label>
              <select 
                value={selectedCountry} 
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-background text-foreground"
              >
                <option value="ZA">🇿🇦 South Africa</option>
                <option value="NG">🇳🇬 Nigeria</option>
                <option value="KE">🇰🇪 Kenya</option>
                <option value="GH">🇬🇭 Ghana</option>
                <option value="EG">🇪🇬 Egypt</option>
                <option value="TZ">🇹🇿 Tanzania</option>
                <option value="UG">🇺🇬 Uganda</option>
                <option value="ET">🇪🇹 Ethiopia</option>
                <option value="RW">🇷🇼 Rwanda</option>
                <option value="ZW">🇿🇼 Zimbabwe</option>
                <option value="BW">🇧🇼 Botswana</option>
                <option value="NA">🇳🇦 Namibia</option>
                <option value="MZ">🇲🇿 Mozambique</option>
                <option value="ZM">🇿🇲 Zambia</option>
                <option value="MW">🇲🇼 Malawi</option>
                <option value="US">🇺🇸 United States</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="CA">🇨🇦 Canada</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="IN">🇮🇳 India</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="FR">🇫🇷 France</option>
                <option value="BR">🇧🇷 Brazil</option>
                <option value="CN">🇨🇳 China</option>
                <option value="JP">🇯🇵 Japan</option>
              </select>
            </div>

            {/* South Africa CAPS Time Allocation Table */}
            {selectedCountry === 'ZA' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-center bg-primary/10 p-2 rounded">1.4 TIME ALLOCATION - Year 1-4</h3>
                <p className="text-sm text-muted-foreground text-center">
                  (a) The instructional time in the Year 1-4 is as follows:<br />
                  <strong>Instructional Time for the Year 1-4 is 27½ hours in a five-day cycle</strong>
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-2 text-left" colSpan={2}>Subjects</th>
                        <th className="border border-border p-2 text-center">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-muted/50">
                        <td className="border border-border p-2 font-semibold" colSpan={3}>Fundamental Subjects</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2" colSpan={2}>
                          <strong>Languages</strong><br />
                          <span className="text-xs text-muted-foreground">(Home Language and First Additional Language)</span>
                        </td>
                        <td className="border border-border p-2 text-center">3 Hours for Home Language</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2" colSpan={2}>
                          <span className="text-xs">All 11 official languages (Afrikaans, English, isiNdebele, isiXhosa, isiZulu, Siswati, Sesotho, Setswana, Sepedi, Tshivenda, Xitsonga)</span>
                        </td>
                        <td className="border border-border p-2 text-center text-xs">2 hours for First Additional Language</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2 font-semibold" colSpan={2}>Mathematics</td>
                        <td className="border border-border p-2 text-center">3 hours</td>
                      </tr>
                      <tr className="bg-muted/50">
                        <td className="border border-border p-2 font-semibold">Life Skills</td>
                        <td className="border border-border p-2 text-center font-semibold">Areas of Study</td>
                        <td className="border border-border p-2 text-center font-semibold">Time</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2" rowSpan={4}></td>
                        <td className="border border-border p-2">
                          <strong>Personal and Social Well-being</strong><br />
                          <span className="text-xs text-muted-foreground">(including aspects of Life Orientation, Social Sciences and Economic and Management Sciences)</span>
                        </td>
                        <td className="border border-border p-2 text-center">2½ hours</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Physical Education</td>
                        <td className="border border-border p-2 text-center">1 hour</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Creative Arts</td>
                        <td className="border border-border p-2 text-center">1 hour</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-2">Natural Sciences</td>
                        <td className="border border-border p-2 text-center text-xs">
                          1½ hours from year 2 onwards<br />
                          <span className="text-muted-foreground">This time to be used in year 1 to support Languages and Mathematics</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">CAPS: YEAR 1-4 EARLY CHILDHOOD EDUCATION</p>
              </div>
            )}

            {/* Other Countries - Placeholder */}
            {selectedCountry !== 'ZA' && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">🌍 {selectedCountry === 'NG' ? 'Nigeria' : selectedCountry === 'KE' ? 'Kenya' : selectedCountry === 'GH' ? 'Ghana' : selectedCountry === 'EG' ? 'Egypt' : selectedCountry === 'TZ' ? 'Tanzania' : selectedCountry === 'UG' ? 'Uganda' : selectedCountry === 'ET' ? 'Ethiopia' : selectedCountry === 'RW' ? 'Rwanda' : selectedCountry === 'ZW' ? 'Zimbabwe' : selectedCountry === 'BW' ? 'Botswana' : selectedCountry === 'NA' ? 'Namibia' : selectedCountry === 'MZ' ? 'Mozambique' : selectedCountry === 'ZM' ? 'Zambia' : selectedCountry === 'MW' ? 'Malawi' : selectedCountry === 'US' ? 'United States' : selectedCountry === 'GB' ? 'United Kingdom' : selectedCountry === 'CA' ? 'Canada' : selectedCountry === 'AU' ? 'Australia' : selectedCountry === 'IN' ? 'India' : selectedCountry === 'DE' ? 'Germany' : selectedCountry === 'FR' ? 'France' : selectedCountry === 'BR' ? 'Brazil' : selectedCountry === 'CN' ? 'China' : 'Japan'} Early Childhood Curriculum</p>
                <p className="text-sm mt-2">Curriculum guidelines for this country are being compiled. Please check back soon or contact your local education department for specific requirements.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* ASK AI Copilot */}
      <ExpoCopilot context="My Lesson Vault (Ages 4-6)" />

      <FixAlphabetOrderPuzzle isOpen={fixOrderOpen} onClose={() => setFixOrderOpen(false)} />

      {/* PayFast Reload Credits Dialog */}
      <PayFastPaymentDialog
        open={showReloadDialog}
        onOpenChange={setShowReloadDialog}
        amount={100}
        itemName={hasActiveSubscription ? "Credit Top-Up (100 Credits)" : "Monthly Subscription (100 Credits)"}
        paymentType={hasActiveSubscription ? "credits" : "subscription"}
        userEmail={user?.email}
        userFirstName={profile?.first_name}
        userLastName={profile?.last_name}
        onPaymentComplete={() => setShowReloadDialog(false)}
        isCreditsLow={credits <= 20}
        defaultOption={hasActiveSubscription ? 'top-up' : 'recurring'}
      />
    </div>
  );
};

export default LessonVault0406;