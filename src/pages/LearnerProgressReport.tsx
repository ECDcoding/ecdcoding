import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  BookOpen,
  Loader2,
  Share2,
  Copy,
  Printer,
  ArrowLeft,
  FileText,
} from "lucide-react";

type LessonOption = { id: string; title: string; category: string };

const LESSON_CATALOG: LessonOption[] = [
  { id: "numeracy", title: "Numeracy", category: "Learning the Basics" },
  { id: "literacy", title: "Literacy (ABC & Vowels)", category: "Learning the Basics" },
  { id: "life-skills", title: "Life Skills", category: "Learning the Basics" },
  { id: "tech-skills", title: "Tech Skills", category: "Learning the Basics" },
  { id: "road-safety", title: "Road Safety", category: "Learning the Basics" },
  { id: "transportation", title: "Transportation", category: "Learning the Basics" },
  { id: "note-of-week", title: "Note of the Week", category: "Learning the Basics" },
  { id: "card-animals", title: "Animals", category: "Carousel Cards" },
  { id: "card-my-body", title: "My Body", category: "Carousel Cards" },
  { id: "card-shapes", title: "Shapes", category: "Carousel Cards" },
  { id: "card-months", title: "Months of the Year", category: "Carousel Cards" },
  { id: "card-traffic-robot", title: "Traffic Robot", category: "Carousel Cards" },
  { id: "card-transport", title: "Transport Vehicles", category: "Carousel Cards" },
  { id: "science-human-body", title: "Human Body", category: "Science & Discovery" },
  { id: "science-five-senses", title: "Five Senses", category: "Science & Discovery" },
  { id: "science-animals", title: "Wild & Domestic Animals", category: "Science & Discovery" },
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

const MIN_PICK = 1;

const LearnerProgressReport = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(30);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/sign-in");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("lesson_baskets")
        .select("lessons, duration_days")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setSelected(data.lessons || []);
        setDuration(data.duration_days || 30);
      }
      setLoading(false);
    };
    if (user) load();
  }, [user]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const learnerName = useMemo(() => {
    const fn = (profile as any)?.learner_first_name || profile?.first_name || "";
    const ln = (profile as any)?.learner_last_name || profile?.last_name || "";
    return `${fn} ${ln}`.trim() || "Learner";
  }, [profile]);

  const periodLabel = DURATIONS.find((d) => d.days === duration)?.label || `${duration} days`;

  const buildShareText = () => {
    const titles = LESSON_CATALOG.filter((l) => selected.includes(l.id)).map((l) => `• ${l.title}`);
    const today = new Date().toLocaleDateString();
    return [
      `Learner Progress Report`,
      `Learner: ${learnerName}`,
      `Reporting period: ${periodLabel}`,
      `Issued: ${today}`,
      ``,
      `Lessons covered (${titles.length}):`,
      ...titles,
      ...(notes ? [``, `Notes:`, notes] : []),
      ``,
      `— ECDcoding`,
    ].join("\n");
  };

  const handleSave = async () => {
    if (!user) return;
    if (selected.length < MIN_PICK) {
      toast({ title: `Tick at least one lesson covered`, variant: "destructive" });
      return;
    }
    setSaving(true);
    const startsAt = new Date();
    const expiresAt = new Date(startsAt.getTime() + duration * 24 * 60 * 60 * 1000);
    const { error } = await supabase.from("lesson_baskets").upsert(
      {
        user_id: user.id,
        lessons: selected,
        duration_days: duration,
        starts_at: startsAt.toISOString(),
        expires_at: expiresAt.toISOString(),
      },
      { onConflict: "user_id" }
    );
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Progress report saved", description: `Reporting period: ${periodLabel}.` });
  };

  const handleShare = async () => {
    const text = buildShareText();
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({ title: "Learner Progress Report", text });
      } else {
        await navigator.clipboard.writeText(text);
        toast({ title: "Report copied to clipboard" });
      }
    } catch {
      /* user cancelled */
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildShareText());
    toast({ title: "Report copied to clipboard" });
  };

  const handlePrint = () => window.print();

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
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Learner FLC Progress Report</h1>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tick the lessons <span className="font-semibold">{learnerName}</span> has covered, set
            the reporting period, add notes, then share the report with anyone — parent, teacher,
            school or sponsor.
          </p>
          <Badge variant="secondary" className="mt-3 text-base">
            {selected.length} lessons covered
          </Badge>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <Label className="text-base font-semibold mb-3 block">Reporting period</Label>
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
                      </Label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <Label htmlFor="report-notes" className="text-base font-semibold mb-3 block">
              Notes for the recipient (optional)
            </Label>
            <Textarea
              id="report-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Strengths, areas to improve, attendance, milestones…"
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="sticky bottom-4 mt-8 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            onClick={handleSave}
            disabled={saving || selected.length < MIN_PICK}
            className="bg-lime-500 hover:bg-lime-600 text-white px-8 shadow-lg"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save Report
          </Button>
          <Button size="lg" variant="outline" onClick={handleShare} disabled={selected.length < MIN_PICK}>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button size="lg" variant="outline" onClick={handleCopy} disabled={selected.length < MIN_PICK}>
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <Button size="lg" variant="outline" onClick={handlePrint} disabled={selected.length < MIN_PICK}>
            <Printer className="h-4 w-4 mr-2" /> Print / PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearnerProgressReport;
