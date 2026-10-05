import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Wrench } from "lucide-react";

interface AiCreditsPaywallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AiCreditsPaywallDialog = ({ open, onOpenChange }: AiCreditsPaywallDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            You've used today's free question
          </DialogTitle>
          <DialogDescription>
            Visitors get 1 free ECD AI question each day. Registered users are not limited.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-md border border-border bg-muted/50 p-4 text-sm space-y-2">
          <p className="flex items-center gap-2 font-medium">
            <Wrench className="h-4 w-4 text-primary shrink-0" />
            Payments temporarily unavailable
          </p>
          <p className="text-muted-foreground">
            We are fixing a payment issue, so credit top-ups cannot be purchased right now. Once
            payments are working again, you will be able to add credits to engage ECD AI without
            limits. Until then, please enjoy your 1 free question per day — or sign in for
            unlimited access.
          </p>
        </div>

        <Button className="w-full" onClick={() => onOpenChange(false)}>
          Got it
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AiCreditsPaywallDialog;
