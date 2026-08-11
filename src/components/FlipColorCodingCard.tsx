import { useState } from "react";
import { useAutoFlip } from "@/hooks/useAutoFlip";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import colorCodingChartAsset from "@/assets/color-coding-chart.jpg.asset.json";
import caterpillarChartAsset from "@/assets/caterpillar-color-code-chart.jpg.asset.json";
import matchPencilAsset from "@/assets/match-pencil-colors.jpg.asset.json";
import bottlesAsset from "@/assets/color-code-bottles.jpg.asset.json";
import iceCreamAsset from "@/assets/color-code-ice-cream.jpg.asset.json";

interface FlipColorCodingCardProps {
  onCardClick: (cardName: string) => void;
  onRecordingClick: (cardName: string) => (e: React.MouseEvent) => Promise<void>;
  isRecording: boolean;
  selectedCardForTest: string | null;
  recordingTime: number;
}

export const colorCodingSides = [
  {
    image: colorCodingChartAsset.url,
    alt: "Color coding chart showing an owl made of colorful geometric shapes for kids",
  },
  {
    image: caterpillarChartAsset.url,
    alt: "Use the code to colour the caterpillars activity sheet with colour code squares",
  },
  {
    image: matchPencilAsset.url,
    alt: "Match each coloured pencil to the correct empty box activity sheet",
  },
  {
    image: bottlesAsset.url,
    alt: "Use the colour code squares to colour the bottles activity sheet",
  },
  {
    image: iceCreamAsset.url,
    alt: "Use the code to colour the ice cream cones activity sheet",
  },
];

const CARD_NAME = "Color Coding";

const FlipColorCodingCard = ({
  onCardClick,
  onRecordingClick,
  isRecording,
  selectedCardForTest,
  recordingTime,
}: FlipColorCodingCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentData = colorCodingSides[currentIndex];
  const isActive = selectedCardForTest === CARD_NAME;

  const handleFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % colorCodingSides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const cardRef = useAutoFlip<HTMLDivElement>({
    onFlip: () => handleFlip(),
    enabled: !isRecording,
  });

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest(".flip-indicator")) return;
    onCardClick(CARD_NAME);
  };

  return (
    <Card
      ref={cardRef}
      className={`bg-white p-4 w-80 min-h-[400px] border-4 border-dashed border-amber-500 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer overflow-hidden ${isAnimating ? "animate-pulse" : ""}`}
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      <div
        className="flip-indicator absolute top-2 right-2 z-20 cursor-pointer p-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-600 transition-colors"
        onClick={handleFlip}
        title="Tap to flip"
      >
        <RefreshCw className={`h-5 w-5 ${isAnimating ? "animate-spin" : ""}`} />
      </div>

      <div className="absolute top-2 left-2 z-20 flex gap-1">
        {colorCodingSides.map((side, index) => (
          <div
            key={side.image}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-amber-500 scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div
        className="w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: isAnimating ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <CardContent className="p-0 relative" style={{ backfaceVisibility: "hidden" }}>
          <h3 className="text-xl font-bold text-amber-500 mb-2 text-center" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            Color Coding
          </h3>
          <img src={currentData.image} alt={currentData.alt} className="w-full h-auto rounded-lg" loading="lazy" />
          {isRecording && isActive && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold z-30">
              {recordingTime}s / 30s
            </div>
          )}
        </CardContent>
      </div>

      <Button
        onClick={onRecordingClick(CARD_NAME)}
        className={`absolute bottom-2 left-2 ${isRecording && isActive ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} text-white rounded-full p-2 shadow-lg z-10`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </Button>
    </Card>
  );
};

export default FlipColorCodingCard;
