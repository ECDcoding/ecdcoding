import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, X, Rocket, Gamepad2, Code, Sparkles } from "lucide-react";
import { useEffect } from "react";

interface CodeEditorWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
}

const CodeEditorWrapper = ({ isOpen, onClose, title, url, description }: CodeEditorWrapperProps) => {
  // Auto-open in new tab when dialog opens (for platforms that block iframe embedding)
  useEffect(() => {
    if (isOpen) {
      // Small delay to show the launch screen first
      const timer = setTimeout(() => {
        window.open(url, '_blank');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, url]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 bg-gradient-to-br from-[#1e1e3f] via-[#252045] to-[#1a1a2e] border border-cyan-400/30 overflow-hidden">
        <DialogHeader className="px-6 py-4 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <DialogTitle className="text-white font-bold text-xl flex items-center gap-2">
                <Rocket className="h-5 w-5 animate-pulse" />
                {title}
              </DialogTitle>
              <DialogDescription className="text-white/80 text-sm mt-1">
                {description || "Launch your coding adventure!"}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          {/* Launch Animation */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <div className="absolute inset-0 animate-ping bg-cyan-400/20 rounded-full" />
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-6 rounded-full">
                <Gamepad2 className="h-12 w-12 text-white animate-bounce" />
              </div>
            </div>
            <p className="mt-6 text-cyan-300 font-medium text-lg animate-pulse">
              🚀 Launching {title}...
            </p>
            <p className="mt-2 text-white/60 text-sm text-center max-w-xs">
              A new tab will open automatically. If it doesn't, click the button below.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
              <Code className="h-6 w-6 text-cyan-400 mx-auto mb-1" />
              <span className="text-white/70 text-xs">Block Coding</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
              <Gamepad2 className="h-6 w-6 text-purple-400 mx-auto mb-1" />
              <span className="text-white/70 text-xs">Create Games</span>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
              <Sparkles className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <span className="text-white/70 text-xs">Have Fun!</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3"
              onClick={() => window.open(url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open {title} Now
            </Button>
            <Button
              variant="outline"
              className="w-full border-white/20 text-white/70 hover:bg-white/10"
              onClick={onClose}
            >
              Return to Lessons
            </Button>
          </div>

          {/* Note */}
          <p className="text-white/40 text-xs text-center">
            💡 Tip: {title} opens in a new tab for the best coding experience. No sign-in required to start!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeEditorWrapper;
