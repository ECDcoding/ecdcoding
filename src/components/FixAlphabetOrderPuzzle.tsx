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

const buildShuffledOrientations = (): Orientation[] => {
  // Make ~60% of letters wrong, the rest already correct.
  return ALPHABET.map(() => {
    const r = Math.random();
    if (r < 0.4) return 0;
    const choices: Orientation[] = [1, 2, 3];
    return choices[Math.floor(Math.random() * choices.length)];
  });
};

const FixAlphabetOrderPuzzle = ({ isOpen, onClose }: FixAlphabetOrderPuzzleProps) => {
  const [orientations, setOrientations] = useState<Orientation[]>(() => buildShuffledOrientations());

  const reset = () => {
    setOrientations(buildShuffledOrientations());
    speak("Fix the alphabets. Tap each letter to turn it the right way up.");
  };

  useEffect(() => {
    if (isOpen) {
      setOrientations(buildShuffledOrientations());
      // Small delay so the dialog is mounted before speaking.
      setTimeout(() => speak("Fix the alphabets. Tap a letter to rotate it until it looks correct."), 250);
    } else {
      window.speechSynthesis?.cancel();
    }
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
      speak("Well done! You fixed the whole alphabet!");
    }
  }, [solved, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-[#1e1e3f] via-[#252045] to-[#1a1a2e] border border-cyan-400/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-300" />
            Fix the Alphabet Order
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Tap each letter to rotate it until every letter looks the right way up — A, B, C, D…
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-cyan-200">
            {solved ? "🎉 All fixed!" : `${remaining} letter${remaining === 1 ? "" : "s"} still need fixing`}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-cyan-400/30 text-cyan-200 hover:bg-cyan-400/10"
              onClick={() => speak("A B C D E F G H I J K L M N O P Q R S T U V W X Y Z")}>
              <Volume2 className="h-4 w-4 mr-1" /> Hear A–Z
            </Button>
            <Button size="sm" variant="outline" className="border-orange-400/30 text-orange-200 hover:bg-orange-400/10"
              onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-1" /> Shuffle
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