import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coins } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";
import { useAuth } from "@/hooks/useAuth";

const creditPackages = [
  { credits: 2000, price: 100.0, label: "2000 Credits - ZAR 100.00" },
  { credits: 4000, price: 200.0, label: "4000 Credits - ZAR 200.00" },
  { credits: 6000, price: 300.0, label: "6000 Credits - ZAR 300.00" },
];

export const BuyCredits = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { purchaseCredits, credits } = useCredits();
  const { user } = useAuth();

  const handlePurchase = async (credits: number, price: number) => {
    setIsProcessing(true);
    await purchaseCredits(credits, price);
    setIsProcessing(false);
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="gap-2 shadow-lg"
            disabled={isProcessing}
          >
            <Coins className="h-5 w-5" />
            Buy Credits
            {credits > 0 && (
              <span className="ml-1 text-xs opacity-80">({credits})</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {creditPackages.map((pkg) => (
            <DropdownMenuItem
              key={pkg.credits}
              onClick={() => handlePurchase(pkg.credits, pkg.price)}
              className="cursor-pointer py-3"
              disabled={isProcessing}
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold">{pkg.credits} Credits</span>
                <span className="text-sm text-muted-foreground">
                  ZAR {pkg.price.toFixed(2)}
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
