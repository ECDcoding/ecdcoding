import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
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
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";
import {
  AGE_BANDS,
  AGE_BAND_LABELS,
  AgeBand,
  NUMBER_SENSE_AREAS,
  NUMBER_SENSE_LABELS,
  PLAY_AREAS,
  PLAY_LABELS,
  average,
  getIndexLevelLabel,
  isAgeBand,
  loadAssessment,
} from "@/lib/playIndex";
import {
  Sparkles,
  BookOpen,
  Loader2,
  Share2,
  Copy,
  Printer,
  ArrowLeft,
  FileText,
  BarChart3,
} from "lucide-react";

const indexChartConfig = {
  level: { label: "Index level", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

type LessonOption = { id: string; title: string; category: string };

/** FLC sub-categories (Category of Proof) as per the FLC Report framework. */
const FLC_CATEGORIES = [
  { key: "PoLAB", label: "Proof of Learning All the Basics", letter: "A" },
  { key: "PoVTS", label: "Proof of Verbal Testing Space", letter: "B" },
  { key: "PoCA", label: "Proof of Completing Assignments", letter: "C" },
  { key: "PoCNP", label: "Proof of Creating New Project", letter: "D" },
] as const;

const LESSON_CATALOG: LessonOption[] = [
  // A — Proof of Learning All the Basics (PoLAB)
  { id: "numeracy", title: "Numeracy", category: "PoLAB" },
  { id: "literacy", title: "Literacy (ABC & Vowels)", category: "PoLAB" },
  { id: "life-skills", title: "Life Skills", category: "PoLAB" },
  { id: "tech-skills", title: "Tech Skills", category: "PoLAB" },
  { id: "road-safety", title: "Road Safety", category: "PoLAB" },
  { id: "transportation", title: "All Modes of Transport", category: "PoLAB" },
  { id: "note-of-week", title: "Note of the Week", category: "PoLAB" },
  { id: "science-human-body", title: "Human Body", category: "PoLAB" },
  { id: "science-five-senses", title: "Five Senses", category: "PoLAB" },
  { id: "science-animals", title: "Wild & Domestic Animals", category: "PoLAB" },
  // B — Proof of Verbal Testing Space (PoVTS)
  { id: "card-animals", title: "Animals Analysis", category: "PoVTS" },
  { id: "card-my-body", title: "My Body Analysis", category: "PoVTS" },
  { id: "card-shapes", title: "Shapes Analysis", category: "PoVTS" },
  { id: "card-months", title: "Months of the Year Analysis", category: "PoVTS" },
  { id: "card-traffic-robot", title: "Traffic Robot Analysis", category: "PoVTS" },
  { id: "card-transport", title: "Transport Vehicles Analysis", category: "PoVTS" },
  { id: "card-produce", title: "Fruits & Vegetables Analysis", category: "PoVTS" },
  { id: "card-color-coding", title: "Color Coding Analysis", category: "PoVTS" },
  // C — Proof of Completing Assignments (PoCA)
  { id: "assign-basic-logic", title: "Basic Logic Assignment", category: "PoCA" },
  { id: "assign-facial-recognition", title: "Facial Recognition Assignment", category: "PoCA" },
  { id: "assign-emoji-ai", title: "Emoji AI Assignment", category: "PoCA" },
  { id: "assign-coding-alphabets", title: "Coding in Alphabets Assignment", category: "PoCA" },
  { id: "assign-numeracy-practice", title: "Numeracy Practice Assignment", category: "PoCA" },
  // D — Proof of Creating New Project (PoCNP)
  { id: "project-recycle-robot", title: "Recycle My Robot Build", category: "PoCNP" },
  { id: "project-blockly", title: "Blockly Mini Project", category: "PoCNP" },
  { id: "project-music-lab", title: "Music Lab Creation", category: "PoCNP" },
  { id: "project-own-idea", title: "Own Idea / Free Project", category: "PoCNP" },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const bandParam = searchParams.get("band");
  const band: AgeBand = isAgeBand(bandParam) ? bandParam : "04-05";
  const bandLabel = AGE_BAND_LABELS[band];
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(30);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState<string>("");

  // Index results recorded in the Learner Play Index for this age group.
  const assessment = useMemo(() => loadAssessment(band), [band]);
  const playChartData = PLAY_AREAS.map((area) => ({
    area: PLAY_LABELS[area],
    fullArea: area,
    level: assessment.playLevels[area],
  }));
  const numberSenseChartData = NUMBER_SENSE_AREAS.map((area) => ({
    area: NUMBER_SENSE_LABELS[area],
    fullArea: area,
    level: assessment.numberSenseLevels[area],
  }));
  const playIndex = average(PLAY_AREAS.map((area) => assessment.playLevels[area]));
  const numberSenseIndex = average(NUMBER_SENSE_AREAS.map((area) => assessment.numberSenseLevels[area]));

  useEffect(() => {
    if (!authLoading && !user) navigate("/sign-in");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setLoading(true);
      const { data } = await supabase
        .from("lesson_baskets")
        .select("lessons, duration_days")
        .eq("user_id", user.id)
        .eq("age_band", band)
        .maybeSingle();
      setSelected(data?.lessons || []);
      setDuration(data?.duration_days || 30);
      setLoading(false);
    };
    if (user) load();
  }, [user, band]);

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
      `Learner Progress Report (${bandLabel})`,
      `Learner: ${learnerName}`,
      `Reporting period: ${periodLabel}`,
      `Issued: ${today}`,
      ``,
      `Lessons covered (${titles.length}):`,
      ...titles,
      ``,
      `Play Index: ${playIndex.toFixed(1)}/10 — ${getIndexLevelLabel(playIndex)}`,
      `Number Sense Index: ${numberSenseIndex.toFixed(1)}/10 — ${getIndexLevelLabel(numberSenseIndex)}`,
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
        age_band: band,
        lessons: selected,
        duration_days: duration,
        starts_at: startsAt.toISOString(),
        expires_at: expiresAt.toISOString(),
      },
      { onConflict: "user_id,age_band" }
    );
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Progress report saved (${bandLabel})`, description: `Reporting period: ${periodLabel}.` });
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
    <div className="min-h-screen bg-[#1a1c21] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 text-white hover:text-white hover:bg-white/10">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <FileText className="h-6 w-6 text-lime-500" />
            <h1 className="text-3xl font-bold text-white">Learner Progress Report</h1>
            <Sparkles className="h-6 w-6 text-lime-500" />
          </div>
          <p className="text-lg font-semibold text-lime-400">{bandLabel}</p>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            Foundational Learning Competencies for learners aged {bandLabel}; 1. Tick any of the
            lessons already covered, 2. Set the reporting period, 3. Share the report with whomever -
            parents, teacher, or sponsor.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {AGE_BANDS.map((option) => (
              <Button
                key={option}
                size="sm"
                onClick={() => setSearchParams({ band: option })}
                className={band === option
                  ? "bg-lime-500 hover:bg-lime-600 text-white"
                  : "bg-[#2a2d34] text-white border border-white/10 hover:bg-[#363a42]"}
              >
                {AGE_BAND_LABELS[option]}
              </Button>
            ))}
          </div>
          <Badge className="mt-3 text-base bg-[#2a2d34] text-white border-white/10">
            {selected.length} lessons covered
          </Badge>
        </div>

        <Card className="mb-6" style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-lime-500" />
              <h2 className="text-lg font-semibold text-white">
                Play &amp; Number Sense Indexes — {bandLabel}
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { title: "Play Index", value: playIndex, data: playChartData, height: 260, width: 82 },
                { title: "Number Sense Index", value: numberSenseIndex, data: numberSenseChartData, height: 400, width: 102 },
              ].map((chart) => (
                <div key={chart.title} className="rounded-md border border-white/10 bg-[#1e2025] p-4">
                  <div className="mb-3 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-400">{chart.title}</p>
                      <p className="font-semibold text-white">{getIndexLevelLabel(chart.value)}</p>
                    </div>
                    <p className="text-3xl font-bold text-lime-400">
                      {chart.value.toFixed(1)}<span className="text-base text-gray-400">/10</span>
                    </p>
                  </div>
                  <ChartContainer config={indexChartConfig} className="w-full aspect-auto" style={{ height: chart.height }}>
                    <BarChart accessibilityLayer data={chart.data} layout="vertical" margin={{ left: 8, right: 28 }}>
                      <CartesianGrid horizontal={false} />
                      <XAxis type="number" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} allowDecimals={false} />
                      <YAxis dataKey="area" type="category" tickLine={false} axisLine={false} width={chart.width} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel formatter={(value, _name, item) => (
                          <div className="flex min-w-44 items-center justify-between gap-4">
                            <span className="text-muted-foreground">{item.payload.fullArea}</span>
                            <span className="font-bold text-foreground">{String(value)}/10</span>
                          </div>
                        )} />}
                      />
                      <Bar dataKey="level" fill="var(--color-level)" radius={[0, 4, 4, 0]}>
                        <LabelList dataKey="level" position="right" className="fill-foreground font-semibold" />
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-400">
              These levels come from the Learner Play Index for this age group. Update them there and they
              appear here automatically.
            </p>
          </CardContent>
        </Card>


        <Card className="mb-6" style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
          <CardContent className="p-6">
            <Label className="text-base font-semibold mb-3 block text-white">Reporting period</Label>
            <RadioGroup
              value={String(duration)}
              onValueChange={(v) => setDuration(Number(v))}
              className="grid grid-cols-2 sm:grid-cols-5 gap-3"
            >
              {DURATIONS.map((d) => (
                <Label
                  key={d.days}
                  htmlFor={`d-${d.days}`}
                  className={`flex items-center justify-center gap-2 border rounded-lg p-3 cursor-pointer transition text-white ${
                    duration === d.days ? "border-lime-500 bg-lime-500/10" : "border-white/10"
                  }`}
                  style={{ backgroundColor: '#2a2d34' }}
                >
                  <RadioGroupItem id={`d-${d.days}`} value={String(d.days)} className="border-white/30 text-lime-500" />
                  {d.label}
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {FLC_CATEGORIES.map((cat) => {
            const items = grouped[cat.key] || [];
            const covered = items.filter((i) => selected.includes(i.id)).length;
            return (
            <Card key={cat.key} style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-500 text-sm font-bold text-[#1a1c21]">
                    {cat.letter}
                  </span>
                  <BookOpen className="h-5 w-5 text-lime-500" />
                  <h2 className="text-lg font-semibold text-white">{cat.label}</h2>
                  <Badge className="bg-[#1e2025] text-lime-400 border-white/10">{cat.key}</Badge>
                  <span className="ml-auto text-xs text-gray-400">{covered}/{items.length} covered</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {items.map((l) => {
                    const isSel = selected.includes(l.id);
                    return (
                      <Label
                        key={l.id}
                        htmlFor={l.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition text-white ${
                          isSel ? "border-lime-500" : "border-white/10"
                        }`}
                        style={{ backgroundColor: '#2a2d34' }}
                      >
                        <Checkbox
                          id={l.id}
                          checked={isSel}
                          onCheckedChange={() => toggle(l.id)}
                          className="border-white/30 data-[state=checked]:bg-lime-500 data-[state=checked]:border-lime-500"
                        />
                        <span className="text-sm font-medium flex-1">{l.title}</span>
                      </Label>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>

        <Card className="mt-6" style={{ backgroundColor: '#2a2d34', borderColor: 'rgba(255,255,255,0.1)' }}>
          <CardContent className="p-6">
            <Label htmlFor="report-notes" className="text-base font-semibold mb-3 block text-white">
              Notes for the recipient (optional)
            </Label>
            <Textarea
              id="report-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Strengths, areas to improve, attendance, milestones…"
              rows={4}
              className="bg-[#1e2025] border-white/10 text-white placeholder:text-gray-400"
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
          <Button size="lg" variant="outline" onClick={handleShare} disabled={selected.length < MIN_PICK}
            className="bg-[#2a2d34] text-white border-white/10 hover:bg-[#363a42] hover:text-white">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button size="lg" variant="outline" onClick={handleCopy} disabled={selected.length < MIN_PICK}
            className="bg-[#2a2d34] text-white border-white/10 hover:bg-[#363a42] hover:text-white">
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <Button size="lg" variant="outline" onClick={handlePrint} disabled={selected.length < MIN_PICK}
            className="bg-[#2a2d34] text-white border-white/10 hover:bg-[#363a42] hover:text-white">
            <Printer className="h-4 w-4 mr-2" /> Print / PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearnerProgressReport;
