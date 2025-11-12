import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SportPlayFieldProps {
  sport: string;
}

interface TargetZone {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

const sportConfigs = {
  soccer: {
    name: "Soccer",
    ball: "⚽",
    color1: "#00B050",
    color2: "#3D5A47",
    field: "Soccer Field - Score in the goals!",
    targets: [
      { x: 10, y: 40, width: 8, height: 20, label: "Left Goal" },
      { x: 82, y: 40, width: 8, height: 20, label: "Right Goal" },
    ],
  },
  rugby: {
    name: "Rugby",
    ball: "🏉",
    color1: "#C55A11",
    color2: "#5A3520",
    field: "Rugby Field - Score a try!",
    targets: [
      { x: 5, y: 35, width: 10, height: 30, label: "Try Zone Left" },
      { x: 85, y: 35, width: 10, height: 30, label: "Try Zone Right" },
    ],
  },
  cricket: {
    name: "Cricket",
    ball: "🏏",
    color1: "#8B4513",
    color2: "#4A3020",
    field: "Cricket Oval - Hit the stumps!",
    targets: [
      { x: 20, y: 45, width: 6, height: 10, label: "Stumps 1" },
      { x: 74, y: 45, width: 6, height: 10, label: "Stumps 2" },
      { x: 47, y: 20, width: 6, height: 10, label: "Stumps 3" },
      { x: 47, y: 70, width: 6, height: 10, label: "Stumps 4" },
    ],
  },
  tennis: {
    name: "Tennis",
    ball: "🎾",
    color1: "#CCFF00",
    color2: "#5A6040",
    field: "Tennis Court - Score in opponent's court!",
    targets: [
      { x: 5, y: 25, width: 40, height: 20, label: "Left Service Box" },
      { x: 55, y: 55, width: 40, height: 20, label: "Right Service Box" },
    ],
  },
  indigenous: {
    name: "Indigenous Games",
    ball: "🥎",
    color1: "#FF6B35",
    color2: "#8B4726",
    field: "Traditional Playing Area - Hit the targets!",
    targets: [
      { x: 15, y: 15, width: 15, height: 15, label: "Target 1" },
      { x: 70, y: 15, width: 15, height: 15, label: "Target 2" },
      { x: 15, y: 70, width: 15, height: 15, label: "Target 3" },
      { x: 70, y: 70, width: 15, height: 15, label: "Target 4" },
    ],
  },
};

export const SportPlayField = ({ sport }: SportPlayFieldProps) => {
  const config = sportConfigs[sport as keyof typeof sportConfigs] || sportConfigs.soccer;
  const ballRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [score, setScore] = useState(0);
  const [celebration, setCelebration] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, time: 0 });
  const animationFrame = useRef<number>();
  const lastScoredZone = useRef<string | null>(null);

  // Check if ball is in any target zone
  const checkScoring = (ballX: number, ballY: number) => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // Convert ball position to percentage
    const ballXPercent = (ballX / containerWidth) * 100;
    const ballYPercent = (ballY / containerHeight) * 100;
    
    for (const target of config.targets) {
      const inZone = 
        ballXPercent >= target.x &&
        ballXPercent <= target.x + target.width &&
        ballYPercent >= target.y &&
        ballYPercent <= target.y + target.height;
      
      if (inZone && lastScoredZone.current !== target.label) {
        // Score!
        setScore((prev) => prev + 1);
        setCelebration(true);
        lastScoredZone.current = target.label;
        toast.success(`🎉 GOAL! Scored in ${target.label}!`, {
          duration: 2000,
        });
        
        // Reset celebration after animation
        setTimeout(() => {
          setCelebration(false);
          lastScoredZone.current = null;
        }, 1000);
        
        break;
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { 
      x: e.clientX - position.x, 
      y: e.clientY - position.y,
      time: Date.now()
    };
    setVelocity({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    dragStart.current = { 
      x: touch.clientX - position.x, 
      y: touch.clientY - position.y,
      time: Date.now()
    };
    setVelocity({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      setPosition({ x: newX, y: newY });
      checkScoring(newX, newY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.current.x;
      const newY = touch.clientY - dragStart.current.y;
      setPosition({ x: newX, y: newY });
      checkScoring(newX, newY);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      const timeDiff = (Date.now() - dragStart.current.time) / 1000;
      const dx = (e.clientX - dragStart.current.x - position.x) / timeDiff;
      const dy = (e.clientY - dragStart.current.y - position.y) / timeDiff;
      setVelocity({ x: dx / 10, y: dy / 10 });
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging && (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1)) {
      const animate = () => {
        setPosition((prev) => {
          let newX = prev.x + velocity.x;
          let newY = prev.y + velocity.y;
          let newVx = velocity.x;
          let newVy = velocity.y;

          // Bounce off walls
          const maxX = window.innerWidth - 100;
          const maxY = window.innerHeight - 100;

          if (newX <= 0 || newX >= maxX) {
            newVx = -newVx * 0.7;
            newX = newX <= 0 ? 0 : maxX;
          }
          if (newY <= 0 || newY >= maxY) {
            newVy = -newVy * 0.7;
            newY = newY <= 0 ? 0 : maxY;
          }

          // Apply friction
          newVx *= 0.98;
          newVy *= 0.98;

          setVelocity({ x: newVx, y: newVy });

          // Update rotation based on velocity
          setRotation((prev) => prev + Math.abs(newVx) + Math.abs(newVy));

          // Check for scoring
          checkScoring(newX, newY);

          return { x: newX, y: newY };
        });

        animationFrame.current = requestAnimationFrame(animate);
      };

      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [velocity, isDragging]);

  const resetGame = () => {
    setScore(0);
    setPosition({ x: 50, y: 50 });
    setVelocity({ x: 0, y: 0 });
    setRotation(0);
    lastScoredZone.current = null;
    toast.info("Game reset!");
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${config.color1} 0%, ${config.color2} 100%)`,
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 2px, transparent 2px)',
        backgroundSize: '20px 20px',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Score Display */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <div 
          className={`px-8 py-4 rounded-2xl text-center transition-all duration-300 ${
            celebration ? 'scale-125' : 'scale-100'
          }`}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            boxShadow: celebration ? '0 0 30px rgba(255, 215, 0, 0.8)' : '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <p className="text-sm font-semibold text-gray-600 mb-1">SCORE</p>
          <p className="text-5xl font-bold" style={{ color: config.color1 }}>
            {score}
          </p>
        </div>
      </div>

      {/* Reset Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          onClick={resetGame}
          variant="secondary"
          size="sm"
          className="backdrop-blur-sm bg-white/90 hover:bg-white"
        >
          Reset Game
        </Button>
      </div>

      {/* Target Zones */}
      {config.targets.map((target, index) => (
        <div
          key={index}
          className="absolute border-4 border-dashed rounded-lg transition-all duration-300"
          style={{
            left: `${target.x}%`,
            top: `${target.y}%`,
            width: `${target.width}%`,
            height: `${target.height}%`,
            borderColor: 'rgba(255, 255, 255, 0.6)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {target.label}
          </div>
        </div>
      ))}
      {/* Title */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none z-0">
        <h1 
          className="text-6xl md:text-8xl font-bold mb-4"
          style={{ 
            color: config.color1,
            mixBlendMode: 'color-burn',
            fontFamily: 'Montserrat, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {config.name}
        </h1>
        <p 
          className="text-xl md:text-2xl font-semibold"
          style={{ 
            color: config.color2,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {config.field}
        </p>
      </div>

      {/* Ball */}
      <div
        ref={ballRef}
        className={`absolute cursor-grab active:cursor-grabbing select-none transition-all ${
          celebration ? 'animate-bounce' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '100px',
          height: '100px',
          fontSize: '80px',
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s',
          filter: celebration 
            ? 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
            : 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
          zIndex: 10,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {config.ball}
      </div>

      {/* Instructions */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-center z-50 max-w-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <p className="text-sm font-semibold text-gray-800">
          Drag the ball into the target zones to score points! 🎯
        </p>
      </div>
    </div>
  );
};
