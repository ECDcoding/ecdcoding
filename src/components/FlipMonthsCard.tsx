import { useState } from "react";
import { useAutoFlip } from "@/hooks/useAutoFlip";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface FlipMonthsCardProps {
  onCardClick: (cardName: string) => void;
  onRecordingClick: (cardName: string) => (e: React.MouseEvent) => Promise<void>;
  isRecording: boolean;
  selectedCardForTest: string | null;
  recordingTime: number;
}

const sides = ['Months of the Year', 'Seasons of the Year'] as const;
type Side = typeof sides[number];

const FlipMonthsCard = ({
  onCardClick,
  onRecordingClick,
  isRecording,
  selectedCardForTest,
  recordingTime
}: FlipMonthsCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSide = sides[currentIndex];

  const handleFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % sides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const cardRef = useAutoFlip<HTMLDivElement>({
    onFlip: () => handleFlip(),
    enabled: !isRecording,
  });

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('.flip-indicator')) return;
    onCardClick(currentSide);
  };

  const isActive = selectedCardForTest === "Months of the Year" || selectedCardForTest === "Seasons of the Year";

  return (
    <Card
      ref={cardRef}
      className={`bg-white p-4 w-80 min-h-[400px] border-4 border-dashed border-amber-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer overflow-hidden ${isAnimating ? 'animate-pulse' : ''}`}
      onClick={handleClick}
      style={{ perspective: '1000px' }}
    >
      {/* Flip indicator */}
      <div
        className="flip-indicator absolute top-2 right-2 z-20 cursor-pointer p-1 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
        onClick={handleFlip}
        title="Tap to flip"
      >
        <RefreshCw className={`h-5 w-5 text-amber-500 ${isAnimating ? 'animate-spin' : ''}`} />
      </div>

      {/* Side indicator dots */}
      <div className="absolute top-2 left-2 z-20 flex gap-1">
        {sides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-amber-600 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isAnimating ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <CardContent className="p-0 w-full" style={{ backfaceVisibility: 'hidden' }}>
          <h3 className="text-xl font-bold text-amber-600 mb-6 text-center" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            {currentSide}
          </h3>

          {currentSide === 'Months of the Year' ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-red-500 text-white font-bold rounded-md p-2 text-center text-sm">January</div>
                <div className="bg-orange-500 text-white font-bold rounded-md p-2 text-center text-sm">February</div>
                <div className="bg-yellow-500 text-white font-bold rounded-md p-2 text-center text-sm">March</div>
                <div className="bg-green-500 text-white font-bold rounded-md p-2 text-center text-sm">April</div>
                <div className="bg-teal-500 text-white font-bold rounded-md p-2 text-center text-sm">May</div>
                <div className="bg-blue-500 text-white font-bold rounded-md p-2 text-center text-sm">June</div>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="bg-indigo-500 text-white font-bold rounded-md p-2 text-center text-sm">July</div>
                <div className="bg-purple-500 text-white font-bold rounded-md p-2 text-center text-sm">August</div>
                <div className="bg-pink-500 text-white font-bold rounded-md p-2 text-center text-sm">September</div>
                <div className="bg-rose-500 text-white font-bold rounded-md p-2 text-center text-sm">October</div>
                <div className="bg-cyan-500 text-white font-bold rounded-md p-2 text-center text-sm">November</div>
                <div className="bg-emerald-500 text-white font-bold rounded-md p-2 text-center text-sm">December</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-400 text-white font-bold rounded-lg p-4 text-center text-base shadow-md">☀️ Summer</div>
              <div className="bg-sky-400 text-white font-bold rounded-lg p-4 text-center text-base shadow-md">❄️ Winter</div>
              <div className="bg-amber-600 text-white font-bold rounded-lg p-4 text-center text-base shadow-md">🍂 Autumn</div>
              <div className="bg-lime-500 text-white font-bold rounded-lg p-4 text-center text-base shadow-md">🌸 Spring</div>
            </div>
          )}
        </CardContent>

        {isRecording && isActive && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold z-30">
            {recordingTime}s / 30s
          </div>
        )}
      </div>

      <Button
        onClick={onRecordingClick(currentSide)}
        className={`absolute bottom-2 left-2 ${isRecording && isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </Button>
    </Card>
  );
};

export default FlipMonthsCard;
