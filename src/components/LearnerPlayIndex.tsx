import { useState } from "react";
import { BarChart3, ClipboardCheck, Hash, RotateCcw } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type LearnerPlayIndexProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const PLAY_AREAS = [
  "Exploratory Play",
  "Construction Play",
  "Creative Play",
  "Physical & Locomotive Play",
  "Fantasy Play",
  "Word Play",
] as const;

type PlayArea = (typeof PLAY_AREAS)[number];

type NumberSenseArea = (typeof NUMBER_SENSE_AREAS)[number];

const INITIAL_PLAY_LEVELS = Object.fromEntries(
  PLAY_AREAS.map((area) => [area, 1]),
) as Record<PlayArea, number>;

const PLAY_LABELS: Record<PlayArea, string> = {
  "Exploratory Play": "Exploratory",
  "Construction Play": "Construction",
  "Creative Play": "Creative",
  "Physical & Locomotive Play": "Physical",
  "Fantasy Play": "Fantasy",
  "Word Play": "Word",
};

const chartConfig = {
  level: {
    label: "Index level",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const getIndexLevelLabel = (average: number) => {
  if (average >= 8) return "Highly developed";
  if (average >= 6) return "Developing strongly";
  if (average >= 4) return "Emerging";
  return "Beginning";
};

const NUMBER_SENSE_AREAS = [
  "Problem-solving skills",
  "Sound number sense",
  "Use of technology",
  "Use of numbers, objects, shapes and colours",
  "Levels of maturity",
  "Use of mathematical ideas",
  "Use of the environment for counting",
  "Verbal and object counting",
  "Fluency with counting forwards and backwards",
  "Finding answers through addition, subtraction, multiplication and division",
] as const;

const INITIAL_NUMBER_SENSE_LEVELS = Object.fromEntries(
  NUMBER_SENSE_AREAS.map((area) => [area, 1]),
) as Record<NumberSenseArea, number>;

const NUMBER_SENSE_LABELS: Record<NumberSenseArea, string> = {
  "Problem-solving skills": "Problem-solving",
  "Sound number sense": "Number sense",
  "Use of technology": "Technology",
  "Use of numbers, objects, shapes and colours": "Maths resources",
  "Levels of maturity": "Maturity",
  "Use of mathematical ideas": "Maths ideas",
  "Use of the environment for counting": "Environment",
  "Verbal and object counting": "Counting",
  "Fluency with counting forwards and backwards": "Counting fluency",
  "Finding answers through addition, subtraction, multiplication and division": "Operations",
};

const LearnerPlayIndex = ({ open, onOpenChange }: LearnerPlayIndexProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [playLevels, setPlayLevels] = useState<Record<PlayArea, number>>(INITIAL_PLAY_LEVELS);
  const [numberSenseLevels, setNumberSenseLevels] = useState<Record<NumberSenseArea, number>>(INITIAL_NUMBER_SENSE_LEVELS);

  const toggleItem = (item: string, checked: boolean) => {
    setCheckedItems((current) => {
      const next = new Set(current);
      if (checked) next.add(item);
      else next.delete(item);
      return next;
    });
  };

  const totalItems = PLAY_AREAS.length + NUMBER_SENSE_AREAS.length;
  const playChartData = PLAY_AREAS.map((area) => ({
    area: PLAY_LABELS[area],
    fullArea: area,
    level: playLevels[area],
  }));
  const overallPlayIndex = PLAY_AREAS.reduce((sum, area) => sum + playLevels[area], 0) / PLAY_AREAS.length;
  const numberSenseChartData = NUMBER_SENSE_AREAS.map((area) => ({
    area: NUMBER_SENSE_LABELS[area],
    fullArea: area,
    level: numberSenseLevels[area],
  }));
  const overallNumberSenseIndex = NUMBER_SENSE_AREAS.reduce(
    (sum, area) => sum + numberSenseLevels[area],
    0,
  ) / NUMBER_SENSE_AREAS.length;

  const clearAssessment = () => {
    setCheckedItems(new Set());
    setPlayLevels(INITIAL_PLAY_LEVELS);
    setNumberSenseLevels(INITIAL_NUMBER_SENSE_LEVELS);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <ClipboardCheck className="h-6 w-6 text-primary" />
            Learner Play Index
          </DialogTitle>
          <DialogDescription>
            Observe the learner through play and record the demonstrated foundational learning outcomes.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between border-y border-border py-3 text-sm">
          <span className="font-medium">Assessment progress</span>
          <span className="text-muted-foreground">{checkedItems.size} of {totalItems} observed</span>
        </div>

        <section className="space-y-3" aria-labelledby="play-observations-heading">
          <h2 id="play-observations-heading" className="text-lg font-semibold">Play observations</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {PLAY_AREAS.map((area) => {
              const id = `play-${area.toLowerCase().replace(/[^a-z]+/g, "-")}`;
              return (
                <div key={area} className="flex min-h-12 items-center gap-3 rounded-md border border-border bg-card p-3">
                  <Checkbox
                    id={id}
                    checked={checkedItems.has(area)}
                    onCheckedChange={(checked) => toggleItem(area, checked === true)}
                  />
                  <Label htmlFor={id} className="cursor-pointer leading-snug">{area}</Label>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4 border-t border-border pt-5" aria-labelledby="play-levels-heading">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 id="play-levels-heading" className="text-lg font-semibold">Play Index Levels</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.2fr)]">
            <div className="space-y-3">
              {PLAY_AREAS.map((area) => (
                <div key={area} className="rounded-md border border-border bg-card p-3">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Label htmlFor={`level-${PLAY_LABELS[area]}`} className="leading-snug">{area}</Label>
                    <span className="min-w-9 rounded-md bg-primary px-2 py-1 text-center text-sm font-bold text-primary-foreground">
                      {playLevels[area]}
                    </span>
                  </div>
                  <Slider
                    id={`level-${PLAY_LABELS[area]}`}
                    min={1}
                    max={10}
                    step={1}
                    value={[playLevels[area]]}
                    onValueChange={([value]) => {
                      if (typeof value !== "number") return;
                      setPlayLevels((current) => ({ ...current, [area]: value }));
                    }}
                    aria-label={`${area} level from 1 to 10`}
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-border bg-card p-4">
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Play Index</p>
                  <p className="text-lg font-semibold">{getIndexLevelLabel(overallPlayIndex)}</p>
                </div>
                <p className="text-3xl font-bold text-primary">
                  {overallPlayIndex.toFixed(1)}<span className="text-base text-muted-foreground">/10</span>
                </p>
              </div>
              <ChartContainer config={chartConfig} className="h-[300px] w-full aspect-auto">
                <BarChart accessibilityLayer data={playChartData} layout="vertical" margin={{ left: 8, right: 28 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} allowDecimals={false} />
                  <YAxis dataKey="area" type="category" tickLine={false} axisLine={false} width={82} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel formatter={(value, _name, item) => (
                      <div className="flex min-w-40 items-center justify-between gap-4">
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
          </div>
        </section>

        <section className="space-y-4 border-t border-border pt-5" aria-labelledby="number-sense-heading">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            <h2 id="number-sense-heading" className="text-lg font-semibold">Assessing Number Sense (1–10)</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.2fr)]">
            <div className="space-y-3">
              {NUMBER_SENSE_AREAS.map((area) => {
                const id = `number-${area.toLowerCase().replace(/[^a-z]+/g, "-")}`;
                return (
                  <div key={area} className="rounded-md border border-border bg-card p-3">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={id}
                          className="mt-0.5"
                          checked={checkedItems.has(area)}
                          onCheckedChange={(checked) => toggleItem(area, checked === true)}
                        />
                        <Label htmlFor={id} className="cursor-pointer leading-snug">{area}</Label>
                      </div>
                      <span className="min-w-9 rounded-md bg-primary px-2 py-1 text-center text-sm font-bold text-primary-foreground">
                        {numberSenseLevels[area]}
                      </span>
                    </div>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[numberSenseLevels[area]]}
                      onValueChange={([value]) => {
                        if (typeof value !== "number") return;
                        setNumberSenseLevels((current) => ({ ...current, [area]: value }));
                      }}
                      aria-label={`${area} level from 1 to 10`}
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                      <span>1</span>
                      <span>10</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-fit rounded-md border border-border bg-card p-4 lg:sticky lg:top-0">
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Number Sense Index</p>
                  <p className="text-lg font-semibold">{getIndexLevelLabel(overallNumberSenseIndex)}</p>
                </div>
                <p className="text-3xl font-bold text-primary">
                  {overallNumberSenseIndex.toFixed(1)}<span className="text-base text-muted-foreground">/10</span>
                </p>
              </div>
              <ChartContainer config={chartConfig} className="h-[440px] w-full aspect-auto">
                <BarChart accessibilityLayer data={numberSenseChartData} layout="vertical" margin={{ left: 8, right: 28 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} allowDecimals={false} />
                  <YAxis dataKey="area" type="category" tickLine={false} axisLine={false} width={102} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel formatter={(value, _name, item) => (
                      <div className="flex min-w-48 items-center justify-between gap-4">
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
          </div>
        </section>

        <div className="flex justify-end border-t border-border pt-4">
          <Button
            variant="outline"
            onClick={clearAssessment}
            disabled={
              checkedItems.size === 0
              && PLAY_AREAS.every((area) => playLevels[area] === 1)
              && NUMBER_SENSE_AREAS.every((area) => numberSenseLevels[area] === 1)
            }
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Clear assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnerPlayIndex;