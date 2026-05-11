import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, BookOpen, Loader2, Star, AlertCircle } from "lucide-react";

type LessonOption = { id: string; title: string; category: string };

const LESSON_CATALOG: LessonOption[] = [
  // Learning the Basics
  { id: "numeracy", title: "Numeracy", category: "Learning the Basics" },
  { id: "literacy", title: "Literacy (ABC & Vowels)", category: "Learning the Basics" },
  { id: "life-skills", title: "Life Skills", category: "Learning the Basics" },
  { id: "tech-skills", title: "Tech Skills", category: "Learning the Basics" },
  { id: "road-safety", title: "Road Safety", category: "Learning the Basics" },
  { id: "transportation", title: "Transportation", category: "Learning the Basics" },
  { id: "note-of-week", title: "Note of the Week", category: "Learning the Basics" },
  // Carousel cards
  { id: "card-animals", title: "Animals", category: "Carousel Cards" },
  { id: "card-my-body", title: "My Body", category: "Carousel Cards" },
  { id: "card-shapes", title: "Shapes", category: "Carousel Cards" },
  { id: "card-months", title: "Months of the Year", category: "Carousel Cards" },
  { id: "card-traffic-robot", title: "Traffic Robot", category: "Carousel Cards" },
  { id: "card-transport", title: "Transport Vehicles", category: "Carousel Cards" },
  // Science & Discovery
  { id: "science-human-body", title: "Human Body", category: "Science & Discovery" },
  { id: "science-five-senses", title: "Five Senses", category: "Science & Discovery" },
  { id: "science-animals", title: "Wild & Domestic Animals", category: "Science & Discovery" },
  // Tech Skills detail
  { id: "coding-alphabets", title: "Coding in Alphabets", category: "Tech & Coding" },
  { id: "emoji-ai", title: "Emoji AI", category: "Tech & Coding" },
  { id: "facial-recognition", title: "Facial Recognition", category: "Tech & Coding" },
];

const DURATIONS = [
  { days: 7, label: "1 week" },
  { days: 14, label: "2 weeks" },
  { days: 30, label: "30 days" },
  { days: 60, label: "60 days" },
  { days: 90, label: "90 days" },
];

const MIN_PICK = 5;
const MAX_PICK = 10;

const LessonBasket = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(30);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [everSelected, setEverSelected] = useState<string[]>([]);
  const [triedLessons, setTriedLessons] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) navigate("/sign-in");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("lesson_baskets")
        .select("lessons, duration_days, ever_selected, tried_lessons")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setSelected(data.lessons || []);
        setDuration(data.duration_days || 30);
        setEverSelected((data as any).ever_selected || []);
        setTriedLessons((data as any).tried_lessons || []);
      }
      setLoading(false);
    };
    if (user) load();
  }, [user]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_PICK) {
        toast({ title: `You can pick up to ${MAX_PICK} lessons`, variant: "destructive" });
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleSave = async () => {
    if (!user) return;
    if (selected.length < MIN_PICK) {
      toast({ title: `Please pick at least ${MIN_PICK} lessons`, variant: "destructive" });
      return;
    }
    setSaving(true);
    const startsAt = new Date();
    const expiresAt = new Date(startsAt.getTime() + duration * 24 * 60 * 60 * 1000);
    const mergedEver = Array.from(new Set([...everSelected, ...selected]));
    const { error } = await supabase.from("lesson_baskets").upsert(
      {
        user_id: user.id,
        lessons: selected,
        duration_days: duration,
        starts_at: startsAt.toISOString(),
        expires_at: expiresAt.toISOString(),
        ever_selected: mergedEver,
        last_shown_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Lesson basket saved!", description: `Active for ${duration} days.` });
    navigate("/lesson-vault-04-06", { replace: true });
  };

  const grouped = LESSON_CATALOG.reduce<Record<string, LessonOption[]>>((acc, l) => {
    (acc[l.category] = acc[l.category] || []).push(l);
    return acc;
  }, {});

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Build Your Lesson Basket</h1>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Pick {MIN_PICK}–{MAX_PICK} lessons that match your child's interests. They'll form
            your personalised mini-app for the duration you choose.
          </p>
          <Badge variant="secondary" className="mt-3 text-base">
            {selected.length} / {MAX_PICK} selected
          </Badge>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <Label className="text-base font-semibold mb-3 block">How long should this basket last?</Label>
            <RadioGroup
              value={String(duration)}
              onValueChange={(v) => setDuration(Number(v))}
              className="grid grid-cols-2 sm:grid-cols-5 gap-3"
            >
              {DURATIONS.map((d) => (
                <Label
                  key={d.days}
                  htmlFor={`d-${d.days}`}
                  className={`flex items-center justify-center gap-2 border rounded-lg p-3 cursor-pointer transition ${
                    duration === d.days ? "border-primary bg-primary/10" : "border-border"
                  }`}
                >
                  <RadioGroupItem id={`d-${d.days}`} value={String(d.days)} />
                  {d.label}
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {Object.entries(grouped).map(([category, items]) => (
            <Card key={category}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">{category}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {items.map((l) => {
                    const isSel = selected.includes(l.id);
                    const isNew = !everSelected.includes(l.id);
                    const notTried = !isNew && !triedLessons.includes(l.id);
                    return (
                      <Label
                        key={l.id}
                        htmlFor={l.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                          isSel ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <Checkbox
                          id={l.id}
                          checked={isSel}
                          onCheckedChange={() => toggle(l.id)}
                        />
                        <span className="text-sm font-medium flex-1">{l.title}</span>
                        {isNew && (
                          <Badge className="bg-lime-500 hover:bg-lime-600 text-white gap-1">
                            <Star className="h-3 w-3" /> New
                          </Badge>
                        )}
                        {notTried && (
                          <Badge variant="outline" className="gap-1 border-amber-500 text-amber-600">
                            <AlertCircle className="h-3 w-3" /> Not tried
                          </Badge>
                        )}
                      </Label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="sticky bottom-4 mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={handleSave}
            disabled={saving || selected.length < MIN_PICK}
            className="bg-lime-500 hover:bg-lime-600 text-white px-10 shadow-lg"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save My Basket ({selected.length})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonBasket;