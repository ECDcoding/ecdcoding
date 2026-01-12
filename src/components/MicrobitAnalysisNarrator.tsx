import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Volume2, VolumeX, Cpu, Lightbulb, Battery, Bluetooth, Compass, ThermometerSun, Music, Zap } from "lucide-react";

interface MicrobitSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  narrationText: string;
  color: string;
}

const microbitSections: MicrobitSection[] = [
  {
    id: "intro",
    icon: <Cpu className="h-8 w-8" />,
    title: "What is a Micro:bit?",
    description: "The BBC micro:bit is a pocket-sized computer that introduces you to how software and hardware work together.",
    narrationText: "Welcome to the Micro bit analysis! The BBC micro bit is a pocket-sized computer that introduces you to how software and hardware work together. It's perfect for learning coding and electronics!",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: "leds",
    icon: <Lightbulb className="h-8 w-8" />,
    title: "LED Display (25 LEDs)",
    description: "The front has a 5x5 grid of 25 LEDs that can display images, text, and numbers. Each LED can be individually controlled!",
    narrationText: "The front of the micro bit has a 5 by 5 grid of 25 L E D lights. These can display images, text, and numbers. Each L E D can be controlled individually to create cool patterns and animations!",
    color: "from-yellow-500 to-orange-600"
  },
  {
    id: "buttons",
    icon: <Zap className="h-8 w-8" />,
    title: "Programmable Buttons (A & B)",
    description: "Two buttons labeled A and B on the front can be programmed to do different things when pressed alone or together.",
    narrationText: "There are two programmable buttons on the micro bit, labeled A and B. You can program these buttons to do different things when pressed alone, or even when pressed together at the same time!",
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "accelerometer",
    icon: <Compass className="h-8 w-8" />,
    title: "Motion Sensor (Accelerometer)",
    description: "The micro:bit can detect movement and orientation - shake it, tilt it, or drop it (gently!) to trigger actions.",
    narrationText: "The micro bit has a motion sensor called an accelerometer. It can detect when you shake it, tilt it left or right, up or down, or even when you drop it gently. This is how games can respond to your movements!",
    color: "from-green-500 to-emerald-600"
  },
  {
    id: "compass",
    icon: <Compass className="h-8 w-8" />,
    title: "Compass (Magnetometer)",
    description: "A built-in compass can detect magnetic fields and tell you which direction is North. Great for navigation projects!",
    narrationText: "The micro bit has a built-in compass, also called a magnetometer. It can detect magnetic fields and tell you which direction is North. This is great for making navigation projects or detecting metal objects!",
    color: "from-teal-500 to-green-600"
  },
  {
    id: "temperature",
    icon: <ThermometerSun className="h-8 w-8" />,
    title: "Temperature Sensor",
    description: "The processor chip can measure its own temperature, which tells you approximately how warm or cold it is around the micro:bit.",
    narrationText: "The micro bit can measure temperature! The processor chip measures its own temperature, which gives you a good idea of how warm or cold it is in the room. You can use this to create weather stations!",
    color: "from-red-500 to-pink-600"
  },
  {
    id: "bluetooth",
    icon: <Bluetooth className="h-8 w-8" />,
    title: "Bluetooth & Radio",
    description: "Connect wirelessly to phones, tablets, or other micro:bits. Send messages between devices or control your micro:bit remotely!",
    narrationText: "The micro bit has Bluetooth and radio capabilities. This means you can connect it wirelessly to phones, tablets, or even other micro bits! You can send messages between devices or control your micro bit from your phone.",
    color: "from-blue-600 to-violet-600"
  },
  {
    id: "power",
    icon: <Battery className="h-8 w-8" />,
    title: "Power Options",
    description: "Power it via USB cable connected to a computer, or use 2 AAA batteries for portable projects on the go!",
    narrationText: "You can power the micro bit in two ways. Connect it to a computer using a U S B cable, or use 2 triple A batteries to make it portable. This means you can take your projects anywhere!",
    color: "from-amber-500 to-yellow-600"
  },
  {
    id: "sound",
    icon: <Music className="h-8 w-8" />,
    title: "Sound & Music",
    description: "The newer micro:bit V2 has a built-in speaker and microphone! Play sounds, music, or respond to voice and clapping.",
    narrationText: "The newer micro bit version 2 has a built-in speaker and microphone! You can play sounds and music, or make it respond to your voice, clapping, or other sounds. It's like having a tiny music player!",
    color: "from-pink-500 to-rose-600"
  }
];

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[900px] h-[90vh] p-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-purple-500/30 overflow-hidden">
        <DialogHeader className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-white" />
            <DialogTitle className="text-white font-bold text-xl">
              🔬 Micro:bit Analysis
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
          {microbitSections.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : index < currentSection || narratedSections.has(microbitSections[index].id)
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

        {/* Scrollable content */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-6"
          style={{ maxHeight: 'calc(90vh - 160px)' }}
        >
          {microbitSections.map((section, index) => (
            <div
              key={section.id}
              ref={el => sectionRefs.current[index] = el}
              className={`relative rounded-2xl p-6 transition-all duration-500 transform ${
                index === currentSection
                  ? 'scale-100 opacity-100 ring-2 ring-white/30'
                  : 'scale-95 opacity-70'
              }`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${section.color} opacity-20`} />
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${section.color} text-white shadow-lg`}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      {section.title}
                      {narratedSections.has(section.id) && (
                        <span className="text-green-400 text-sm">✓ Heard</span>
                      )}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
                
                {/* Visual indicator when this section is being narrated */}
                {isNarrating && index === currentSection && (
                  <div className="mt-4 flex items-center gap-2 text-purple-300">
                    <Volume2 className="h-4 w-4 animate-pulse" />
                    <span className="text-sm">Speaking...</span>
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
      </DialogContent>
    </Dialog>
  );
};

export default MicrobitAnalysisNarrator;
