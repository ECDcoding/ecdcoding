import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BusinessProposalDialog = ({ open, onOpenChange }: Props) => {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    supabase.functions
      .invoke("business-proposal")
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else if (data?.html) setHtml(data.html);
        else setError("No content");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Block copy / right-click / keyboard copy while dialog is open
  useEffect(() => {
    if (!open) return;
    const blockCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      e.clipboardData?.setData("text/plain", "");
    };
    const blockCtx = (e: MouseEvent) => e.preventDefault();
    const blockKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["c", "x", "a", "s", "p", "u"].includes(k)) {
        e.preventDefault();
      }
      if (k === "printscreen") e.preventDefault();
    };
    document.addEventListener("copy", blockCopy);
    document.addEventListener("cut", blockCopy);
    document.addEventListener("contextmenu", blockCtx);
    document.addEventListener("keydown", blockKey);
    return () => {
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("cut", blockCopy);
      document.removeEventListener("contextmenu", blockCtx);
      document.removeEventListener("keydown", blockKey);
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl max-h-[92vh] overflow-hidden bg-[#1a1c21] text-white border-white/10 p-4"
        onContextMenu={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Business Proposal — ECD Coding & Robotics Expo</DialogTitle>
        </DialogHeader>
        <div
          className="relative overflow-y-auto max-h-[78vh] rounded-md bg-[#2a2d34] select-none py-6 px-2 sm:px-6"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            WebkitTouchCallout: "none",
          } as React.CSSProperties}
          onDragStart={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        >
          {/* Transparent overlay to deter selection/screenshot tools */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 20px, rgba(255,255,255,0) 20px 40px)",
            }}
          />
          {loading && (
            <div className="flex items-center justify-center py-12 text-gray-300">
              <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading proposal…
            </div>
          )}
          {error && <div className="text-red-400 py-4">Failed to load: {error}</div>}
          {!loading && !error && (
            <div className="flex justify-center">
              <article
                className="business-proposal-page"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          )}
          <p className="mt-6 text-xs text-gray-400 italic text-center">
            This document is under construction and protected — copying, downloading and printing are disabled.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessProposalDialog;