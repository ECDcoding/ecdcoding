import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface SportPlayFieldProps {
  sport: string;
}

const sportConfigs = {
  soccer: {
    name: "Soccer",
    ball: "⚽",
    color1: "#00B050",
    color2: "#3D5A47",
    field: "Soccer Field - Rectangular with goals at each end",
  },
  rugby: {
    name: "Rugby",
    ball: "🏉",
    color1: "#C55A11",
    color2: "#5A3520",
    field: "Rugby Field - Rectangular with H-shaped posts",
  },
  cricket: {
    name: "Cricket",
    ball: "🏏",
    color1: "#8B4513",
    color2: "#4A3020",
    field: "Cricket Oval - Circular/Oval with pitch in center",
  },
  tennis: {
    name: "Tennis",
    ball: "🎾",
    color1: "#CCFF00",
    color2: "#5A6040",
    field: "Tennis Court - Rectangular with net in middle",
  },
  indigenous: {
    name: "Indigenous Games",
    ball: "🥎",
    color1: "#FF6B35",
    color2: "#8B4726",
    field: "Traditional Playing Area - Open field",
  },
};

export const SportPlayField = ({ sport }: SportPlayFieldProps) => {
  const config = sportConfigs[sport as keyof typeof sportConfigs] || sportConfigs.soccer;
  const ballRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const dragStart = useRef({ x: 0, y: 0, time: 0 });
  const animationFrame = useRef<number>();

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
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.current.x,
        y: touch.clientY - dragStart.current.y,
      });
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

  return (
    <div
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
        className="absolute cursor-grab active:cursor-grabbing select-none"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '100px',
          height: '100px',
          fontSize: '80px',
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s',
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
          zIndex: 10,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {config.ball}
      </div>

      {/* Instructions */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-center z-50"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <p className="text-sm font-semibold text-gray-800">
          Drag and release the ball to make it bounce and spin around the field!
        </p>
      </div>
    </div>
  );
};
