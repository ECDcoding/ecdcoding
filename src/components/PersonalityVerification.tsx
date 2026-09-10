import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserCheck, Sparkles, HeartHandshake, Ruler, Info } from "lucide-react";

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
      "Loves pencils, especially sharpened ones",
      "Intellect is in the ascendancy",
      "Very choosy in what he sees & does",
      "High expectations about himself",
      "Has high learning days & forgetting-everything days",
      "Feels people are against him at times",
      "Withdraws with a sad facial expression",
    ],
    notes: [
      "His hands are also very busy touching, exploring and feeling everything he comes into contact with.",
      "If his bad days start, a wise mother will keep her child at home the minute he gets out of bed.",
      "Seven year olds tend to feel that people — including teachers and parents — are against him in many ways; when that happens he withdraws.",
    ],
  },
  {
    id: "eight",
    label: "Eight Years",
    cycle: "Expansive & speedy",
    traits: [
      "Out-going",
      "Nothing is too difficult for him",
      "Quite confident and motivated",
      "Always ready to tackle any challenge",
      "Often overestimates his own ability",
      "Easily discouraged when he fails, and may cry",
      "Never gives up trying afresh the next day",
      "Constantly busy & active",
      "Performs tasks to the best of his ability",
      "Concerned about the nature of his relationships",
      "Always concerned about what people say or think about him",
      "Generous to other people if they care",
      "Very close relationship with his mother",
    ],
    notes: [
      "He needs protection from himself at certain times.",
      "A two-way relationship will work best for him.",
      "His personality becomes a benchmark for the future self.",
    ],
  },
  {
    id: "nine",
    label: "Nine Years",
    traits: [
      "Quiet",
      "Lives more within himself",
      "More self-contained & self-sufficient",
      "Counts a lot on his contacts",
      "Loves to be independent from others",
      "Resists too much bossing by his parents",
      "Likes the company of friends more than the family circle",
      "Opinions of friends matter more than those of family",
      "Displays remarkable self-reliance and capability",
    ],
    notes: [
      "It is important to avoid imposing yourself on him.",
      "He wants his maturity, independence & separateness respected.",
      "Nine can be an age of perfecting skills and of real, solid accomplishment.",
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

  const stage = AGE_STAGES.find((s) => s.id === activeStage) ?? AGE_STAGES[0];

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
            Child Behavior
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
                    className="bg-zinc-800 text-foreground hover:bg-zinc-700 border-zinc-700"
                    variant={s.id === activeStage ? "secondary" : "outline"}
                    onClick={() => setActiveStage(s.id)}
                  >
                    {s.label}
                  </Button>
                ))}
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h3 className="text-lg font-semibold">{stage.label}</h3>
                  {stage.cycle && (
                    <p className="text-sm text-muted-foreground">{stage.cycle}</p>
                  )}

                  <ul className="grid gap-2 sm:grid-cols-2">
                    {stage.traits.map((trait) => (
                      <li
                        key={trait}
                        className="flex items-start gap-2 rounded-md border border-zinc-700 bg-zinc-800 p-2 text-sm"
                      >
                        <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>

                  <Separator />
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {stage.notes.map((note) => (
                      <li key={note} className="flex gap-2 rounded-md border border-zinc-700 bg-zinc-800 p-2">
                        <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
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
