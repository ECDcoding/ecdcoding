import { useCallback, useEffect, useState } from "react";
import { AlertCircle, PenLine } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export type AssignmentItem = { id: string; title: string; via: string };

/** Grade R assignment checklist (Conceptual Knowledge Construction). */
export const ASSIGNMENT_CHECKLIST: AssignmentItem[] = [
  { id: "curiosity-discovery", title: "Curiosity & Discovery", via: "Domestic Ecology" },
  { id: "cardinality-1-30", title: "Reaching Cardinality 1 – 30", via: "VTS" },
  { id: "road-transport", title: "Road Transport Analysis", via: "VTS" },
  { id: "hand-writing-shapes", title: "Hand Writing | Shapes", via: "Google Docs" },
  { id: "rainbow-colors", title: "Colors of the Rainbow Analysis", via: "VTS" },
  { id: "rhythmic-training", title: "Rhythmic Training", via: "Performing Arts" },
  { id: "coding-alphabets", title: "Coding in Alphabets", via: "Coding" },
  { id: "coding-numbers", title: "Coding in Numbers", via: "Coding" },
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
}

export const AssignmentsSubMenu = ({ flagged, onToggle }: AssignmentsSubMenuProps) => {
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
        <DropdownMenuSubContent className="w-72 bg-background z-50">
          <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
            Checklist of Assignments
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ASSIGNMENT_CHECKLIST.map((item) => {
            const isFlagged = flagged.includes(item.id);
            return (
              <DropdownMenuCheckboxItem
                key={item.id}
                checked={isFlagged}
                onCheckedChange={() => onToggle(item.id)}
                onSelect={(e) => e.preventDefault()}
                className={isFlagged ? "text-destructive" : undefined}
              >
                <span className="flex-1">{item.title}</span>
                <span className="ml-2 text-[10px] text-muted-foreground">{item.via}</span>
              </DropdownMenuCheckboxItem>
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
