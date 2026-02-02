import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Volume2, VolumeX, Cpu, Lightbulb, Battery, Bluetooth, Compass, ThermometerSun, Music, Zap, Usb, Mic, Speaker, RotateCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
// The files were named incorrectly - swapping the imports to match actual content
import microbitFront from "@/assets/microbit-back-annotated.png"; // This image shows the LED/button side (front)
import microbitBack from "@/assets/microbit-front-annotated.png"; // This image shows the battery/processor side (back)

interface MicrobitSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  narrationText: string;
  color: string;
  side: 'front' | 'back';
  // Position for flashing arrow (percentage from top-left of image)
  arrowPosition: { x: number; y: number; direction: 'left' | 'right' | 'up' | 'down' };
}

const microbitSections: MicrobitSection[] = [
  {
    id: "intro",
    icon: <Cpu className="h-8 w-8" />,
    title: "What is a Micro:bit?",
    description: "The BBC micro:bit is a pocket-sized computer that introduces you to how software and hardware work together.",
    narrationText: "Welcome to the Micro bit analysis! The BBC micro bit is a pocket-sized computer that introduces you to how software and hardware work together. It's perfect for learning coding and electronics!",
    color: "from-purple-500 to-indigo-600",
    side: 'front',
    arrowPosition: { x: 5, y: 50, direction: 'down' }
  },
  {
    id: "leds",
    icon: <Lightbulb className="h-8 w-8" />,
    title: "LED Display (25 LEDs)",
    description: "The front has a 5x5 grid of 25 LEDs that can display images, text, and numbers. Each LED can be individually controlled!",
    narrationText: "The front of the micro bit has a 5 by 5 grid of 25 L E D lights. These can display images, text, and numbers. Each L E D can be controlled individually to create cool patterns and animations!",
    color: "from-yellow-500 to-orange-600",
    side: 'front',
    arrowPosition: { x: 50, y: 40, direction: 'down' }
  },
  {
    id: "buttons",
    icon: <Zap className="h-8 w-8" />,
    title: "Programmable Buttons (A & B)",
    description: "Two buttons labeled A and B on the front can be programmed to do different things when pressed alone or together.",
    narrationText: "There are two programmable buttons on the micro bit, labeled A and B. You can program these buttons to do different things when pressed alone, or even when pressed together at the same time!",
    color: "from-blue-500 to-cyan-600",
    side: 'front',
    arrowPosition: { x: 12, y: 50, direction: 'right' }
  },
  {
    id: "usb",
    icon: <Usb className="h-8 w-8" />,
    title: "USB Connector",
    description: "Connect your Micro:bit to a computer using a USB cable to upload your programs and power the device.",
    narrationText: "The U S B connector at the top lets you connect the micro bit to your computer. You use this to upload your programs and it also provides power to the micro bit while connected.",
    color: "from-gray-500 to-slate-600",
    side: 'back',
    arrowPosition: { x: 50, y: 15, direction: 'down' }
  },
  {
    id: "microphone",
    icon: <Mic className="h-8 w-8" />,
    title: "Microphone",
    description: "The Micro:bit V2 has a built-in microphone that can detect sounds, clapping, and voice levels.",
    narrationText: "The micro bit version 2 has a built-in microphone! It can detect sounds like clapping, loud noises, or even respond to your voice. You can make sound-activated projects!",
    color: "from-pink-500 to-rose-600",
    side: 'front',
    arrowPosition: { x: 88, y: 12, direction: 'left' }
  },
  {
    id: "speaker",
    icon: <Speaker className="h-8 w-8" />,
    title: "Speaker",
    description: "The built-in speaker can play sounds, music, and melodies. Perfect for musical projects!",
    narrationText: "The speaker on the back can play sounds, music, and melodies. You can create your own songs or add sound effects to your projects. It's like having a tiny music player!",
    color: "from-violet-500 to-purple-600",
    side: 'back',
    arrowPosition: { x: 25, y: 75, direction: 'right' }
  },
  {
    id: "processor",
    icon: <Cpu className="h-8 w-8" />,
    title: "Processor & Temperature Sensor",
    description: "The brain of the Micro:bit! It runs your programs and can also measure the temperature around it.",
    narrationText: "The processor is the brain of the micro bit. It runs all your programs and makes everything work. It also has a temperature sensor built in, so you can measure how warm or cold it is!",
    color: "from-red-500 to-orange-600",
    side: 'back',
    arrowPosition: { x: 22, y: 20, direction: 'right' }
  },
  {
    id: "accelerometer",
    icon: <Compass className="h-8 w-8" />,
    title: "Accelerometer & Compass",
    description: "Detects movement, tilting, and shaking. The compass tells you which direction is North!",
    narrationText: "The accelerometer detects when you move, tilt, or shake the micro bit. The compass, also called a magnetometer, tells you which direction is North. Great for making games and navigation projects!",
    color: "from-green-500 to-emerald-600",
    side: 'back',
    arrowPosition: { x: 35, y: 65, direction: 'right' }
  },
  {
    id: "bluetooth",
    icon: <Bluetooth className="h-8 w-8" />,
    title: "Bluetooth & Radio Antenna",
    description: "Connect wirelessly to phones, tablets, or other micro:bits. Send messages between devices!",
    narrationText: "The Bluetooth and radio antenna lets you connect wirelessly to phones, tablets, or other micro bits. You can send messages between devices or control your projects remotely!",
    color: "from-blue-600 to-violet-600",
    side: 'back',
    arrowPosition: { x: 15, y: 30, direction: 'right' }
  },
  {
    id: "power",
    icon: <Battery className="h-8 w-8" />,
    title: "Battery Connector",
    description: "Use 2 AAA batteries to power your Micro:bit anywhere! Perfect for portable projects.",
    narrationText: "The battery connector lets you use 2 triple A batteries to power your micro bit. This makes your projects portable so you can take them anywhere you go!",
    color: "from-amber-500 to-yellow-600",
    side: 'back',
    arrowPosition: { x: 75, y: 18, direction: 'right' }
  },
  {
    id: "pins",
    icon: <Zap className="h-8 w-8" />,
    title: "Edge Connector Pins",
    description: "Connect external components like motors, sensors, and LEDs using these gold pins at the bottom.",
    narrationText: "The gold pins at the bottom are called edge connector pins. You can connect external components like motors, sensors, lights, and many other electronic parts to expand what your micro bit can do!",
    color: "from-yellow-600 to-amber-700",
    side: 'front',
    arrowPosition: { x: 50, y: 88, direction: 'up' }
  }
];

// Flashing Arrow Component
const FlashingArrow = ({ position, color }: { 
  position: { x: number; y: number; direction: 'left' | 'right' | 'up' | 'down' };
  color: string;
}) => {
  const ArrowIcon = {
    up: ArrowUp,
    down: ArrowDown,
    left: ArrowLeft,
    right: ArrowRight
  }[position.direction];

  // Calculate offset based on direction
  const getOffset = () => {
    switch (position.direction) {
      case 'up': return { transform: 'translate(-50%, 0)' };
      case 'down': return { transform: 'translate(-50%, -100%)' };
      case 'left': return { transform: 'translate(0, -50%)' };
      case 'right': return { transform: 'translate(-100%, -50%)' };
    }
  };

  return (
    <div 
      className="absolute z-20 pointer-events-none"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        ...getOffset()
      }}
    >
      <div className={`animate-pulse`}>
        <div className={`p-2 rounded-full bg-gradient-to-r ${color} shadow-lg animate-bounce`}>
          <ArrowIcon className="h-6 w-6 text-white drop-shadow-lg" strokeWidth={3} />
        </div>
      </div>
      {/* Pulsing ring effect */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-50 animate-ping`}
        style={{ animationDuration: '1s' }}
      />
    </div>
  );
};

interface MicrobitAnalysisNarratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const MicrobitAnalysisNarrator = ({ isOpen, onClose }: MicrobitAnalysisNarratorProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [narratedSections, setNarratedSections] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Flip the card based on which side the current section is showing
  useEffect(() => {
    const currentSide = microbitSections[currentSection]?.side;
    setIsFlipped(currentSide === 'back');
  }, [currentSection]);

  const stopNarration = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsNarrating(false);
  }, []);

  const narrateSection = useCallback((section: MicrobitSection) => {
    if (isMuted || narratedSections.has(section.id)) return;
    
    stopNarration();
    setIsNarrating(true);
    setIsLoading(true);
    
    // Use free browser Speech Synthesis API
    if ('speechSynthesis' in window) {
      setIsLoading(false);
      const utterance = new SpeechSynthesisUtterance(section.narrationText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      
      // Try to use a child-friendly voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google UK English Female')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => {
        setIsNarrating(false);
        setNarratedSections(prev => new Set([...prev, section.id]));
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      setIsLoading(false);
      setIsNarrating(false);
    }
  }, [isMuted, narratedSections, stopNarration]);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(containerCenter - sectionCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      }
    });
    
    if (closestIndex !== currentSection) {
      setCurrentSection(closestIndex);
      
      // Auto-narrate when section comes into view
      if (!isMuted && !narratedSections.has(microbitSections[closestIndex].id)) {
        narrateSection(microbitSections[closestIndex]);
      }
    }
  }, [currentSection, isMuted, narratedSections, narrateSection]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (isOpen && !isMuted && microbitSections.length > 0) {
      // Start narrating the first section when dialog opens
      const timer = setTimeout(() => {
        narrateSection(microbitSections[0]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMuted, narrateSection]);

  useEffect(() => {
    if (!isOpen) {
      stopNarration();
      setNarratedSections(new Set());
      setCurrentSection(0);
      setIsFlipped(false);
    }
  }, [isOpen, stopNarration]);

  const toggleMute = () => {
    if (!isMuted) {
      stopNarration();
    }
    setIsMuted(!isMuted);
  };

  const replaySection = () => {
    setNarratedSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(microbitSections[currentSection].id);
      return newSet;
    });
    narrateSection(microbitSections[currentSection]);
  };

  const manualFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] max-h-[95vh] w-[1200px] h-[90vh] p-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-purple-500/30 overflow-hidden">
        <DialogHeader className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-white" />
            <DialogTitle className="text-white font-bold text-xl">
              🔬 Micro:bit Analysis with Voice Guide
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={replaySection}
              disabled={isNarrating || isLoading}
              className="text-white hover:bg-white/20 text-sm"
            >
              🔄 Replay
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="px-6 py-2 bg-black/30 flex items-center gap-2">
          {microbitSections.map((section, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : index < currentSection || narratedSections.has(section.id)
                  ? 'bg-green-500/60'
                  : 'bg-gray-600/40'
              }`}
            />
          ))}
        </div>

        {/* Narration status */}
        {(isNarrating || isLoading) && (
          <div className="px-6 py-2 bg-purple-600/20 flex items-center gap-2 text-white text-sm">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>{isLoading ? 'Loading narration...' : 'Narrating...'}</span>
          </div>
        )}

        {/* Main content area with flip card and sections */}
        <div className="flex flex-1 overflow-hidden" style={{ maxHeight: 'calc(90vh - 130px)' }}>
          {/* Flip Card - Left side */}
          <div className="w-1/2 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900/50 to-slate-800/50">
            <div className="relative mb-4">
              <div 
                className="w-[320px] h-[400px] perspective-1000"
                style={{ perspective: '1000px' }}
              >
                <div 
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                {/* Front side */}
                  <div 
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <img 
                      src={microbitFront} 
                      alt="Micro:bit Front View" 
                      className="w-full h-full object-contain bg-white p-2"
                    />
                    {/* Flashing arrow for front side features */}
                    {!isFlipped && microbitSections[currentSection]?.side === 'front' && isNarrating && (
                      <FlashingArrow 
                        position={microbitSections[currentSection].arrowPosition}
                        color={microbitSections[currentSection].color}
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-bold text-center">Front View</p>
                    </div>
                  </div>
                  
                  {/* Back side */}
                  <div 
                    className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 rotate-y-180"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <img 
                      src={microbitBack} 
                      alt="Micro:bit Back View" 
                      className="w-full h-full object-contain bg-white p-2"
                    />
                    {/* Flashing arrow for back side features */}
                    {isFlipped && microbitSections[currentSection]?.side === 'back' && isNarrating && (
                      <FlashingArrow 
                        position={microbitSections[currentSection].arrowPosition}
                        color={microbitSections[currentSection].color}
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-bold text-center">Back View</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flip indicator */}
            <div className="flex items-center gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={manualFlip}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Flip Card
              </Button>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isFlipped 
                  ? 'bg-purple-500/30 text-purple-200' 
                  : 'bg-blue-500/30 text-blue-200'
              }`}>
                {isFlipped ? '📍 Back Side' : '📍 Front Side'}
              </div>
            </div>

            {/* Current feature highlight */}
            <div className={`mt-6 px-6 py-4 rounded-xl bg-gradient-to-r ${microbitSections[currentSection]?.color} text-white text-center max-w-xs shadow-lg`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {microbitSections[currentSection]?.icon}
                <span className="font-bold">{microbitSections[currentSection]?.title}</span>
              </div>
              <p className="text-sm opacity-90">
                Currently viewing: {microbitSections[currentSection]?.side === 'front' ? 'Front' : 'Back'} of the Micro:bit
              </p>
            </div>
          </div>

          {/* Scrollable sections - Right side */}
          <div
            ref={scrollContainerRef}
            className="w-1/2 overflow-y-auto px-6 py-4 space-y-6"
          >
            {microbitSections.map((section, index) => (
              <div
                key={section.id}
                ref={el => sectionRefs.current[index] = el}
                className={`relative rounded-2xl p-6 transition-all duration-500 transform cursor-pointer ${
                  index === currentSection
                    ? 'scale-100 opacity-100 ring-2 ring-white/30 shadow-xl'
                    : 'scale-95 opacity-70 hover:opacity-90'
                }`}
                onClick={() => {
                  setCurrentSection(index);
                  if (!isMuted && !narratedSections.has(section.id)) {
                    narrateSection(section);
                  }
                }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${section.color} opacity-20`} />
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${section.color} text-white shadow-lg`}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          section.side === 'front' 
                            ? 'bg-blue-500/30 text-blue-300' 
                            : 'bg-purple-500/30 text-purple-300'
                        }`}>
                          {section.side === 'front' ? '📱 Front' : '🔧 Back'}
                        </span>
                        {narratedSections.has(section.id) && (
                          <span className="text-green-400 text-xs">✓ Heard</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-gray-300 text-base leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Visual indicator when this section is being narrated */}
                  {isNarrating && index === currentSection && (
                    <div className="mt-4 flex items-center gap-2 text-purple-300">
                      <Volume2 className="h-4 w-4 animate-pulse" />
                      <span className="text-sm">Speaking...</span>
                      <div className="flex gap-1 ml-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-purple-400 rounded-full animate-pulse"
                            style={{
                              height: `${8 + Math.random() * 12}px`,
                              animationDelay: `${i * 100}ms`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* End section */}
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                🎉 Great job! You've learned about the Micro:bit!
              </div>
              <p className="text-gray-400 mt-4">
                Now try building projects with MakeCode or the Micro:bit Classroom!
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MicrobitAnalysisNarrator;
