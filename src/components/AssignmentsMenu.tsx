import { useCallback, useEffect, useState } from "react";
import { AlertCircle, ArrowRight, PenLine } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export type AssignmentItem = { id: string; title: string; via: string; task: string };

/** Grade R assignment checklist (Conceptual Knowledge Construction). */
export const ASSIGNMENT_CHECKLIST: AssignmentItem[] = [
  { id: "curiosity-discovery", title: "Curiosity & Discovery", via: "Domestic Ecology", task: "Record a short story about one living thing you found at home or in the garden." },
  { id: "cardinality-1-30", title: "Reaching Cardinality 1 – 30", via: "VTS", task: "Count 1 to 30 out loud, then say how many objects are on the card." },
  { id: "road-transport", title: "Road Transport Analysis", via: "VTS", task: "Name each vehicle on the card and say where it travels." },
  { id: "hand-writing-shapes", title: "Hand Writing | Shapes", via: "Google Docs", task: "Draw a circle, square, triangle and rectangle, then name each one." },
  { id: "rainbow-colors", title: "Colors of the Rainbow Analysis", via: "VTS", task: "Say the colors of the rainbow in order and point at each one." },
  { id: "rhythmic-training", title: "Rhythmic Training", via: "Performing Arts", task: "Clap the rhythm of your own name, then sing it back." },
  { id: "coding-alphabets", title: "Coding in Alphabets", via: "Coding", task: "Type the words MOM, DAD and BEE — read the number code out loud (e.g. BEE = 2, 5, 5)." },
  { id: "coding-numbers", title: "Coding in Numbers", via: "Coding", task: "Turn the code 3, 1, 20 back into letters and say the word (CAT)." },
];


const storageKey = (group: string) => `ecdcoding:assignment-alerts:${group}`;

/** Tracks which assignments have been flagged for the learner to attend to. */
export const useAssignmentAlerts = (group: "04-07" | "08-12") => {
  const [flagged, setFlagged] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(group));
      if (raw) setFlagged(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, [group]);

  const toggle = useCallback(
    (id: string) => {
      setFlagged((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        try {
          localStorage.setItem(storageKey(group), JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [group]
  );

  return { flagged, toggle, hasAlerts: flagged.length > 0 };
};

interface AssignmentsSubMenuProps {
  flagged: string[];
  onToggle: (id: string) => void;
  /** Opens the lesson/page linked to a flagged assignment. */
  onOpen?: (id: string) => void;
}

export const AssignmentsSubMenu = ({ flagged, onToggle, onOpen }: AssignmentsSubMenuProps) => {
  const hasAlerts = flagged.length > 0;
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={hasAlerts ? "text-destructive font-semibold" : undefined}>
        {hasAlerts ? (
          <AlertCircle className="mr-2 h-4 w-4 text-destructive animate-pulse" />
        ) : (
          <PenLine className="mr-2 h-4 w-4" />
        )}
        Assignments
        {hasAlerts && (
          <span className="ml-2 rounded-full bg-destructive px-1.5 text-[10px] font-bold leading-4 text-destructive-foreground">
            {flagged.length}
          </span>
        )}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-80 bg-background z-50">
          <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
            Checklist of Assignments
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ASSIGNMENT_CHECKLIST.map((item) => {
            const isFlagged = flagged.includes(item.id);
            return (
              <div key={item.id}>
                <DropdownMenuCheckboxItem
                  checked={isFlagged}
                  onCheckedChange={() => onToggle(item.id)}
                  onSelect={(e) => e.preventDefault()}
                  className={isFlagged ? "text-destructive" : undefined}
                >
                  <span className="flex-1">{item.title}</span>
                  <span className="ml-2 text-[10px] text-muted-foreground">{item.via}</span>
                </DropdownMenuCheckboxItem>
                {isFlagged && (
                  <div className="ml-8 mr-2 mb-1 rounded-md border border-destructive/40 bg-destructive/5 p-2">
                    <p className="text-[11px] leading-snug text-muted-foreground">
                      <span className="font-semibold text-destructive">What to do: </span>
                      {item.task}
                    </p>
                    {onOpen && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpen(item.id);
                        }}
                        className="mt-1.5 inline-flex items-center gap-1 rounded bg-destructive px-2 py-1 text-[11px] font-semibold text-destructive-foreground hover:opacity-90"
                      >
                        Start assignment <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {hasAlerts && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-xs text-destructive">
                Assignment alert — {flagged.length} task{flagged.length > 1 ? "s" : ""} for the student to attend to.
              </div>
            </>
          )}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

