import { useState } from "react";
import { useAutoFlip } from "@/hooks/useAutoFlip";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import numbers1to10 from "@/assets/numbers-1-to-10.jpg";
import numbers11to20 from "@/assets/numbers-11-to-20.jpg";
import numbers21to30 from "@/assets/numbers-21-to-30.jpg";
import numbers31to40 from "@/assets/numbers-31-to-40.jpg";

interface FlipNumbersCardProps {
  onCardClick: (cardName: string) => void;
  onRecordingClick: (cardName: string) => (e: React.MouseEvent) => Promise<void>;
  isRecording: boolean;
  selectedCardForTest: string | null;
  recordingTime: number;
}

const numberSides = ["Numbers 1-10", "Numbers 11-20", "Numbers 21-30", "Numbers 31-40"] as const;
type NumberSide = typeof numberSides[number];

const numberData: Record<NumberSide, { title: string; range: string; image: string; color: string; borderColor: string }> = {
  "Numbers 1-10": { title: "Numbers 1 – 10", range: "1 – 10", image: numbers1to10, color: "text-blue-500", borderColor: "border-blue-500" },
  "Numbers 11-20": { title: "Numbers 11 – 20", range: "11 – 20", image: numbers11to20, color: "text-green-500", borderColor: "border-green-500" },
  "Numbers 21-30": { title: "Numbers 21 – 30", range: "21 – 30", image: numbers21to30, color: "text-yellow-500", borderColor: "border-yellow-500" },
  "Numbers 31-40": { title: "Numbers 31 – 40", range: "31 – 40", image: numbers31to40, color: "text-pink-500", borderColor: "border-pink-500" },
};

const FlipNumbersCard = ({
  onCardClick,
  onRecordingClick,
  isRecording,
  selectedCardForTest,
  recordingTime,
}: FlipNumbersCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSide = numberSides[currentIndex];
  const currentData = numberData[currentSide];

  const handleFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % numberSides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest(".flip-indicator")) return;
    onCardClick(currentSide);
  };

  const isCurrentRecording = isRecording && numberSides.includes(selectedCardForTest as NumberSide);

  return (
    <Card
      className={`bg-white p-4 w-80 min-h-[400px] border-4 border-dashed ${currentData.borderColor} shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer overflow-hidden ${isAnimating ? "animate-pulse" : ""}`}
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      {/* Flip indicator */}
      <div
        className="flip-indicator absolute top-2 right-2 z-20 cursor-pointer p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
        onClick={handleFlip}
        title="Tap to flip"
      >
        <RefreshCw className={`h-5 w-5 ${currentData.color} ${isAnimating ? "animate-spin" : ""}`} />
      </div>

      {/* Side indicator dots */}
      <div className="absolute top-2 left-2 z-20 flex gap-1">
        {numberSides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isAnimating ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="flex flex-col items-center justify-center p-2" style={{ backfaceVisibility: "hidden" }}>
          <h3 className={`text-xl font-bold ${currentData.color} mb-2 text-center`} style={{ fontFamily: '"Bungee Shade", cursive' }}>
            {currentData.title}
          </h3>
          <div className="flex-1 flex items-center justify-center">
            <img src={currentData.image} alt={currentData.title} className="w-full h-auto max-h-80 object-contain rounded-lg" />
          </div>
        </div>

        {isCurrentRecording && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold z-30">
            {recordingTime}s / 30s
          </div>
        )}
      </div>

      <Button
        onClick={onRecordingClick(currentSide)}
        className={`absolute bottom-2 left-2 ${isCurrentRecording ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} text-white rounded-full p-2 shadow-lg z-10`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </Button>
    </Card>
  );
};

export default FlipNumbersCard;
