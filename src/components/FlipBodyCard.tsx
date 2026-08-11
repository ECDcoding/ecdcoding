import { useState } from "react";
import { useAutoFlip } from "@/hooks/useAutoFlip";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import girlBodyMyBody from "@/assets/girl-body-my-body.jpg";
import boyBodyMyBody from "@/assets/boy-body-my-body.jpg";

interface FlipBodyCardProps {
  onCardClick: (cardName: string) => void;
  onRecordingClick: (cardName: string) => (e: React.MouseEvent) => Promise<void>;
  isRecording: boolean;
  selectedCardForTest: string | null;
  recordingTime: number;
}

const bodySides = ["Girl's Body", "Boy's Body"] as const;

const FlipBodyCard = ({
  onCardClick,
  onRecordingClick,
  isRecording,
  selectedCardForTest,
  recordingTime,
}: FlipBodyCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const currentSide = bodySides[currentIndex];
  const currentImage = currentIndex === 0 ? girlBodyMyBody : boyBodyMyBody;
  const borderColor = currentIndex === 0 ? "border-yellow-400" : "border-red-400";
  
  const handleFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % bodySides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };
  
  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger card click when clicking the mic button or flip icon
    if ((e.target as HTMLElement).closest('button, .flip-indicator')) {
      return;
    }
    onCardClick(currentSide);
  };

  return (
    <div 
      className="flip-card-container w-80 flex-shrink-0"
      style={{ perspective: "1000px" }}
    >
      <Card 
        className={`bg-white p-4 w-80 min-h-[400px] border-4 border-dashed ${borderColor} shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all relative cursor-pointer`}
        onClick={handleClick}
      >
        <CardContent className="p-0 relative">
          {/* Side indicator dots */}
          <div className="absolute top-2 left-2 z-20 flex gap-1">
            {bodySides.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? (currentIndex === 0 ? 'bg-yellow-400' : 'bg-red-400') + ' scale-125' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Flip indicator icon */}
          <div 
            className="flip-indicator absolute top-2 right-2 z-20 cursor-pointer group"
            onClick={handleFlip}
            title="Click to flip card"
          >
            <div className={`bg-gradient-to-r ${currentIndex === 1 ? 'from-red-400 to-yellow-400' : 'from-yellow-400 to-red-400'} p-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110`}>
              <RefreshCw 
                className={`h-5 w-5 text-white ${isAnimating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-300'}`}
              />
            </div>
            <span className="absolute -bottom-6 right-0 text-xs bg-black/70 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Tap to flip
            </span>
          </div>
          <h3 className="text-lg font-bold text-center mb-2" style={{ color: currentIndex === 1 ? "#f87171" : "#facc15" }}>
            {currentSide}
          </h3>
          <div className={`transition-transform duration-500 ${isAnimating ? 'scale-95' : 'scale-100'}`}>
            <img 
              src={currentImage} 
              alt={`${currentSide} diagram`}
              className="w-full h-auto rounded-lg" 
            />
          </div>
          {isRecording && selectedCardForTest === currentSide && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
              {recordingTime}s / 30s
            </div>
          )}
        </CardContent>
        <Button
          onClick={onRecordingClick(currentSide)}
          className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === currentSide ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </Button>
      </Card>
    </div>
  );
};

export default FlipBodyCard;
