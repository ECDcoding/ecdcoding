import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import girlBodyMyBody from "@/assets/girl-body-my-body.jpg";
import boyBodyMyBody from "@/assets/boy-body-my-body.jpg";

interface FlipBodyCardProps {
  onCardClick: (cardName: string) => void;
  onRecordingClick: (cardName: string) => (e: React.MouseEvent) => Promise<void>;
  isRecording: boolean;
  selectedCardForTest: string | null;
  recordingTime: number;
}

const FlipBodyCard = ({
  onCardClick,
  onRecordingClick,
  isRecording,
  selectedCardForTest,
  recordingTime,
}: FlipBodyCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const currentSide = isFlipped ? "Boy's Body" : "Girl's Body";
  const currentImage = isFlipped ? boyBodyMyBody : girlBodyMyBody;
  const borderColor = isFlipped ? "border-red-400" : "border-yellow-400";
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };
  
  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger card click when clicking the mic button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onCardClick(currentSide);
  };

  return (
    <div 
      className="flip-card-container w-80 flex-shrink-0"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`flip-card-inner relative transition-transform duration-500`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front - Girl's Body */}
        <Card 
          className={`bg-white p-4 w-80 border-4 border-dashed ${borderColor} shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all relative cursor-pointer`}
          style={{
            backfaceVisibility: "hidden",
            position: isFlipped ? "absolute" : "relative",
            opacity: isFlipped ? 0 : 1,
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          <CardContent className="p-0 relative">
            <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-red-400 text-white text-xs px-2 py-1 rounded-full font-bold z-10 shadow-md">
              Double-click to flip
            </div>
            <h3 className="text-lg font-bold text-center mb-2" style={{ color: isFlipped ? "#f87171" : "#facc15" }}>
              {isFlipped ? "Boy's Body" : "Girl's Body"}
            </h3>
            <img 
              src={currentImage} 
              alt={`${currentSide} diagram`}
              className="w-full h-auto rounded-lg" 
            />
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
    </div>
  );
};

export default FlipBodyCard;
