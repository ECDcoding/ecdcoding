import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import dumpTruckIcon from "@/assets/transport/dump-truck.png";
import airplaneIcon from "@/assets/transport/airplane.png";
import boatShipIcon from "@/assets/transport/boat-ship.png";
import railTransportVehicles from "@/assets/rail-transport-vehicles.jpg";

interface FlipTransportCardProps {
  onCardClick: (cardName: string) => void;
  onRecordingClick: (cardName: string) => (e: React.MouseEvent) => Promise<void>;
  isRecording: boolean;
  selectedCardForTest: string | null;
  recordingTime: number;
}

type TransportSide = 'road' | 'air' | 'sea' | 'rail';

const transportData: Record<TransportSide, { title: string; image: string; color: string }> = {
  road: { title: 'Road', image: dumpTruckIcon, color: 'text-blue-600' },
  air: { title: 'Air', image: airplaneIcon, color: 'text-sky-500' },
  sea: { title: 'Sea', image: boatShipIcon, color: 'text-teal-500' },
  rail: { title: 'Rail', image: railTransportVehicles, color: 'text-orange-500' },
};

const sideOrder: TransportSide[] = ['road', 'air', 'sea', 'rail'];

const FlipTransportCard = ({
  onCardClick,
  onRecordingClick,
  isRecording,
  selectedCardForTest,
  recordingTime
}: FlipTransportCardProps) => {
  const [currentSideIndex, setCurrentSideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentSide = sideOrder[currentSideIndex];
  const currentData = transportData[currentSide];

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSideIndex((prev) => (prev + 1) % sideOrder.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('.flip-indicator')) {
      return;
    }
    onCardClick("Transportation");
  };

  return (
    <Card 
      className={`bg-white p-4 w-80 min-h-[400px] border-4 border-dashed border-blue-600 shadow-lg transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all flex-shrink-0 relative cursor-pointer overflow-hidden ${isAnimating ? 'animate-pulse' : ''}`}
      onClick={handleClick}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Flip indicator */}
      <div 
        className="flip-indicator absolute top-2 right-2 z-20 cursor-pointer p-1 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
        onClick={handleFlip}
        title="Tap to flip"
      >
        <RefreshCw 
          className={`h-5 w-5 text-blue-500 ${isAnimating ? 'animate-spin' : ''}`}
        />
      </div>

      {/* Side indicator dots */}
      <div className="absolute top-2 left-2 z-20 flex gap-1">
        {sideOrder.map((side, index) => (
          <div 
            key={side}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSideIndex 
                ? 'bg-blue-600 scale-125' 
                : 'bg-gray-300'
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
        <div 
          className="flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <h3 className={`text-xl font-bold ${currentData.color} mb-4`} style={{ fontFamily: '"Bungee Shade", cursive' }}>
            {currentData.title} Transport
          </h3>
          <div className="flex-1 flex items-center justify-center">
            <img 
              src={currentData.image} 
              alt={`${currentData.title} Transport`} 
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>

        {isRecording && selectedCardForTest === "Transportation" && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold z-30">
            {recordingTime}s / 30s
          </div>
        )}
      </div>

      <Button
        onClick={onRecordingClick("Transportation")}
        className={`absolute bottom-2 left-2 ${isRecording && selectedCardForTest === "Transportation" ? 'bg-red-500 hover:bg-red-600' : 'bg-lime-500 hover:bg-lime-600'} text-white rounded-full p-2 shadow-lg z-10`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </Button>
    </Card>
  );
};

export default FlipTransportCard;
