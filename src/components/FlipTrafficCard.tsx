import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { TrafficLightProgress } from "@/components/TrafficLightProgress";
import stopSign from "@/assets/stop-sign.png";

interface FlipTrafficCardProps {
  onCardClick: (cardName: string) => void;
  onRecordingClick: (cardName: string) => (e: React.MouseEvent) => Promise<void>;
  isRecording: boolean;
  selectedCardForTest: string | null;
  recordingTime: number;
}

const FlipTrafficCard = ({
  onCardClick,
  onRecordingClick,
  isRecording,
  selectedCardForTest,
  recordingTime
}: FlipTrafficCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('.flip-indicator')) {
      return;
    }
    onCardClick("Basic Logic");
  };

  const currentTitle = isFlipped ? 'Stop Sign' : 'Traffic Robot';

  return (
    <Card 
      className={`bg-white p-4 w-80 h-72 border-4 border-dashed border-pink-400 shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer overflow-hidden ${isAnimating ? 'animate-pulse' : ''}`}
      onClick={handleClick}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Flip indicator */}
      <div 
        className="flip-indicator absolute top-2 right-2 z-20 cursor-pointer p-1 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
        onClick={handleFlip}
        title="Tap to flip"
      >
        <RefreshCw 
          className={`h-5 w-5 text-pink-500 ${isAnimating ? 'animate-spin' : ''}`}
        />
      </div>

      <div 
        className="w-full h-full flex flex-col items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front side - Traffic Robot */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className="text-xl font-bold text-pink-400 mb-4" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            Traffic Robot
          </h3>
          <div className="flex-1 flex items-center justify-center relative">
            <img 
              src={stopSign} 
              alt="Stop Sign" 
              className="absolute w-40 h-40 opacity-25"
            />
            <div className="scale-90 z-10">
              <TrafficLightProgress mode="traffic" />
            </div>
          </div>
        </div>

        {/* Back side - Stop Sign */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-xl font-bold text-red-500 mb-4" style={{ fontFamily: '"Bungee Shade", cursive' }}>
            Stop Sign
          </h3>
          <div className="flex-1 flex items-center justify-center">
            <img 
              src={stopSign} 
              alt="Stop Sign" 
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>

        {isRecording && selectedCardForTest === "Basic Logic" && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold z-30">
            {recordingTime}s / 30s
          </div>
        )}
      </div>

      <Button
        onClick={onRecordingClick("Basic Logic")}
        className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "Basic Logic" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </Button>
    </Card>
  );
};

export default FlipTrafficCard;
