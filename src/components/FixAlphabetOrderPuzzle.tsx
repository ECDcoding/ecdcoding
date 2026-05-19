import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles, Volume2 } from "lucide-react";

interface FixAlphabetOrderPuzzleProps {
  isOpen: boolean;
  onClose: () => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Each letter has one of four orientations. 0 = correct upright.
// 1 = rotated 180°, 2 = mirrored horizontally, 3 = mirrored + rotated 180°.
type Orientation = 0 | 1 | 2 | 3;

const transformFor = (o: Orientation): string => {
  switch (o) {
    case 1: return "rotate(180deg)";
    case 2: return "scaleX(-1)";
    case 3: return "scaleX(-1) rotate(180deg)";
    default: return "none";
  }
};

const speak = (text: string) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1.1;
  window.speechSynthesis.speak(u);
};

// Three distinct shuffle patterns so kids get varied practice.
type PatternId = 0 | 1 | 2;
const PATTERN_LABELS: Record<PatternId, string> = {
  0: "Pattern 1 of 3 · Random Flips",
  1: "Pattern 2 of 3 · Every Other Letter Upside Down",
  2: "Pattern 3 of 3 · Mirrored Groups of Five",
};
const PATTERN_HINTS: Record<PatternId, string> = {
  0: "Some letters are flipped or rotated. Tap each one to fix it.",
  1: "Every second letter is upside down. Tap the upside-down ones to fix them.",
  2: "Letters are mirrored in groups of five. Tap each mirrored letter to fix it.",
};

const buildShuffledOrientations = (pattern: PatternId): Orientation[] => {
  switch (pattern) {
    case 1:
      // Every odd-indexed letter is rotated 180°.
      return ALPHABET.map((_, i) => (i % 2 === 1 ? 1 : 0) as Orientation);
    case 2:
      // Within each group of 5 letters, mirror the middle three.
      return ALPHABET.map((_, i) => {
        const posInGroup = i % 5;
        return (posInGroup >= 1 && posInGroup <= 3 ? 2 : 0) as Orientation;
      });
    case 0:
    default:
      // ~60% of letters wrong with mixed orientations.
      return ALPHABET.map(() => {
        const r = Math.random();
        if (r < 0.4) return 0;
        const choices: Orientation[] = [1, 2, 3];
        return choices[Math.floor(Math.random() * choices.length)];
      });
  }
};

const FixAlphabetOrderPuzzle = ({ isOpen, onClose }: FixAlphabetOrderPuzzleProps) => {
  const [pattern, setPattern] = useState<PatternId>(0);
  const [orientations, setOrientations] = useState<Orientation[]>(() => buildShuffledOrientations(0));

  const loadPattern = (p: PatternId, announce = true) => {
    setPattern(p);
    setOrientations(buildShuffledOrientations(p));
    if (announce) {
      setTimeout(() => speak(`${PATTERN_LABELS[p]}. ${PATTERN_HINTS[p]}`), 150);
    }
  };

  const nextPattern = () => {
    const p = ((pattern + 1) % 3) as PatternId;
    loadPattern(p);
  };

  useEffect(() => {
    if (isOpen) {
      loadPattern(0, false);
      setTimeout(() => speak("Fix the alphabets. There are three different patterns to practise. Tap a letter to rotate it until it looks correct."), 250);
    } else {
      window.speechSynthesis?.cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleTap = (index: number) => {
    setOrientations((prev) => {
      const next = [...prev];
      const cur = next[index];
      const newVal = ((cur + 1) % 4) as Orientation;
      next[index] = newVal;
      if (newVal === 0) {
        speak(ALPHABET[index]);
      }
      return next;
    });
  };

  const remaining = useMemo(() => orientations.filter((o) => o !== 0).length, [orientations]);
  const solved = remaining === 0;

  useEffect(() => {
    if (solved && isOpen) {
      const isLast = pattern === 2;
      speak(isLast
        ? "Well done! You fixed all three patterns of the alphabet!"
        : "Great job! Tap Next Pattern to try a new shuffle.");
    }
  }, [solved, isOpen, pattern]);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-[#1e1e3f] via-[#252045] to-[#1a1a2e] border border-cyan-400/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-300" />
            Fix the Alphabet Order
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Tap each letter to rotate it until it looks the right way up. There are <strong>3 different patterns</strong> to practise.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div className="text-sm font-semibold text-yellow-200">{PATTERN_LABELS[pattern]}</div>
          <div className="flex gap-1">
            {([0, 1, 2] as PatternId[]).map((p) => (
              <button
                key={p}
                onClick={() => loadPattern(p)}
                className={`h-2.5 w-8 rounded-full transition-all ${
                  p === pattern ? "bg-yellow-300" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Load pattern ${p + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="text-xs text-cyan-100/80 mb-2">{PATTERN_HINTS[pattern]}</div>

        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-cyan-200">
            {solved ? "🎉 All fixed!" : `${remaining} letter${remaining === 1 ? "" : "s"} still need fixing`}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-cyan-400/30 text-cyan-200 hover:bg-cyan-400/10"
              onClick={() => speak("A B C D E F G H I J K L M N O P Q R S T U V W X Y Z")}>
              <Volume2 className="h-4 w-4 mr-1" /> Hear A–Z
            </Button>
            <Button size="sm" variant="outline" className="border-yellow-400/40 text-yellow-200 hover:bg-yellow-400/10"
              onClick={nextPattern}>
              <Sparkles className="h-4 w-4 mr-1" /> Next Pattern
            </Button>
            <Button size="sm" variant="outline" className="border-orange-400/30 text-orange-200 hover:bg-orange-400/10"
              onClick={() => loadPattern(pattern)}>
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 p-2 bg-white/5 rounded-lg max-h-[60vh] overflow-auto">
          {ALPHABET.map((letter, i) => {
            const o = orientations[i];
            const correct = o === 0;
            return (
              <button
                key={letter}
                onClick={() => handleTap(i)}
                className={`aspect-square rounded-lg flex items-center justify-center text-3xl sm:text-4xl font-extrabold transition-all duration-300 select-none border-2 ${
                  correct
                    ? "bg-green-500/20 border-green-400 text-green-200"
                    : "bg-white text-[#252045] border-white/40 hover:scale-105"
                }`}
                aria-label={`Letter ${letter}, ${correct ? "correct" : "needs fixing"}`}
              >
                <span style={{ transform: transformFor(o), display: "inline-block", transition: "transform 250ms" }}>
                  {letter}
                </span>
              </button>
            );
          })}
        </div>

        {solved && (
          <div className="mt-3 text-center text-lg font-bold text-yellow-300 animate-pulse">
            🌟 Brilliant! Every letter is in the right order now. 🌟
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FixAlphabetOrderPuzzle;