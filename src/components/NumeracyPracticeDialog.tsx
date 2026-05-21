import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type NumeracyOp = "addition" | "subtraction" | "multiplication" | "division";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operation: NumeracyOp | null;
}

const OP_META: Record<NumeracyOp, { label: string; symbol: string; emoji: string }> = {
  addition: { label: "Addition", symbol: "+", emoji: "➕" },
  subtraction: { label: "Minus", symbol: "−", emoji: "➖" },
  multiplication: { label: "Multiplication", symbol: "×", emoji: "✖️" },
  division: { label: "Division", symbol: "÷", emoji: "➗" },
};

// Pick a max number per age (8 yrs = easy, 12 yrs = hardest)
const rangeForAge = (age: number, op: NumeracyOp): { a: [number, number]; b: [number, number] } => {
  const lvl = Math.max(0, Math.min(4, age - 8)); // 0..4
  switch (op) {
    case "addition":
      return { a: [2, 10 + lvl * 15], b: [1, 10 + lvl * 15] };
    case "subtraction":
      return { a: [5, 15 + lvl * 20], b: [1, 10 + lvl * 10] };
    case "multiplication":
      return { a: [2, 5 + lvl * 2], b: [2, 5 + lvl * 2] };
    case "division":
      return { a: [2, 5 + lvl * 2], b: [2, 5 + lvl * 2] };
  }
};

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generate = (age: number, op: NumeracyOp) => {
  const { a: [aMin, aMax], b: [bMin, bMax] } = rangeForAge(age, op);
  let a = randInt(aMin, aMax);
  let b = randInt(bMin, bMax);
  if (op === "subtraction" && b > a) [a, b] = [b, a];
  if (op === "division") {
    // Ensure clean division: a = b * q
    const q = randInt(1, aMax);
    a = b * q;
  }
  const answer =
    op === "addition" ? a + b :
    op === "subtraction" ? a - b :
    op === "multiplication" ? a * b :
    a / b;
  return { a, b, answer };
};

const NumeracyPracticeDialog = ({ open, onOpenChange, operation }: Props) => {
  const [age, setAge] = useState<number | null>(null);
  const [problem, setProblem] = useState<{ a: number; b: number; answer: number } | null>(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  useEffect(() => {
    if (!open) {
      setAge(null);
      setProblem(null);
      setInput("");
      setFeedback(null);
      setScore({ right: 0, total: 0 });
    }
  }, [open]);

  useEffect(() => {
    if (age !== null && operation) {
      setProblem(generate(age, operation));
      setInput("");
      setFeedback(null);
    }
  }, [age, operation]);

  if (!operation) return null;
  const meta = OP_META[operation];

  const submit = () => {
    if (!problem || input.trim() === "") return;
    const correct = Number(input) === problem.answer;
    setFeedback(correct ? "✅ Correct! Well done!" : `❌ Not quite. The answer is ${problem.answer}.`);
    setScore((s) => ({ right: s.right + (correct ? 1 : 0), total: s.total + 1 }));
  };

  const next = () => {
    if (age !== null) setProblem(generate(age, operation));
    setInput("");
    setFeedback(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" style={{ backgroundColor: "#313056", color: "white" }}>
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            {meta.emoji} {meta.label} Practice
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Ages 8 to 12 — questions adjust to your age.
          </DialogDescription>
        </DialogHeader>

        {age === null ? (
          <div className="space-y-4 py-2">
            <p className="text-white/90">First, please choose your age to start practicing:</p>
            <div className="grid grid-cols-5 gap-2">
              {[8, 9, 10, 11, 12].map((a) => (
                <Button
                  key={a}
                  onClick={() => setAge(a)}
                  className="bg-white/10 hover:bg-white/25 text-white border border-white/30 font-bold"
                >
                  {a}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="flex justify-between text-sm text-white/70">
              <span>Age {age}</span>
              <span>Score: {score.right}/{score.total}</span>
            </div>
            {problem && (
              <div className="text-center text-5xl font-bold py-6">
                {problem.a} {meta.symbol} {problem.b} = ?
              </div>
            )}
            <Input
              type="number"
              value={input}
              onChange={(e) => { setInput(e.target.value); setFeedback(null); }}
              onKeyDown={(e) => { if (e.key === "Enter") feedback ? next() : submit(); }}
              placeholder="Your answer"
              className="text-center text-2xl bg-white text-black"
              autoFocus
            />
            {feedback && <p className="text-center text-lg font-semibold">{feedback}</p>}
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setAge(null)} className="text-black">
                Change Age
              </Button>
              {feedback ? (
                <Button onClick={next} className="bg-orange-500 hover:bg-orange-600">Next Question</Button>
              ) : (
                <Button onClick={submit} className="bg-orange-500 hover:bg-orange-600">Check Answer</Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NumeracyPracticeDialog;