import { useState, useEffect, useRef } from "react";
import AssistantHub from "@/components/AssistantHub";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Home, BookOpen, Code, Calculator, Beaker, Gamepad2, ChevronDown, ArrowLeft, Upload, User, Key, Phone, Settings, X, Volume2, Play, Image as ImageIcon, Film, TreePine, Microscope, Users, Share2, Heart, Coins, Bot, Construction, Cpu, Menu, Mic, Eye, PenLine, UserCheck, FileText, Newspaper, CalendarDays, ClipboardCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SiFacebook, SiX, SiTiktok, SiBluesky, SiInstagram, SiWhatsapp } from "react-icons/si";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { ObjectCharacters } from "@/components/ObjectCharacters";
import PersonalityVerification, { type PersonalityTab } from "@/components/PersonalityVerification";

import { CourseLikeComment } from "@/components/CourseLikeComment";
import { TrafficLightProgress } from "@/components/TrafficLightProgress";
import { SportPlayField } from "@/components/SportPlayField";
import MusicLabWrapper from "@/components/MusicLabWrapper";
import FlipBodyCard from "@/components/FlipBodyCard";
import BlocklyEditor from "@/components/BlocklyEditor";
import MicrobitAnalysisNarrator from "@/components/MicrobitAnalysisNarrator";
import LearnerPlayIndex from "@/components/LearnerPlayIndex";
import FixAlphabetOrderPuzzle from "@/components/FixAlphabetOrderPuzzle";
import NumeracyPracticeDialog, { NumeracyOp } from "@/components/NumeracyPracticeDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { AssignmentsNavItem } from "@/components/AssignmentsMenu";
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
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { onlineUsers, onlineCount } = useOnlineUsers('lesson-vault-07-10');
  const { credits, topupCredits, loading: creditsLoading, purchaseCredits, useCredits: consumeCredits, showReloadDialog, setShowReloadDialog } = useCredits();
  const { profile } = useProfile();
  const [isBuyCreditsVisible, setIsBuyCreditsVisible] = useState(false);
  const [numeracyOp, setNumeracyOp] = useState<NumeracyOp | null>(null);
  const [numeracyOpen, setNumeracyOpen] = useState(false);
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState<string | null>(null);
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [pictureActive, setPictureActive] = useState<boolean>(false);
  const [countingOpen, setCountingOpen] = useState(false);
  const [selectedCountingRange, setSelectedCountingRange] = useState<string | null>(null);
  const [parentsOpen, setParentsOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
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
  const [personalityOpen, setPersonalityOpen] = useState(false);
  const [learnerPlayIndexOpen, setLearnerPlayIndexOpen] = useState(false);
  const [personalityTab, setPersonalityTab] = useState<PersonalityTab>("ages");
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
  const [codeEditorOpen, setCodeEditorOpen] = useState(false);
  const [codeEditorTitle, setCodeEditorTitle] = useState('');
  const [codeEditorUrl, setCodeEditorUrl] = useState('');
  const [codeEditorDescription, setCodeEditorDescription] = useState('');
  const [microbitAnalysisOpen, setMicrobitAnalysisOpen] = useState(false);
  const [displayCredits, setDisplayCredits] = useState(100);
  const [gaugeAnimated, setGaugeAnimated] = useState(true);
  const [lowCreditsNotified, setLowCreditsNotified] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const IDLE_THRESHOLD = 30000;
  const alphabetAudioRef = useRef<HTMLAudioElement | null>(null);
  const alphabetIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [starAnimations, setStarAnimations] = useState<{[key: number]: boolean}>({});
  const [isAlphabetPlaying, setIsAlphabetPlaying] = useState(false);
  const [currentAlphabetIndex, setCurrentAlphabetIndex] = useState(0);
  const [isCountingPlaying, setIsCountingPlaying] = useState(false);
  const [currentCountingIndex, setCurrentCountingIndex] = useState(0);
  const countingAudioRef = useRef<HTMLAudioElement | null>(null);
  const countingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [codingDialogOpen, setCodingDialogOpen] = useState(false);
  const [wordToCode, setWordToCode] = useState('');
  const [cryptogramOpen, setCryptogramOpen] = useState(false);
  const [cryptogramWord, setCryptogramWord] = useState('');
  const [cryptogramSecretStyle, setCryptogramSecretStyle] = useState<'mixed' | 'numbers' | 'lowercase'>('mixed');
  const [fixOrderOpen, setFixOrderOpen] = useState(false);
  

  const hexLetters = 'ABCDEFGHIJ';
  const cryptogramPresetWords = [
    'ACE', 'AGHID', 'AID', 'BAD', 'BADGE', 'BEAD', 'BEEF', 'CAFE', 'CAGE', 'CHIEF',
    'DACHIE', 'DAD', 'DEAF', 'DEED', 'DIG', 'EDGE', 'FACE', 'FADE', 'FEED', 'FIGJAB',
    'GIG', 'HAJI', 'HIDE', 'JADE', 'JAB', 'JEFF', 'JIBE', 'JIBED'
  ];

  const generateSecret = (word: string, style: 'mixed' | 'numbers' | 'lowercase') => {
    const chars = word.split('').map((letter, i) => {
      const num = letter.toUpperCase().charCodeAt(0) - 64;
      if (style === 'numbers') return String(num);
      if (style === 'lowercase') return letter.toLowerCase();
      return i % 2 === 0 ? letter.toLowerCase() : String(num);
    });
    // Ensure at least one uppercase letter at a random position
    if (style !== 'numbers' && chars.length > 0) {
      const idx = Math.floor(Math.random() * chars.length);
      chars[idx] = word[idx].toUpperCase();
    }
    return chars.join('');
  };

  const getAllSecretVariants = (word: string) => {
    if (!word) return [];
    const variants = new Set<string>();
    // Generate several random mixes, each guaranteed to have at least one uppercase
    for (let v = 0; v < 6; v++) {
      const chars = word.split('').map(letter => {
        const num = letter.toUpperCase().charCodeAt(0) - 64;
        const rand = Math.random();
        if (rand < 0.33) return letter.toUpperCase();
        if (rand < 0.66) return letter.toLowerCase();
        return String(num);
      });
      // Ensure at least one uppercase at a random position
      const idx = Math.floor(Math.random() * chars.length);
      chars[idx] = word[idx].toUpperCase();
      variants.add(chars.join(''));
    }
    // Add pure number and pure lowercase
    variants.add(word.split('').map(l => String(l.toUpperCase().charCodeAt(0) - 64)).join(''));
    variants.add(word.toLowerCase());
    return Array.from(variants).slice(0, 8);
  };

  const openMusicLab = (title: string, url: string) => {
    setMusicLabTitle(title);
    setMusicLabUrl(url);
    setMusicLabOpen(true);
  };

  const openCodeEditor = (title: string, url: string, description?: string) => {
    setCodeEditorTitle(title);
    setCodeEditorUrl(url);
    setCodeEditorDescription(description || '');
    setCodeEditorOpen(true);
  };

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

  const stopAutoCounting = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAutoCounting(false);
    setCurrentAutoIndex(0);
  };

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

  // All useEffects must come after function definitions
  useEffect(() => {
    if (!creditsLoading && credits > 0) {
      setDisplayCredits(Math.min(credits, 100));
    }
  }, [credits, creditsLoading]);

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
  }, [selectedCountingRange, isCountingPlaying]);

  // Signed-in users may enter this section while it is under construction.

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


  return (
    <div className="min-h-screen bg-[#395B50]">
      {/* Navigation Bar */}
      <nav className="bg-[#395B50] text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-end gap-4">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open vault navigation"
                    className="text-white hover:bg-white/15 border border-white/30 rounded-md"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64 bg-background z-50">
                  {/* Lessons Library */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <BookOpen className="mr-2 h-4 w-4" /> Lessons Library
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-72 bg-background z-50">
                        <DropdownMenuItem onClick={() => navigate("/lesson-vault-07-10")}>
                          <BookOpen className="mr-2 h-4 w-4" /> Learning the Basics
                        </DropdownMenuItem>
                        {/* 1. Verbal Testing Space */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Mic className="mr-2 h-4 w-4" /> Verbal Testing Space
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-64 bg-background z-50">
                              <DropdownMenuItem onClick={() => verbalTestingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                                🎙️ Open Verbal Testing Space
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast({ title: "Generic Logic Analysis", description: "Coming soon." })}>
                                🧠 Generic Logic Analysis
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setMicrobitAnalysisOpen(true)}>
                                🔬 Micro:bit Analysis
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        {/* 2. Coding */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Code className="mr-2 h-4 w-4" /> Coding
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-64 bg-background z-50">
                              <DropdownMenuItem onClick={() => setCryptogramOpen(true)}>
                                🔑 Creating Crypto Secrets
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        {/* 3. Programming */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <Code className="mr-2 h-4 w-4" /> Programming
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-64 bg-background z-50">
                              <DropdownMenuItem
                                onClick={() => {
                                  setCodeEditorTitle('Blockly Code Editor');
                                  setCodeEditorDescription('Build your first program using blocks (no internet needed).');
                                  setCodeEditorOpen(true);
                                }}
                              >
                                🧩 Blockly
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openCodeEditor('Scratch', 'https://scratch.mit.edu/projects/editor/', 'Create stories, games and animations with Scratch')}>
                                🐱 Scratch
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openCodeEditor('Micro:bit MakeCode', 'https://makecode.microbit.org/', 'Program BBC micro:bit with blocks or JavaScript')}>
                                💡 Micro:bit Editor
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openCodeEditor('Micro:bit Classroom', 'https://classroom.microbit.org/', 'Collaborative coding for classrooms')}>
                                🏫 Micro:bit Classroom
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        {/* 4. Handwriting */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <BookOpen className="mr-2 h-4 w-4" /> Handwriting
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-64 bg-background z-50">
                              <DropdownMenuItem onClick={() => window.open("https://docs.google.com/drawings/create", "_blank", "noopener,noreferrer")}>
                                ✍️ Google Docs Draw
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>


                  {/* 5. Domestic Ecology Stories */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <TreePine className="mr-2 h-4 w-4" /> Domestic Ecology Stories
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-60 bg-background z-50">
                        <DropdownMenuItem onClick={() => navigate("/domestic-ecology?category=kids-conceptual-stories")}>Kids' Conceptual Stories</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/domestic-ecology?category=garden-species")}>Garden Species</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/domestic-ecology?category=grass-species")}>Grass Species</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/domestic-ecology?category=water-pond-species")}>Water Pond Species</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  {/* 6. Child Behavior */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserCheck className="mr-2 h-4 w-4" /> Child Behavior
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-60 bg-background z-50">
                        <DropdownMenuItem onClick={() => { setPersonalityTab("ages"); setPersonalityOpen(true); }}>
                          Ages and Stages
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setPersonalityTab("individuality"); setPersonalityOpen(true); }}>
                          Individuality
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  {/* 7. Foundational Learning Outcomes */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <FileText className="mr-2 h-4 w-4" /> Foundational Learning Outcomes
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-60 bg-background z-50">
                        <DropdownMenuItem onClick={() => setLearnerPlayIndexOpen(true)}>
                          <ClipboardCheck className="mr-2 h-4 w-4" /> Learner Play Index
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setShowProgressDialog(true)}>
                          <FileText className="mr-2 h-4 w-4" /> Learner Review
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/learner-progress-report?band=04-05")}>
                          <FileText className="mr-2 h-4 w-4" /> Learner Progress Report (04 - 05)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/learner-progress-report?band=06-07")}>
                          <FileText className="mr-2 h-4 w-4" /> Learner Progress Report (06 - 07)
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  {/* Assignments — direct page with red alert */}
                  <AssignmentsNavItem ageGroup="08-12" onOpen={() => navigate("/assignments?age=08-12")} />

                  {/* Users' Reviews */}
                  <DropdownMenuItem onClick={() => navigate("/users-media")}>
                    <Film className="mr-2 h-4 w-4" /> Users' Reviews
                  </DropdownMenuItem>

                  {/* 8. News */}
                  <DropdownMenuItem onClick={() => toast({ title: "News", description: "Coming soon." })}>
                    <Newspaper className="mr-2 h-4 w-4" /> News
                  </DropdownMenuItem>

                  {/* 9. Events */}
                  <DropdownMenuItem onClick={() => navigate("/ecd-expo-2026")}>
                    <CalendarDays className="mr-2 h-4 w-4" /> Events
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/" aria-label="Home" className="hover:opacity-80 transition-opacity">
                <img src="/lovable-uploads/6f846a04-7251-473a-8a8d-adf8aa1bb9c1.png" alt="ECDcoding Logo" className="w-52 h-36 md:w-60 md:h-40 object-contain cursor-pointer" />
              </Link>
            </div>
            <h1 className="text-2xl font-bold mb-1">Learning the Basics</h1>
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
                      <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                              🎵 Music Training
                              <ChevronDown className="h-4 w-4" />
                            </DropdownMenuItem>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Kandinsky (Art + Music)', 'https://musiclab.chromeexperiments.com/Kandinsky/')}>
                              🎨 Kandinsky (Art + Music)
                            </DropdownMenuItem>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🎹 Piano
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🥁 Rhythm
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🔊 Sound Science
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                            <DropdownMenuItem className="font-medium text-white hover:bg-white/20" onClick={() => openMusicLab('Strings', 'https://musiclab.chromeexperiments.com/Strings/')}>
                              🎻 Strings
                            </DropdownMenuItem>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <DropdownMenuItem className="font-medium text-white hover:bg-white/20 flex items-center justify-between cursor-pointer">
                                  🎤 Voice
                                  <ChevronDown className="h-4 w-4" />
                                </DropdownMenuItem>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent side="right" style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
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
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-medium text-white hover:bg-white/20 data-[state=open]:bg-white/20">
                    👨‍👩‍👧‍👦 Parents
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="font-medium text-white hover:bg-white/20 data-[state=open]:bg-white/20">
                        🧠 Child Behavior
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                        <DropdownMenuItem onClick={() => { setSelectedAge("8"); setParentsOpen(true); }} className="font-medium text-white hover:bg-white/20">
                          🎯 08 Year Old's
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedAge("9"); setParentsOpen(true); }} className="font-medium text-white hover:bg-white/20">
                          🌟 Nine Year Old's
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedAge("10"); setParentsOpen(true); }} className="font-medium text-white hover:bg-white/20">
                          💪 Ten Year Old's
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold justify-start text-left flex items-center gap-2">
                  Numeracy
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                <DropdownMenuItem
                  onClick={() => { setNumeracyOp("addition"); setNumeracyOpen(true); }}
                  className="font-medium text-white hover:bg-white/20"
                >
                  ➕ Addition
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => { setNumeracyOp("division"); setNumeracyOpen(true); }}
                  className="font-medium text-white hover:bg-white/20"
                >
                  ➗ Division
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => { setNumeracyOp("subtraction"); setNumeracyOpen(true); }}
                  className="font-medium text-white hover:bg-white/20"
                >
                  ➖ Minus
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-medium text-white hover:bg-white/20 focus:bg-white/20 data-[state=open]:bg-white/20">
                    ✖️ Multiplication
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent style={{ backgroundColor: "#252045" }} className="border border-gray-200 shadow-lg z-50">
                    <DropdownMenuItem
                      onClick={() => window.open('https://www.free-training-tutorial.com/times-tables/multiplication-airplanes.html', '_blank')}
                      className="font-medium text-white hover:bg-white/20"
                    >
                      ✈️ Multiplication Airplanes
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => { setNumeracyOp("multiplication"); setNumeracyOpen(true); }}
                      className="font-medium text-white hover:bg-white/20"
                    >
                      🧮 Multiplication Practice
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border-cyan-400/40 hover:bg-cyan-500/30 font-bold justify-start text-left flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  Tech Skills
                  <ChevronDown className="h-4 w-4" />
                  <Badge className="ml-1 bg-cyan-500 text-white text-[10px] px-1.5">NEW</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-cyan-400/30 shadow-lg z-50 min-w-[220px]">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-medium text-white hover:bg-purple-500/20 data-[state=open]:bg-purple-500/20">
                    💻 Coding
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent style={{ backgroundColor: "#252045" }} className="border border-amber-400/30 shadow-lg z-50">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="font-medium text-white hover:bg-cyan-500/20 data-[state=open]:bg-cyan-500/20">
                          🧱 Blockly
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent style={{ backgroundColor: "#252045" }} className="border border-cyan-400/30 shadow-lg z-50">
                            <DropdownMenuItem
                              onClick={() => {
                                setCodeEditorTitle('Blockly Code Editor');
                                setCodeEditorDescription('Build your first program using blocks (no internet needed).');
                                setCodeEditorOpen(true);
                              }}
                              className="font-medium text-white hover:bg-cyan-500/20 flex items-center gap-2 cursor-pointer"
                            >
                              🧩 Blockly Code Editor
                              <Badge className="ml-1 bg-green-500 text-white text-[8px] px-1">Built-in</Badge>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openCodeEditor('Blockly Games', 'https://blockly.games/?lang=en', 'Fun coding games built with Blockly')}
                              className="font-medium text-white hover:bg-cyan-500/20 flex items-center gap-2 cursor-pointer"
                            >
                              🎮 Blockly Games
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-medium text-white hover:bg-amber-500/20 data-[state=open]:bg-amber-500/20">
                    🔐 Cryptography
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent style={{ backgroundColor: "#252045" }} className="border border-amber-400/30 shadow-lg z-50">
                      <DropdownMenuItem
                        onClick={() => setCryptogramOpen(true)}
                        className="font-medium text-white hover:bg-amber-500/20 cursor-pointer"
                      >
                        🔑 Creating Crypto Secrets
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="font-medium text-white hover:bg-purple-500/20 data-[state=open]:bg-purple-500/20">
                    🔌 Micro:bit
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent style={{ backgroundColor: "#252045" }} className="border border-purple-400/30 shadow-lg z-50">
                      <DropdownMenuItem
                        onClick={() => setMicrobitAnalysisOpen(true)}
                        className="font-medium text-white hover:bg-purple-500/20"
                      >
                        🔬 Micro:bit Analysis (with Voice)
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openCodeEditor('Micro:bit Classroom', 'https://classroom.microbit.org/', 'Collaborative coding for classrooms')}
                        className="font-medium text-white hover:bg-purple-500/20"
                      >
                        🏫 Micro:bit Classroom
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openCodeEditor('Micro:bit MakeCode', 'https://makecode.microbit.org/', 'Program BBC micro:bit with blocks or JavaScript')}
                        className="font-medium text-white hover:bg-purple-500/20"
                      >
                        💡 Micro:bit Editor
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Coding — 08-12 only */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-gradient-to-r from-amber-500/20 to-pink-500/20 text-white border-amber-400/40 hover:bg-amber-500/30 font-bold justify-start text-left flex items-center gap-2">
                  <Code className="h-4 w-4 text-amber-300" />
                  Coding
                  <ChevronDown className="h-4 w-4" />
                  <Badge className="ml-1 bg-amber-500 text-white text-[10px] px-1.5">NEW</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ backgroundColor: "#252045" }} className="border border-amber-400/30 shadow-lg z-50 min-w-[240px]">
                <DropdownMenuItem onClick={() => setMicrobitAnalysisOpen(true)} className="font-medium text-white hover:bg-white/20">
                  🔬 Micro:bit Analysis
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCodeEditorTitle('Blockly Code Editor');
                    setCodeEditorDescription('Build your first program using blocks (no internet needed).');
                    setCodeEditorOpen(true);
                  }}
                  className="font-medium text-white hover:bg-white/20"
                >
                  🧩 Blockly Code Editor
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openCodeEditor('Blockly Games', 'https://blockly.games/?lang=en', 'Fun coding games built with Blockly')}
                  className="font-medium text-white hover:bg-white/20"
                >
                  🎮 Blockly Games
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openCodeEditor('Scratch', 'https://scratch.mit.edu/projects/editor/', 'Create stories, games and animations with Scratch')}
                  className="font-medium text-white hover:bg-white/20"
                >
                  🐱 Scratch
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => openCodeEditor('Micro:bit MakeCode', 'https://makecode.microbit.org/', 'Program BBC micro:bit with blocks or JavaScript')}
                  className="font-medium text-white hover:bg-white/20"
                >
                  💡 Micro:bit Editor
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>

      </main>

      {/* Music Lab Wrapper Dialog */}
      <MusicLabWrapper
        isOpen={musicLabOpen}
        onClose={() => setMusicLabOpen(false)}
        title={musicLabTitle}
        url={musicLabUrl}
      />

      {/* Blockly Code Editor Dialog */}
      <BlocklyEditor
        isOpen={codeEditorOpen}
        onClose={() => setCodeEditorOpen(false)}
        title={codeEditorTitle}
        description={codeEditorDescription}
      />

      {/* Micro:bit Analysis Narrator Dialog */}
      <MicrobitAnalysisNarrator
        isOpen={microbitAnalysisOpen}
        onClose={() => setMicrobitAnalysisOpen(false)}
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

      {/* Coding in Alphabets Dialog */}
      <Dialog open={codingDialogOpen} onOpenChange={(open) => {
        setCodingDialogOpen(open);
        if (!open) {
          setCurrentAlphabetIndex(0);
          setWordToCode('');
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

      {/* Cryptogram Secrets Dialog */}
      <Dialog open={cryptogramOpen} onOpenChange={(open) => {
        setCryptogramOpen(open);
        if (!open) {
          setCryptogramWord('');
          setCryptogramSecretStyle('mixed');
        }
      }}>
        <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              🔑 Cryptogram Secret Generator
            </DialogTitle>
            <DialogDescription>
              Letters A–J can also be numbers (A=1, B=2...J=10). Mix them to create secret codes!
            </DialogDescription>
          </DialogHeader>

          {/* Reference table */}
          <div className="flex justify-center gap-1 flex-wrap">
            {hexLetters.split('').map((letter, i) => (
              <div key={letter} className="flex flex-col items-center bg-muted rounded-lg px-3 py-2">
                <span className="text-lg font-bold text-primary">{letter}</span>
                <span className="text-xs text-muted-foreground">{letter.toLowerCase()}</span>
                <span className="text-sm font-mono font-bold">{i + 1}</span>
              </div>
            ))}
          </div>

          {/* Word input */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-center">Type a word using A–J letters, or pick one:</p>
            <Input
              placeholder="e.g. DAD, CAFE, BEEF"
              value={cryptogramWord}
              onChange={(e) => setCryptogramWord(e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 10))}
              onClick={(e) => e.stopPropagation()}
              className="text-center font-bold text-lg"
            />
            <div className="flex flex-wrap gap-1.5 justify-center">
              {cryptogramPresetWords.map(word => (
                <Button
                  key={word}
                  variant={cryptogramWord === word ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setCryptogramWord(word)}
                >
                  {word}
                </Button>
              ))}
            </div>
          </div>

          {/* Secret output */}
          {cryptogramWord && (
            <div className="space-y-3 border-t pt-4">
              {/* Breakdown */}
              <div className="text-center">
                <p className="text-sm font-semibold mb-1">Letter Breakdown:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {cryptogramWord.split('').map((letter, i) => (
                    <div key={i} className="flex flex-col items-center bg-muted rounded-lg px-3 py-2">
                      <span className="text-lg font-bold">{letter}</span>
                      <span className="text-xs text-muted-foreground">= {letter.charCodeAt(0) - 64}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Style picker */}
              <div className="flex justify-center gap-2">
                <Button size="sm" variant={cryptogramSecretStyle === 'mixed' ? 'default' : 'outline'} onClick={() => setCryptogramSecretStyle('mixed')}>
                  Mixed
                </Button>
                <Button size="sm" variant={cryptogramSecretStyle === 'numbers' ? 'default' : 'outline'} onClick={() => setCryptogramSecretStyle('numbers')}>
                  All Numbers
                </Button>
                <Button size="sm" variant={cryptogramSecretStyle === 'lowercase' ? 'default' : 'outline'} onClick={() => setCryptogramSecretStyle('lowercase')}>
                  Lowercase
                </Button>
              </div>

              {/* Generated secret */}
              <div className="text-center bg-accent/30 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Your Secret Code:</p>
                <p className="text-3xl font-mono font-bold text-primary tracking-widest">
                  {generateSecret(cryptogramWord, cryptogramSecretStyle)}
                </p>
              </div>

              {/* Potential secrets */}
              <div className="text-center">
                <p className="text-sm font-semibold mb-2">🔒 Potential Secret Variations:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {getAllSecretVariants(cryptogramWord).map((variant, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-sm px-3 py-1">
                      {variant}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>


      {/* Notes to Parents Dialog */}
      <Dialog open={parentsOpen} onOpenChange={setParentsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "#313056" }}>
          <DialogHeader>
            <DialogTitle className="text-white text-xl text-center flex items-center justify-center gap-2">
              👨‍👩‍👧‍👦 Child Behavior — {selectedAge === "8" ? "Eight-Year-Olds" : selectedAge === "9" ? "Nine-Year-Olds" : "Ten-Year-Olds"}
            </DialogTitle>
            <DialogDescription className="text-white/70 text-center">
              Understanding your child's developmental stage helps you support them better.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedAge === "8" && (
              <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center gap-2">🎯 Eight-Year-Olds</h3>
                <ul className="space-y-2 text-white/90 text-sm leading-relaxed">
                  <li className="flex gap-2"><span className="text-yellow-300 mt-0.5">•</span><span>They are more resilient when they make mistakes.</span></li>
                  <li className="flex gap-2"><span className="text-yellow-300 mt-0.5">•</span><span>Their peers' and teachers' approval is very important to them.</span></li>
                  <li className="flex gap-2"><span className="text-yellow-300 mt-0.5">•</span><span>They may begin comparing themselves to others.</span></li>
                  <li className="flex gap-2"><span className="text-yellow-300 mt-0.5">•</span><span>This is a key age to notice judgments about others and encourage compassionate remarks and thinking.</span></li>
                </ul>
              </div>
            )}
            {selectedAge === "9" && (
              <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center gap-2">🌟 Nine-Year-Olds</h3>
                <ul className="space-y-2 text-white/90 text-sm leading-relaxed">
                  <li className="flex gap-2"><span className="text-cyan-300 mt-0.5">•</span><span>They can become easily frustrated.</span></li>
                  <li className="flex gap-2"><span className="text-cyan-300 mt-0.5">•</span><span>They need directions that contain one instruction at a time.</span></li>
                  <li className="flex gap-2"><span className="text-cyan-300 mt-0.5">•</span><span>They may worry about peer approval and their own appearance and interests.</span></li>
                  <li className="flex gap-2"><span className="text-cyan-300 mt-0.5">•</span><span>They require practice with perspective taking and empathy.</span></li>
                </ul>
              </div>
            )}
            {selectedAge === "10" && (
              <div className="bg-white/10 rounded-xl p-5 border border-white/10">
                <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center gap-2">💪 Ten-Year-Olds</h3>
                <ul className="space-y-2 text-white/90 text-sm leading-relaxed">
                  <li className="flex gap-2"><span className="text-green-300 mt-0.5">•</span><span>They are developing a strong sense of right and wrong and fairness.</span></li>
                  <li className="flex gap-2"><span className="text-green-300 mt-0.5">•</span><span>They tend to be able to work through conflicts with friends more rapidly.</span></li>
                  <li className="flex gap-2"><span className="text-green-300 mt-0.5">•</span><span>You can build on that sense of fairness by discussing race, gender, and other ways people can be marginalized and what they can do to stand up for others.</span></li>
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ECD AI Copilot */}
      <AssistantHub context="My Lesson Vault (Ages 08-12)" />

      <PersonalityVerification
        open={personalityOpen}
        onOpenChange={setPersonalityOpen}
        initialTab={personalityTab}
      />

      <LearnerPlayIndex open={learnerPlayIndexOpen} onOpenChange={setLearnerPlayIndexOpen} />

      <NumeracyPracticeDialog
        open={numeracyOpen}
        onOpenChange={setNumeracyOpen}
        operation={numeracyOp}
      />
    </div>
  );
};

export default LessonVault0710;