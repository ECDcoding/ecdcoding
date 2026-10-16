import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AlertCircle, Eye } from "lucide-react";
import { DropdownMenuItem, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type AssignmentItem = {
  id: string;
  title: string;
  via: string;
  category: string;
  task: string;
  destination?: string;
};

/** Current Grade R work plus the numeracy activities supplied by ECDcoding. */
export const ASSIGNMENT_CHECKLIST: AssignmentItem[] = [
  { id: "curiosity-discovery", title: "Curiosity & Discovery", via: "Domestic Ecology", category: "Discovery", task: "Record a short story about one living thing you found at home or in the garden.", destination: "/domestic-ecology?category=kids-conceptual-stories" },
  { id: "cardinality-1-30", title: "Reaching Cardinality 1–30", via: "Verbal Testing Space", category: "Number Concept", task: "Count 1 to 30 out loud, then say how many objects are on the card.", destination: "/verbal-testing-space" },
  { id: "road-transport", title: "Road Transport Analysis", via: "Verbal Testing Space", category: "Analysis", task: "Name each vehicle on the card and say where it travels.", destination: "/verbal-testing-space" },
  { id: "hand-writing-shapes", title: "Hand Writing | Shapes", via: "Learning the Basics", category: "Writing & Shapes", task: "Draw a circle, square, triangle and rectangle, then name each one.", destination: "/lesson-vault-04-06" },
  { id: "rainbow-colors", title: "Colors of the Rainbow Analysis", via: "Verbal Testing Space", category: "Analysis", task: "Say the colors of the rainbow in order and point at each one.", destination: "/verbal-testing-space" },
  { id: "rhythmic-training", title: "Rhythmic Training", via: "Performing Arts", category: "Rhythm", task: "Clap the rhythm of your own name, then sing it back.", destination: "/lesson-vault-04-06" },
  { id: "coding-alphabets", title: "Coding in Alphabets", via: "Coding", category: "Coding", task: "Type the words MOM, DAD and BEE, then read the number code aloud. For example, BEE = 2, 5, 5.", destination: "/lesson-vault-04-06?activity=coding-alphabets" },
  { id: "coding-numbers", title: "Coding in Numbers", via: "Coding", category: "Coding", task: "Turn the code 3, 1, 20 back into letters and say the word CAT.", destination: "/lesson-vault-04-06?activity=coding-numbers" },
  { id: "developing-number-concept", title: "Developing a Number Concept", via: "Numeracy", category: "Number Concept", task: "Practise counting all, verbal counting, object counting, counting forward and backward in the groups 1–10, 10–20 and 20–30.", destination: "/verbal-testing-space" },
  { id: "counting-on", title: "Counting On from a Given Number", via: "Numeracy", category: "Number Concept", task: "Start at 1, 3 or 5 and continue counting until you reach 10.", destination: "/verbal-testing-space" },
  { id: "building-numbers", title: "Breaking Down & Building Up Numbers", via: "Numeracy", category: "Number Operations", task: "Use objects to show that 5 can be broken into 2 + 3 and that 3 + 2 builds 5.", destination: "/lesson-vault-04-06" },
  { id: "conceptual-subtraction", title: "Conceptual Subtraction", via: "Numeracy", category: "Number Operations", task: "Count the objects, take some away, and say how many remain.", destination: "/lesson-vault-04-06" },
  { id: "ordinal-counting", title: "Ordinal Counting", via: "Numeracy", category: "Position", task: "Arrange three objects and identify which is 1st, 2nd and 3rd. Describe position, size, distance and direction.", destination: "/lesson-vault-04-06" },
  { id: "cardinal-numbering", title: "Cardinal Numbering", via: "Numeracy", category: "Number Concept", task: "Count a group of houses, then count their windows and chimneys. Say how many there are altogether.", destination: "/lesson-vault-04-06" },
];

export const useAssignmentAlerts = (ageGroup: "04-07" | "08-12") => {
  const { user } = useAuth();
  const [alertCount, setAlertCount] = useState(0);

  const refresh = useCallback(async () => {
    if (!user) {
      setAlertCount(0);
      return;
    }
    const [{ data: assignments }, { data: responses }] = await Promise.all([
      supabase.from("assignments").select("id").eq("age_group", ageGroup).eq("is_active", true),
      supabase.from("assignment_responses").select("assignment_id,status").eq("user_id", user.id),
    ]);
    const completed = new Set((responses ?? []).filter((item) => item.status === "completed").map((item) => item.assignment_id));
    setAlertCount((assignments ?? []).filter((item) => !completed.has(item.id)).length);
  }, [ageGroup, user]);

  useEffect(() => {
    void refresh();
    const channel = supabase
      .channel(`assignment-alerts-${ageGroup}-${user?.id ?? "guest"}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "assignments" }, refresh)
      .on("postgres_changes", { event: "*", schema: "public", table: "assignment_responses" }, refresh)
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [ageGroup, refresh, user?.id]);

  return { alertCount, hasAlerts: alertCount > 0, refresh };
};

export const AssignmentsNavItem = ({ ageGroup, onOpen }: { ageGroup: "04-07" | "08-12"; onOpen: () => void }) => {
  const { alertCount, hasAlerts } = useAssignmentAlerts(ageGroup);
  return (
    <DropdownMenuItem onClick={onOpen} className={`bg-muted ${hasAlerts ? "font-semibold text-destructive" : ""}`}>
      {hasAlerts ? <AlertCircle className="mr-2 h-4 w-4 animate-pulse" /> : <Eye className="mr-2 h-4 w-4" />}
      <span className="flex-1">Assignments</span>
      {hasAlerts && (
        <span className="ml-2 rounded-full bg-destructive px-1.5 text-[10px] font-bold leading-4 text-destructive-foreground">
          {alertCount}
        </span>
      )}
    </DropdownMenuItem>
  );
};