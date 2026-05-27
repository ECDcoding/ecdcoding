import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Users, Building2, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Star, Gift, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";

// Import images for free class cards
import dumpTruckIcon from "@/assets/transport/dump-truck.png";
import girlBodyMyBody from "@/assets/girl-body-my-body.jpg";
import shapesBasicColor from "@/assets/shapes-basic-color.png";
import wildAnimalsChart from "@/assets/wild-animals-chart.jpg";
import alphabetChart from "@/assets/alphabet-chart.jpg";

interface Lesson {
  id: string;
  title: string;
  subItems: string[];
  isSpecial?: boolean;
}

const lessons: Lesson[] = [
  { id: "numeracy", title: "Numeracy", subItems: ["Counting 1-10", "Basic Addition", "Number Recognition"] },
  { id: "free-class", title: "30 Day Free Trial", subItems: ["Transportation", "My Body", "Shapes", "Animals", "ABC Chart"], isSpecial: true },
  { id: "literacy", title: "Literacy", subItems: ["ABC Chart", "Letter Sounds", "Simple Words"] },
  { id: "note-of-week", title: "Note of the Week", subItems: ["Weekly Song", "Music Basics"] },
  { id: "life-skills", title: "Life Skills", subItems: ["My Body", "Five Senses", "Daily Routines"] },
  { id: "tech-skills", title: "Tech Skills", subItems: ["AI Logic", "Coding in Alphabets"] },
  { id: "transportation", title: "Transportation", subItems: ["Road Vehicles", "Water Transport", "Air Transport"] },
  { id: "road-safety", title: "Road Safety", subItems: ["Traffic Lights", "Road Signs", "Crossing Safely"] },
  { id: "science", title: "Science and Discovery", subItems: ["Animals", "Plants", "Weather"] },
];

interface FreeClassCard {
  id: string;
  title: string;
  image: string;
  color: string;
  description: string;
  route: string;
}

const freeClassCards: FreeClassCard[] = [
  { id: "transportation", title: "Transportation", image: dumpTruckIcon, color: "from-blue-500 to-cyan-400", description: "Learn about vehicles that move us around!", route: "/transportation" },
  { id: "my-body", title: "My Body", image: girlBodyMyBody, color: "from-pink-500 to-rose-400", description: "Discover the amazing human body!", route: "/lesson-vault-04-06#my-body" },
  { id: "shapes", title: "Shapes", image: shapesBasicColor, color: "from-green-500 to-emerald-400", description: "Explore circles, squares and more!", route: "/lesson-vault-04-06#shapes" },
  { id: "animals", title: "Animals", image: wildAnimalsChart, color: "from-orange-500 to-amber-400", description: "Meet wild and domestic animals!", route: "/biology-nature" },
  { id: "abc-chart", title: "ABC Chart", image: alphabetChart, color: "from-purple-500 to-violet-400", description: "Learn the alphabet with fun!", route: "/lesson-vault-04-06#abc-chart" },
];

interface LessonPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ageGroup: "04-07" | "08-12" | null;
}

const LessonPreviewDialog = ({ open, onOpenChange, ageGroup }: LessonPreviewDialogProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [showFreeClassDialog, setShowFreeClassDialog] = useState(false);
  const [showSignInPromptDialog, setShowSignInPromptDialog] = useState(false);
  const [showTrialSplash, setShowTrialSplash] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [pendingFreeClassCard, setPendingFreeClassCard] = useState<FreeClassCard | null>(null);
  const [openLessons, setOpenLessons] = useState<string[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const targetRoute = ageGroup === "04-07" ? "/lesson-vault-04-06" : "/lesson-vault-07-10";

  // When user clicks Kids Aged 04-07, show the "30 Day Free Trial" splash for 3s,
  // then auto-launch the slide show carousel.
  useEffect(() => {
    if (open && ageGroup === "04-07") {
      setShowTrialSplash(true);
      const timer = setTimeout(() => {
        setShowTrialSplash(false);
        setShowFreeClassDialog(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (!open) {
      setShowTrialSplash(false);
    }
  }, [open, ageGroup]);

  const handleFreeClassCardClick = (card: FreeClassCard) => {
    if (user) {
      // User is logged in, navigate directly
      setShowFreeClassDialog(false);
      onOpenChange(false);
      navigate(card.route);
    } else {
      // Not logged in, show registration dialog (same as other lessons)
      setPendingFreeClassCard(card);
      setShowFreeClassDialog(false);
      setSelectedLesson({ id: card.id, title: card.title, subItems: [] });
      setShowRegistrationDialog(true);
    }
  };

  const toggleLesson = (lessonId: string) => {
    setOpenLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.id === "free-class") {
      setShowFreeClassDialog(true);
      return;
    }
    
    if (user) {
      onOpenChange(false);
      navigate(targetRoute);
    } else {
      setSelectedLesson(lesson);
      setShowRegistrationDialog(true);
    }
  };

  const handleRegistrationTypeSelect = (type: "parent" | "ecd") => {
    setShowRegistrationDialog(false);
    setShowSignInPromptDialog(false);
    onOpenChange(false);
    navigate(`/register?type=${type}`);
  };

  const handleSignIn = () => {
    setShowSignInPromptDialog(false);
    onOpenChange(false);
    navigate('/sign-in');
  };

  const handleBackToLessons = () => {
    setShowRegistrationDialog(false);
    setSelectedLesson(null);
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % freeClassCards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + freeClassCards.length) % freeClassCards.length);
  };

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    if (!showFreeClassDialog) return;
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % freeClassCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showFreeClassDialog]);

  return (
    <>
      <Dialog open={open && !showRegistrationDialog && !showFreeClassDialog && !showSignInPromptDialog} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {ageGroup === "04-07" ? "Kids Aged 4-7 Lessons" : "Kids Aged 8-12 Lessons"}
            </DialogTitle>
            <DialogDescription className="text-center">
              Explore our fun and interactive lessons. Click on any lesson to get started!
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
            {lessons.map((lesson) => (
              <Collapsible
                key={lesson.id}
                open={openLessons.includes(lesson.id)}
                onOpenChange={() => lesson.isSpecial ? handleLessonClick(lesson) : toggleLesson(lesson.id)}
              >
                <CollapsibleTrigger className="w-full">
                  {lesson.isSpecial ? (
                    <div className="relative w-full px-4 py-5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-500/90 rounded-lg border-2 border-yellow-400/70 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.04] overflow-hidden group animate-pulse-subtle">
                       {/* Orbiting stars */}
                       <div className="absolute top-0 left-1 animate-spin-slow">
                         <Star className="h-3 w-3 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
                       </div>
                       <div className="absolute top-0 right-3 animate-bounce" style={{ animationDelay: '0.3s' }}>
                         <Star className="h-4 w-4 text-yellow-200 fill-yellow-200 drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]" />
                       </div>
                       <div className="absolute bottom-0 left-4 animate-ping" style={{ animationDuration: '2s' }}>
                         <Sparkles className="h-3 w-3 text-yellow-300" />
                       </div>
                       <div className="absolute bottom-1 right-1 animate-bounce" style={{ animationDelay: '0.7s' }}>
                         <Star className="h-3 w-3 text-white fill-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                       </div>
                       <div className="absolute top-1/2 left-0 -translate-y-1/2 animate-ping" style={{ animationDuration: '3s' }}>
                         <Sparkles className="h-3 w-3 text-pink-200" />
                       </div>
                       <div className="absolute top-1/2 right-0 -translate-y-1/2 animate-pulse">
                         <Sparkles className="h-4 w-4 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.7)]" />
                       </div>
                       
                       {/* Continuous shimmer sweep */}
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                       
                       {/* Glowing border pulse */}
                       <div className="absolute inset-0 rounded-lg border-2 border-yellow-300/50 animate-pulse" />
                       
                       <div className="relative z-10 flex items-center justify-center gap-2">
                         <Gift className="h-5 w-5 text-yellow-200 animate-bounce" />
                         <span className="font-extrabold text-sm text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                           {lesson.title}
                         </span>
                         <Gift className="h-5 w-5 text-yellow-200 animate-bounce" style={{ animationDelay: '0.5s' }} />
                       </div>
                       <p className="relative z-10 text-[10px] text-white/90 mt-1 font-medium text-center">
                         ✨ With an option to reload credits with PayFast ✨
                       </p>
                     </div>
                  ) : (
                    <div className="flex items-center justify-between w-full px-4 py-3 bg-muted/50 hover:bg-muted rounded-lg border border-border transition-colors">
                      <span className="font-medium text-sm">{lesson.title}</span>
                      <ChevronDown 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openLessons.includes(lesson.id) ? "rotate-180" : ""
                        }`} 
                      />
                    </div>
                  )}
                </CollapsibleTrigger>
                {!lesson.isSpecial && (
                  <CollapsibleContent className="mt-1">
                    <div className="pl-4 space-y-1">
                      {lesson.subItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleLessonClick(lesson)}
                          className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Free Class Carousel Dialog */}
      <Dialog open={showFreeClassDialog} onOpenChange={setShowFreeClassDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
               30 Day Free Trial
               <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Enjoy 30 days of free learning! Reload credits anytime with PayFast.
            </DialogDescription>
          </DialogHeader>
          
          <div className="relative py-8">
            {/* Carousel Container */}
            <div className="relative flex items-center justify-center" ref={carouselRef}>
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10 h-12 w-12 rounded-full bg-background/80 shadow-lg hover:bg-background"
                onClick={prevCard}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              {/* Cards Display */}
              <div className="flex items-center justify-center gap-4 px-16 overflow-hidden">
                {freeClassCards.map((card, index) => {
                  const isActive = index === currentCardIndex;
                  const isPrev = index === (currentCardIndex - 1 + freeClassCards.length) % freeClassCards.length;
                  const isNext = index === (currentCardIndex + 1) % freeClassCards.length;
                  const isVisible = isActive || isPrev || isNext;

                  if (!isVisible) return null;

                  return (
                    <Card
                      key={card.id}
                      onClick={() => handleFreeClassCardClick(card)}
                      className={`cursor-pointer transition-all duration-500 transform ${
                        isActive 
                          ? "scale-110 z-20 shadow-2xl" 
                          : "scale-90 opacity-60 z-10"
                      } ${isActive ? "ring-4 ring-primary ring-offset-2" : ""}`}
                      style={{
                        minWidth: isActive ? "280px" : "200px",
                        maxWidth: isActive ? "280px" : "200px",
                      }}
                    >
                      <div className={`h-2 bg-gradient-to-r ${card.color} rounded-t-lg`} />
                      <CardContent className="p-4">
                        <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          )}
                        </div>
                        <h3 className={`font-bold text-center mb-2 ${isActive ? "text-lg" : "text-sm"}`}>
                          {card.title}
                        </h3>
                        {isActive && (
                          <p className="text-sm text-muted-foreground text-center">
                            {card.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 z-10 h-12 w-12 rounded-full bg-background/80 shadow-lg hover:bg-background"
                onClick={nextCard}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {freeClassCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCardIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCardIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                setShowFreeClassDialog(false);
                setShowRegistrationDialog(true);
              }}
              className="text-sm font-bold bg-lime-500 hover:bg-lime-600 text-white"
            >
              Register
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Registration Dialog */}
      <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Register to Get Started</DialogTitle>
            <DialogDescription className="text-center">
              {selectedLesson && (
                <span>
                  To access <strong>{selectedLesson.title}</strong>, please register first
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              size="lg"
              className="w-full py-6 text-lg flex items-center justify-center gap-3"
              variant="outline"
              onClick={() => handleRegistrationTypeSelect("parent")}
            >
              <Users className="h-6 w-6" />
              Parent / Guardian
            </Button>
            <Button
              size="lg"
              className="w-full py-6 text-lg flex items-center justify-center gap-3"
              variant="outline"
              onClick={() => handleRegistrationTypeSelect("ecd")}
            >
              <Building2 className="h-6 w-6" />
              ECD Manager
            </Button>
            <Button
              variant="ghost"
              className="text-sm"
              onClick={handleBackToLessons}
            >
              ← Back to lessons
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign In Prompt Dialog */}
      <Dialog open={showSignInPromptDialog} onOpenChange={(open) => {
        setShowSignInPromptDialog(open);
        if (!open) setPendingFreeClassCard(null);
      }}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-background via-background to-primary/5">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Sign In to Continue</DialogTitle>
            <DialogDescription className="text-center">
              {pendingFreeClassCard 
                ? `To access "${pendingFreeClassCard.title}", please sign in or create an account.`
                : "Please sign in or create an account to access free lessons."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              size="lg"
              className="w-full py-6 text-lg flex items-center justify-center gap-3"
              onClick={handleSignIn}
            >
              <LogIn className="h-5 w-5" />
              Sign In
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or register as</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full py-6 text-lg flex items-center justify-center gap-3"
              variant="outline"
              onClick={() => handleRegistrationTypeSelect("parent")}
            >
              <Users className="h-5 w-5" />
              Parent / Guardian
            </Button>
            <Button
              size="lg"
              className="w-full py-6 text-lg flex items-center justify-center gap-3"
              variant="outline"
              onClick={() => handleRegistrationTypeSelect("ecd")}
            >
              <Building2 className="h-5 w-5" />
              ECD Manager
            </Button>
            <Button
              variant="ghost"
              className="text-sm"
              onClick={() => {
                setShowSignInPromptDialog(false);
                setShowFreeClassDialog(true);
                setPendingFreeClassCard(null);
              }}
            >
              ← Back to free classes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LessonPreviewDialog;