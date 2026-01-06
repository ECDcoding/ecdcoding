import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Users, Building2, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Lesson {
  id: string;
  title: string;
  subItems: string[];
}

const lessons: Lesson[] = [
  { id: "numeracy", title: "Numeracy", subItems: ["Counting 1-10", "Basic Addition", "Number Recognition"] },
  { id: "logic", title: "Basic Logic", subItems: ["Shapes", "Patterns", "Problem Solving"] },
  { id: "literacy", title: "Literacy", subItems: ["ABC Chart", "Letter Sounds", "Simple Words"] },
  { id: "note-of-week", title: "Note of the Week", subItems: ["Weekly Song", "Music Basics"] },
  { id: "life-skills", title: "Life Skills", subItems: ["My Body", "Five Senses", "Daily Routines"] },
  { id: "tech-skills", title: "Tech Skills", subItems: ["AI Logic", "Coding in Alphabets"] },
  { id: "transportation", title: "Transportation", subItems: ["Road Vehicles", "Water Transport", "Air Transport"] },
  { id: "road-safety", title: "Road Safety", subItems: ["Traffic Lights", "Road Signs", "Crossing Safely"] },
  { id: "science", title: "Science and Discovery", subItems: ["Animals", "Plants", "Weather"] },
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
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [openLessons, setOpenLessons] = useState<string[]>([]);

  const targetRoute = ageGroup === "04-07" ? "/lesson-vault-04-06" : "/lesson-vault-07-10";

  const toggleLesson = (lessonId: string) => {
    setOpenLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleLessonClick = (lesson: Lesson) => {
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
    onOpenChange(false);
    navigate(`/register?type=${type}`);
  };

  const handleBackToLessons = () => {
    setShowRegistrationDialog(false);
    setSelectedLesson(null);
  };

  return (
    <>
      <Dialog open={open && !showRegistrationDialog} onOpenChange={onOpenChange}>
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
                onOpenChange={() => toggleLesson(lesson.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full px-4 py-3 bg-muted/50 hover:bg-muted rounded-lg border border-border transition-colors">
                    <span className="font-medium text-sm">{lesson.title}</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openLessons.includes(lesson.id) ? "rotate-180" : ""
                      }`} 
                    />
                  </div>
                </CollapsibleTrigger>
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
              </Collapsible>
            ))}
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
    </>
  );
};

export default LessonPreviewDialog;
