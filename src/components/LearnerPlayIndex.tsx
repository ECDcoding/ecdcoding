import { useState } from "react";
import { ClipboardCheck, Hash, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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

const LearnerPlayIndex = ({ open, onOpenChange }: LearnerPlayIndexProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (item: string, checked: boolean) => {
    setCheckedItems((current) => {
      const next = new Set(current);
      if (checked) next.add(item);
      else next.delete(item);
      return next;
    });
  };

  const totalItems = PLAY_AREAS.length + NUMBER_SENSE_AREAS.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
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

        <section className="space-y-3" aria-labelledby="number-sense-heading">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            <h2 id="number-sense-heading" className="text-lg font-semibold">Assessing Number Sense (1–10)</h2>
          </div>
          <div className="space-y-2">
            {NUMBER_SENSE_AREAS.map((area) => {
              const id = `number-${area.toLowerCase().replace(/[^a-z]+/g, "-")}`;
              return (
                <div key={area} className="flex min-h-11 items-start gap-3 rounded-md border border-border bg-card p-3">
                  <Checkbox
                    id={id}
                    className="mt-0.5"
                    checked={checkedItems.has(area)}
                    onCheckedChange={(checked) => toggleItem(area, checked === true)}
                  />
                  <Label htmlFor={id} className="cursor-pointer leading-snug">{area}</Label>
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex justify-end border-t border-border pt-4">
          <Button variant="outline" onClick={() => setCheckedItems(new Set())} disabled={checkedItems.size === 0}>
            <RotateCcw className="mr-2 h-4 w-4" /> Clear assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LearnerPlayIndex;