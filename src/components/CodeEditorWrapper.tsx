import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";

interface CodeEditorWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
}

const CodeEditorWrapper = ({ isOpen, onClose, title, url, description }: CodeEditorWrapperProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh] p-0 bg-[#1e1e3f] border-none overflow-hidden">
        <DialogHeader className="px-4 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <DialogTitle className="text-white font-bold text-lg flex items-center gap-2">
              💻 {title}
            </DialogTitle>
            {description && (
              <p className="text-white/80 text-sm mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => window.open(url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Open in New Tab
            </Button>
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
        <div className="w-full h-[calc(95vh-60px)] bg-white">
          <iframe
            src={url}
            className="w-full h-full border-0"
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeEditorWrapper;
