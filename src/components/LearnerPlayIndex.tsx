import { useEffect, useState } from "react";
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
import {
  AGE_BANDS,
  AGE_BAND_LABELS,
  AgeBand,
  NUMBER_SENSE_AREAS,
  NUMBER_SENSE_LABELS,
  NumberSenseArea,
  PLAY_AREAS,
  PLAY_LABELS,
  PlayArea,
  average,
  getIndexLevelLabel,
  initialNumberSenseLevels,
  initialPlayLevels,
  loadAssessment,
  saveAssessment,
} from "@/lib/playIndex";

type LearnerPlayIndexProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Age band pre-selected when the dialog opens. */
  defaultBand?: AgeBand;
};

const chartConfig = {
  level: {
    label: "Index level",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const LearnerPlayIndex = ({ open, onOpenChange, defaultBand = "04-05" }: LearnerPlayIndexProps) => {
  const [band, setBand] = useState<AgeBand>(defaultBand);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [playLevels, setPlayLevels] = useState<Record<PlayArea, number>>(initialPlayLevels);
  const [numberSenseLevels, setNumberSenseLevels] = useState<Record<NumberSenseArea, number>>(initialNumberSenseLevels);

  // Load the stored assessment for the selected band whenever the dialog opens or the band changes.
  useEffect(() => {
    if (!open) return;
    const stored = loadAssessment(band);
    setCheckedItems(new Set(stored.observed));
    setPlayLevels(stored.playLevels);
    setNumberSenseLevels(stored.numberSenseLevels);
  }, [open, band]);

  useEffect(() => {
    if (!open) return;
    setBand(defaultBand);
  }, [open, defaultBand]);

  const persist = (next: {
    observed?: Set<string>;
    playLevels?: Record<PlayArea, number>;
    numberSenseLevels?: Record<NumberSenseArea, number>;
  }) => {
    saveAssessment(band, {
      observed: Array.from(next.observed ?? checkedItems),
      playLevels: next.playLevels ?? playLevels,
      numberSenseLevels: next.numberSenseLevels ?? numberSenseLevels,
    });
  };

  const toggleItem = (item: string, checked: boolean) => {
    const next = new Set(checkedItems);
    if (checked) next.add(item);
    else next.delete(item);
    setCheckedItems(next);
    persist({ observed: next });
  };

  const setPlayLevel = (area: PlayArea, value: number) => {
    const next = { ...playLevels, [area]: value };
    setPlayLevels(next);
    persist({ playLevels: next });
  };

  const setNumberSenseLevel = (area: NumberSenseArea, value: number) => {
    const next = { ...numberSenseLevels, [area]: value };
    setNumberSenseLevels(next);
    persist({ numberSenseLevels: next });
  };

  const totalItems = PLAY_AREAS.length + NUMBER_SENSE_AREAS.length;
  const playChartData = PLAY_AREAS.map((area) => ({
    area: PLAY_LABELS[area],
    fullArea: area,
    level: playLevels[area],
  }));
  const overallPlayIndex = average(PLAY_AREAS.map((area) => playLevels[area]));
  const numberSenseChartData = NUMBER_SENSE_AREAS.map((area) => ({
    area: NUMBER_SENSE_LABELS[area],
    fullArea: area,
    level: numberSenseLevels[area],
  }));
  const overallNumberSenseIndex = average(NUMBER_SENSE_AREAS.map((area) => numberSenseLevels[area]));

  const clearAssessment = () => {
    const play = initialPlayLevels();
    const numbers = initialNumberSenseLevels();
    setCheckedItems(new Set());
    setPlayLevels(play);
    setNumberSenseLevels(numbers);
    saveAssessment(band, { observed: [], playLevels: play, numberSenseLevels: numbers });
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

        <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-card p-3">
          <span className="text-sm font-medium">Age group</span>
          <div className="flex gap-2">
            {AGE_BANDS.map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={band === option ? "default" : "outline"}
                onClick={() => setBand(option)}
              >
                {AGE_BAND_LABELS[option]}
              </Button>
            ))}
          </div>
          <span className="ml-auto text-xs text-muted-foreground">
            Each age group keeps its own ratings and progress report.
          </span>
        </div>

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
                      setPlayLevel(area, value);
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
                        setNumberSenseLevel(area, value);
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
