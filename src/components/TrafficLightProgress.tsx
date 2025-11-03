import { useState } from "react";
import { cn } from "@/lib/utils";

interface TrafficLightProgressProps {
  onLevelChange?: (level: 'red' | 'yellow' | 'green') => void;
  initialLevel?: 'red' | 'yellow' | 'green' | null;
}

export const TrafficLightProgress = ({ onLevelChange, initialLevel = null }: TrafficLightProgressProps) => {
  const [selectedLevel, setSelectedLevel] = useState<'red' | 'yellow' | 'green' | null>(initialLevel);

  const handleLevelClick = (level: 'red' | 'yellow' | 'green') => {
    setSelectedLevel(level);
    onLevelChange?.(level);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl w-24">
      {/* Red Light */}
      <button
        onClick={() => handleLevelClick('red')}
        className={cn(
          "w-16 h-16 rounded-full border-4 border-gray-700 transition-all duration-300 relative overflow-hidden",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
          selectedLevel === 'red' 
            ? "bg-gradient-radial from-red-400 via-red-500 to-red-700 shadow-[0_0_40px_rgba(239,68,68,0.8)]" 
            : "bg-red-900/40 hover:bg-red-900/60"
        )}
        aria-label="Child is struggling to understand"
        title="Child is struggling to understand"
      >
        {selectedLevel === 'red' && (
          <div className="absolute inset-3 bg-gradient-radial from-white/60 to-transparent rounded-full" />
        )}
      </button>

      {/* Yellow Light */}
      <button
        onClick={() => handleLevelClick('yellow')}
        className={cn(
          "w-16 h-16 rounded-full border-4 border-gray-700 transition-all duration-300 relative overflow-hidden",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500",
          selectedLevel === 'yellow' 
            ? "bg-gradient-radial from-yellow-300 via-yellow-400 to-yellow-600 shadow-[0_0_40px_rgba(234,179,8,0.8)]" 
            : "bg-yellow-900/40 hover:bg-yellow-900/60"
        )}
        aria-label="Child's understanding is promising"
        title="Child's understanding is promising"
      >
        {selectedLevel === 'yellow' && (
          <div className="absolute inset-3 bg-gradient-radial from-white/60 to-transparent rounded-full" />
        )}
      </button>

      {/* Green Light */}
      <button
        onClick={() => handleLevelClick('green')}
        className={cn(
          "w-16 h-16 rounded-full border-4 border-gray-700 transition-all duration-300 relative overflow-hidden",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
          selectedLevel === 'green' 
            ? "bg-gradient-radial from-green-300 via-green-400 to-green-600 shadow-[0_0_40px_rgba(34,197,94,0.8)]" 
            : "bg-green-900/40 hover:bg-green-900/60"
        )}
        aria-label="Child is happy to progress to a new lesson"
        title="Child is happy to progress to a new lesson"
      >
        {selectedLevel === 'green' && (
          <div className="absolute inset-3 bg-gradient-radial from-white/60 to-transparent rounded-full" />
        )}
      </button>

      {/* Level description */}
      {selectedLevel && (
        <div className="mt-2 text-center">
          <p className="text-xs font-medium text-white">
            {selectedLevel === 'red' && "Struggling"}
            {selectedLevel === 'yellow' && "Promising"}
            {selectedLevel === 'green' && "Ready!"}
          </p>
        </div>
      )}
    </div>
  );
};
