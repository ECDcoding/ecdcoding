import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Music } from "lucide-react";

interface MusicLabWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

const MusicLabWrapper: React.FC<MusicLabWrapperProps> = ({ isOpen, onClose, title, url }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-[90vh] p-0 overflow-hidden" style={{ backgroundColor: "#132a13" }}>
        <div className="flex flex-col h-full">
          {/* ECDcoding branded header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/20" style={{ backgroundColor: "#0a1f0a" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">{title}</h2>
                <p className="text-green-300 text-xs">ECDcoding Music Training</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => window.open(url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Open in New Tab
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Iframe container with ECDcoding styling */}
          <div className="flex-1 relative bg-gradient-to-b from-green-900/20 to-green-900/40">
            <iframe
              src={url}
              className="w-full h-full border-0"
              title={title}
              allow="microphone; camera; autoplay"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
          
          {/* ECDcoding branded footer */}
          <div className="px-4 py-2 border-t border-white/20 flex items-center justify-between" style={{ backgroundColor: "#0a1f0a" }}>
            <span className="text-green-300 text-xs">Powered by Chrome Music Lab • Integrated for ECDcoding</span>
            <Button
              variant="outline"
              size="sm"
              className="border-green-500 text-green-400 hover:bg-green-500/20"
              onClick={onClose}
            >
              Close & Return to Lesson
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MusicLabWrapper;
