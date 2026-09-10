import { useState } from "react";
import Chatbot from "@/components/Chatbot";
import ExpoCopilot from "@/components/ExpoCopilot";
import { useAutoFlip } from "@/hooks/useAutoFlip";
import { Bot, MessageCircle, X } from "lucide-react";

interface AssistantHubProps {
  /** Context passed to the Ask AI copilot */
  context?: string;
  onVoiceModeChange?: (isActive: boolean) => void;
}

/**
 * A single flipping launcher that lets users choose between
 * "Reception" (the live voice/text agent) and "Ask AI" (the ECD AI copilot).
 */
const AssistantHub = ({ context, onVoiceModeChange }: AssistantHubProps) => {
  const [flipped, setFlipped] = useState(false);
  const [receptionOpen, setReceptionOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  const anyOpen = receptionOpen || copilotOpen;

  const cardRef = useAutoFlip<HTMLDivElement>({
    onFlip: () => setFlipped((f) => !f),
    enabled: !anyOpen,
    intervalMs: 4000,
  });

  const openReception = () => {
    setCopilotOpen(false);
    setReceptionOpen(true);
  };

  const openCopilot = () => {
    setReceptionOpen(false);
    setCopilotOpen(true);
  };

  const closeAll = () => {
    setReceptionOpen(false);
    setCopilotOpen(false);
  };

  return (
    <>
      <Chatbot
        hideLauncher
        open={receptionOpen}
        onOpenChange={setReceptionOpen}
        onVoiceModeChange={onVoiceModeChange}
      />
      <ExpoCopilot
        context={context}
        hideLauncher
        open={copilotOpen}
        onOpenChange={setCopilotOpen}
      />

      {/* Flipping launcher */}
      <div
        ref={cardRef}
        className="fixed bottom-6 left-6 z-50 h-20 w-20"
        style={{ perspective: "800px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front: Reception */}
          <button
            type="button"
            aria-label={anyOpen ? "Close assistant" : "Reception"}
            onClick={anyOpen ? closeAll : openReception}
            className="absolute inset-0 rounded-full bg-lime-500 hover:bg-lime-600 shadow-xl flex flex-col items-center justify-center gap-0.5"
            style={{ backfaceVisibility: "hidden" }}
          >
            {anyOpen ? (
              <X className="h-8 w-8 text-white" />
            ) : (
              <>
                <div className="relative">
                  <MessageCircle className="h-7 w-7 text-white" />
                  <span className="absolute -top-2 -right-3 text-base animate-[wave_1s_ease-in-out_infinite]">
                    👋
                  </span>
                </div>
                <span className="text-[10px] font-bold text-white">Reception</span>
              </>
            )}
          </button>

          {/* Back: Ask AI */}
          <button
            type="button"
            aria-label={anyOpen ? "Close assistant" : "Ask AI"}
            onClick={anyOpen ? closeAll : openCopilot}
            className="absolute inset-0 rounded-full bg-black hover:bg-black/80 shadow-xl flex flex-col items-center justify-center gap-0.5"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {anyOpen ? (
              <X className="h-8 w-8 text-white" />
            ) : (
              <>
                <div className="relative">
                  <Bot className="h-8 w-8 text-white" />
                  <span className="absolute -top-2 -right-4 h-5 w-5 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-[7px] font-bold text-white">ASK</span>
                  </span>
                </div>
                <span className="text-[10px] font-bold text-white">Ask AI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AssistantHub;
