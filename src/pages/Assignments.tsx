import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, BookOpenCheck, CheckCircle2, ClipboardList, Loader2, Plus, Send } from "lucide-react";
import { ASSIGNMENT_CHECKLIST, type AssignmentItem } from "@/components/AssignmentsMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type PublishedAssignment = {
  id: string;
  template_id: string;
  title: string;
  category: string;
  delivery_method: string;
  instructions: string;
  age_group: string;
  is_active: boolean;
  created_at: string;
};

const Assignments = () => {
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialAge = params.get("age") === "08-12" ? "08-12" : "04-07";
  const [ageGroup, setAgeGroup] = useState<"04-07" | "08-12">(initialAge);
  const [selectedId, setSelectedId] = useState(ASSIGNMENT_CHECKLIST[0].id);
  const [instructions, setInstructions] = useState(ASSIGNMENT_CHECKLIST[0].task);
  const [published, setPublished] = useState<PublishedAssignment[]>([]);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const selected = ASSIGNMENT_CHECKLIST.find((item) => item.id === selectedId) ?? ASSIGNMENT_CHECKLIST[0];
  const categories = useMemo(() => Array.from(new Set(ASSIGNMENT_CHECKLIST.map((item) => item.category))), []);

  const loadAssignments = async () => {
    if (!user) return;
    setLoading(true);
    const [{ data: assignmentRows, error }, { data: responseRows }] = await Promise.all([
      supabase.from("assignments").select("id,template_id,title,category,delivery_method,instructions,age_group,is_active,created_at").eq("age_group", ageGroup).order("created_at", { ascending: false }),
      supabase.from("assignment_responses").select("assignment_id,status").eq("user_id", user.id),
    ]);
    if (error) toast({ title: "Assignments could not load", description: error.message, variant: "destructive" });
    setPublished(assignmentRows ?? []);
    setCompletedIds(new Set((responseRows ?? []).filter((item) => item.status === "completed").map((item) => item.assignment_id)));
    setLoading(false);
  };

  useEffect(() => { void loadAssignments(); }, [ageGroup, user?.id]);

  const chooseTemplate = (item: AssignmentItem) => {
    setSelectedId(item.id);
    setInstructions(item.task);
  };

  const publishAssignment = async () => {
    if (!user || !selected || !instructions.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("assignments").insert({
      template_id: selected.id,
      title: selected.title,
      category: selected.category,
      delivery_method: selected.via,
      instructions: instructions.trim(),
      age_group: ageGroup,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Assignment was not published", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Assignment alert published", description: `${selected.title} is now visible to ${ageGroup} users.` });
    await loadAssignments();
  };

  const markCompleted = async (assignmentId: string) => {
    if (!user) return;
    const { error } = await supabase.from("assignment_responses").upsert(
      { assignment_id: assignmentId, user_id: user.id, status: "completed", responded_at: new Date().toISOString() },
      { onConflict: "assignment_id,user_id" }
    );
    if (error) {
      toast({ title: "Response was not saved", description: error.message, variant: "destructive" });
      return;
    }
    setCompletedIds((current) => new Set(current).add(assignmentId));
    toast({ title: "Assignment completed", description: "Your response has been recorded." });
  };

  const openLesson = (templateId: string) => {
    const template = ASSIGNMENT_CHECKLIST.find((item) => item.id === templateId);
    if (template?.destination) navigate(template.destination);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-5">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            <ClipboardList className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold">Assignments</h1>
          </div>
          <p className="mx-auto max-w-2xl text-muted-foreground">Review ECDcoding activities, open the relevant lesson, and respond when your work is complete.</p>
        </header>

        <div className="mb-7 flex justify-center">
          <div className="inline-flex rounded-md border border-border bg-muted p-1">
            {(["04-07", "08-12"] as const).map((group) => (
              <Button key={group} size="sm" variant={ageGroup === group ? "default" : "ghost"} onClick={() => setAgeGroup(group)}>
                Ages {group}
              </Button>
            ))}
          </div>
        </div>

        {isAdmin && !adminLoading && (
          <section className="mb-8 border-y border-border bg-card py-6">
            <div className="mb-5 flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              <div>
                <h2 className="font-semibold">Propose an assignment</h2>
                <p className="text-sm text-muted-foreground">Publishing creates a red alert for signed-in users in the selected age group.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] md:items-end">
              <div className="space-y-2">
                <Label htmlFor="assignment-template">Assignment</Label>
                <Select value={selectedId} onValueChange={(id) => { const item = ASSIGNMENT_CHECKLIST.find((entry) => entry.id === id); if (item) chooseTemplate(item); }}>
                  <SelectTrigger id="assignment-template"><SelectValue /></SelectTrigger>
                  <SelectContent>{ASSIGNMENT_CHECKLIST.map((item) => <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignment-instructions">What the learner must do</Label>
                <Textarea id="assignment-instructions" value={instructions} onChange={(event) => setInstructions(event.target.value)} className="min-h-24 bg-muted" />
              </div>
              <Button onClick={publishAssignment} disabled={saving || !instructions.trim()}>
                {saving ? <Loader2 className="animate-spin" /> : <Send />} Publish alert
              </Button>
            </div>
          </section>
        )}

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : published.length > 0 ? (
          <section aria-label="Active assignments" className="mb-10">
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <h2 className="text-xl font-semibold">Assignment alerts</h2>
              <Badge variant="destructive">{published.filter((item) => !completedIds.has(item.id)).length} to respond</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {published.map((item) => {
                const completed = completedIds.has(item.id);
                return (
                  <article key={item.id} className={`rounded-md border p-4 ${completed ? "border-border bg-muted/40" : "border-destructive/60 bg-destructive/5"}`}>
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div><Badge variant="outline">{item.category}</Badge><h3 className="mt-2 font-semibold">{item.title}</h3></div>
                      {completed ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <AlertCircle className="h-5 w-5 animate-pulse text-destructive" />}
                    </div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Via {item.delivery_method}</p>
                    <p className="min-h-16 text-sm leading-relaxed">{item.instructions}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => openLesson(item.template_id)}><BookOpenCheck /> Start assignment</Button>
                      <Button size="sm" variant={completed ? "secondary" : "default"} disabled={completed} onClick={() => markCompleted(item.id)}>
                        <CheckCircle2 /> {completed ? "Completed" : "Mark complete"}
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="mb-10 border-y border-border py-10 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h2 className="font-semibold">No active assignment alerts</h2>
            <p className="text-sm text-muted-foreground">New work proposed by ECDcoding will appear here.</p>
          </section>
        )}

        <section aria-label="Assignment library">
          <h2 className="mb-4 text-xl font-semibold">Checklist of Assignments</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category} className="rounded-md border border-border bg-card p-4">
                <h3 className="mb-3 font-semibold text-primary">{category}</h3>
                <div className="space-y-3">
                  {ASSIGNMENT_CHECKLIST.filter((item) => item.category === category).map((item) => (
                    <div key={item.id} className="border-t border-border pt-3 first:border-0 first:pt-0">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.task}</p>
                      <Button variant="link" size="sm" className="mt-1 h-auto px-0" onClick={() => openLesson(item.id)}>Open lesson</Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Assignments;