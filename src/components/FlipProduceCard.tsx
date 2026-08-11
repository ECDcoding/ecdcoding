import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import fruitsChartAsset from "@/assets/fruits-chart.jpg.asset.json";
import vegetablesChartAsset from "@/assets/vegetables-chart.jpg.asset.json";

interface FlipProduceCardProps {
  onCardClick: (cardName: string) => void;
  onRecordingClick: (cardName: string) => (e: React.MouseEvent) => Promise<void>;
  isRecording: boolean;
  selectedCardForTest: string | null;
  recordingTime: number;
}

const produceSides = ["Fruits Chart", "Vegetables Chart"] as const;
type ProduceSide = typeof produceSides[number];

const produceData: Record<ProduceSide, { title: string; image: string; alt: string; color: string; borderColor: string; dot: string; chip: string }> = {
  "Fruits Chart": {
    title: "Fruits Chart",
    image: fruitsChartAsset.url,
    alt: "Fun fruits names for kids chart showing apple, banana, grapes, orange, strawberry, blueberry, mango, watermelon, pineapple, kiwi, cherry and papaya",
    color: "text-red-500",
    borderColor: "border-red-500",
    dot: "bg-red-500",
    chip: "bg-red-100 hover:bg-red-200 text-red-500",
  },
  "Vegetables Chart": {
    title: "Vegetables Chart",
    image: vegetablesChartAsset.url,
    alt: "Vegetables chart showing carrot, cabbage, chilli, onion, potato, tomato, beetroot, brinjal and pumpkin",
    color: "text-green-600",
    borderColor: "border-green-600",
    dot: "bg-green-600",
    chip: "bg-green-100 hover:bg-green-200 text-green-600",
  },
};

const FlipProduceCard = ({
  onCardClick,
  onRecordingClick,
  isRecording,
  selectedCardForTest,
  recordingTime,
}: FlipProduceCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSide = produceSides[currentIndex];
  const currentData = produceData[currentSide];
  const isActive = selectedCardForTest === "Fruits Chart" || selectedCardForTest === "Vegetables Chart";

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % produceSides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest(".flip-indicator")) return;
    onCardClick(currentSide);
  };

  return (
    <Card
      className={`bg-white p-4 w-80 min-h-[400px] border-4 border-dashed ${currentData.borderColor} shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer overflow-hidden ${isAnimating ? "animate-pulse" : ""}`}
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      {/* Flip indicator */}
      <div
        className={`flip-indicator absolute top-2 right-2 z-20 cursor-pointer p-1 rounded-full transition-colors ${currentData.chip}`}
        onClick={handleFlip}
        title="Tap to flip"
      >
        <RefreshCw className={`h-5 w-5 ${isAnimating ? "animate-spin" : ""}`} />
      </div>

      {/* Side indicator dots */}
      <div className="absolute top-2 left-2 z-20 flex gap-1">
        {produceSides.map((side, index) => (
          <div
            key={side}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? `${currentData.dot} scale-125` : "bg-gray-300"
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
          <h3 className={`text-xl font-bold ${currentData.color} mb-2 text-center`} style={{ fontFamily: '"Bungee Shade", cursive' }}>
            {currentData.title}
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
        onClick={onRecordingClick(currentSide)}
        className={`absolute bottom-2 left-2 ${isRecording && isActive ? "bg-red-500 hover:bg-red-600" : "bg-lime-500 hover:bg-lime-600"} text-white rounded-full p-2 shadow-lg z-10`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </Button>
    </Card>
  );
};

export default FlipProduceCard;
