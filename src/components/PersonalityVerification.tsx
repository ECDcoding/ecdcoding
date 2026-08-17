import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { UserCheck, Sparkles, HeartHandshake, Ruler, Info, Share2, Loader2 } from "lucide-react";

export type PersonalityTab = "ages" | "individuality";

interface AgeStage {
  id: string;
  label: string;
  cycle?: string;
  traits: string[];
  notes: string[];
}

const AGE_STAGES: AgeStage[] = [
  {
    id: "four",
    label: "Four Years",
    cycle: "Likelihood of the first cycle of behaviour",
    traits: [
      "Loose talker",
      "Naughty",
      "Rough",
      "Defiant",
      "Boastful",
      "Over-thinker when explaining issues",
      "Seeing is believing",
      "Too confident",
    ],
    notes: [
      "Requires firm parenting or a teacher who understands how, where and when to intervene.",
      "Requires to be allowed to test himself out, with appropriate limits.",
    ],
  },
  {
    id: "four-half",
    label: "Four & a Half Years",
    traits: [
      "Very inquisitive",
      "Focused on issues at hand",
      "Very helpful",
      "Self-motivating",
      "Finishes whatever project they start",
      "Great discussers of issues",
      "Pays attention to detail",
      "Always eager to learn",
      "Very unpredictable",
      "Loves to draw in many dimensions",
      "A lot of interest in letters & numbers",
    ],
    notes: [
      "Four and a half years may be an age of rapid intellectual growth.",
    ],
  },
  {
    id: "five",
    label: "Five Year Olds",
    traits: [
      "Reliable",
      "Stable",
      "Well adjusted",
      "Secure within himself",
      "Always calm",
      "Friendly",
      "Relatable and less demanding",
      "Homely",
      "Very realistic",
      "Accepts circumstances",
    ],
    notes: [
      "A good company with his mother.",
      "Adheres to instructions and permissions.",
      "He understands himself very well, and others are satisfied with him.",
    ],
  },
  {
    id: "six",
    label: "Six Years",
    cycle: "Likelihood of the second cycle of behaviour",
    traits: [
      "Rebellious",
      "Emotionally violent",
      "Hard to please",
      "Fickle",
      "Destructive",
      "Messy",
      "Too demanding",
      "Blames his mother",
      "Verbally abusive",
      "Cannot be told what to do",
    ],
    notes: [
      "Extremely eager to learn new experiences.",
      "Difficult to accept criticism, blame or punishment.",
      "Loves to win and to be praised; difficult to relate with.",
      "NB: It is hard to bypass this age — extra assistance from others will mitigate matters.",
    ],
  },
  {
    id: "seven",
    label: "Seven Years",
    traits: [
      "A more withdrawn age",
      "He has calmed down",
      "Easier to live with",
      "More likely to complain",
      "Very reserved",
      "Likely to be alone",
      "Loves watching TV & listening to radio",
      "Reads a lot if possible",
      "Very observant",
    ],
    notes: [
      "His hands are also very busy touching, exploring and feeling everything he comes into contact with.",
    ],
  },
];

const INDIVIDUALITY_CATEGORIES = [
  {
    id: "individuality",
    label: "(a) Individuality",
    icon: Sparkles,
    description:
      "What makes this child uniquely themselves — temperament, pace of learning, curiosity, humour and the way they prefer to be approached.",
    prompts: [
      "How does the child prefer to learn: watching, listening, or doing?",
      "What calms the child down when frustrated?",
      "What does the child do without being asked?",
    ],
  },
  {
    id: "emotional",
    label: "(b) Emotional Strengths / Weaknesses",
    icon: HeartHandshake,
    description:
      "Where the child is emotionally solid and where they need support, so intervention happens at the right moment.",
    prompts: [
      "How does the child handle criticism or losing?",
      "Which situations trigger tears, anger or withdrawal?",
      "Which achievements build the child's confidence fastest?",
    ],
  },
  {
    id: "body",
    label: "(c) Body Types",
    icon: Ruler,
    description:
      "Physical build, energy levels and motor coordination — useful for pacing activities, seating and hands-on craft work.",
    prompts: [
      "Is the child energetic, steady, or easily tired?",
      "How is fine motor control (holding a pencil, small blocks)?",
      "How is gross motor control (running, balance, climbing)?",
    ],
  },
];

interface PersonalityVerificationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: PersonalityTab;
  learnerName?: string;
}

const PersonalityVerification = ({
  open,
  onOpenChange,
  initialTab = "ages",
  learnerName,
}: PersonalityVerificationProps) => {
  const [tab, setTab] = useState<PersonalityTab>(initialTab);
  const [activeStage, setActiveStage] = useState<string>(AGE_STAGES[0].id);
  const [ticked, setTicked] = useState<Record<string, boolean>>({});
  const [sharing, setSharing] = useState(false);
  const { profile } = useProfile();

  const stage = AGE_STAGES.find((s) => s.id === activeStage) ?? AGE_STAGES[0];
  const tickedCount = stage.traits.filter((t) => ticked[`${stage.id}:${t}`]).length;

  const shareToUsersMedia = async () => {
    const selected = stage.traits.filter((t) => ticked[`${stage.id}:${t}`]);
    if (!selected.length) {
      toast({
        title: "Nothing ticked",
        description: "Tick the traits you observe before sharing.",
        variant: "destructive",
      });
      return;
    }
    if (!profile?.user_id) {
      toast({
        title: "Sign in required",
        description: "Please sign in to share on the post wall.",
        variant: "destructive",
      });
      return;
    }

    setSharing(true);
    try {
      const child = learnerName ? ` for ${learnerName}` : "";
      const body = [
        `Personality Review${child} — ${stage.label}`,
        "",
        ...selected.map((t) => `• ${t}`),
        "",
        "What would you advise to help with this? Comments welcome.",
      ].join("\n");

      const { error } = await supabase.from("user_feedback").insert({
        user_id: profile.user_id,
        username: profile.username || profile.first_name || "Anonymous",
        feedback_text: body,
        tagged_user_ids: [],
      } as any);
      if (error) throw error;

      toast({
        title: "Shared",
        description: "Your personality review is on the Users' Media post wall.",
      });
    } catch (e: any) {
      toast({
        title: "Could not share",
        description: e?.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSharing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setTab(initialTab);
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Personality Reviews
          </DialogTitle>
          <DialogDescription>
            Use this checklist to understand the calibre of the child
            {learnerName ? ` (${learnerName})` : ""} you may be dealing with, so the
            FLC Report reflects who they really are.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Button
            variant={tab === "ages" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("ages")}
          >
            Ages and Stages
          </Button>
          <Button
            variant={tab === "individuality" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("individuality")}
          >
            Individuality
          </Button>
        </div>

        <ScrollArea className="max-h-[60vh] pr-3">
          {tab === "ages" ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {AGE_STAGES.map((s) => (
                  <Button
                    key={s.id}
                    size="sm"
                    variant={s.id === activeStage ? "secondary" : "outline"}
                    onClick={() => setActiveStage(s.id)}
                  >
                    {s.label}
                  </Button>
                ))}
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{stage.label}</h3>
                    <Badge variant="outline">
                      {tickedCount}/{stage.traits.length} ticked
                    </Badge>
                  </div>
                  {stage.cycle && (
                    <p className="text-sm text-muted-foreground">{stage.cycle}</p>
                  )}

                  <div className="grid gap-2 sm:grid-cols-2">
                    {stage.traits.map((trait) => {
                      const key = `${stage.id}:${trait}`;
                      return (
                        <label
                          key={key}
                          className="flex items-start gap-2 rounded-md border border-border p-2 text-sm cursor-pointer hover:bg-muted/50"
                        >
                          <Checkbox
                            checked={!!ticked[key]}
                            onCheckedChange={(v) =>
                              setTicked((prev) => ({ ...prev, [key]: !!v }))
                            }
                          />
                          <span>{trait}</span>
                        </label>
                      );
                    })}
                  </div>

                  <Separator />
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {stage.notes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>

                  <Separator />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">
                      Share your ticked list on the Users' Media post wall to get advice on how to help.
                    </p>
                    <Button size="sm" onClick={shareToUsersMedia} disabled={sharing}>
                      {sharing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Share2 className="mr-2 h-4 w-4" />
                      )}
                      Share ticked list
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              {INDIVIDUALITY_CATEGORIES.map(({ id, label, icon: Icon, description, prompts }) => (
                <Card key={id}>
                  <CardContent className="pt-6 space-y-3">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Icon className="h-4 w-4 text-primary" />
                      {label}
                    </h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {prompts.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
              <p className="text-xs text-muted-foreground">
                Link with the FLC Report: this understanding helps the Copilot grasp the
                calibre of the child the user is dealing with.
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalityVerification;