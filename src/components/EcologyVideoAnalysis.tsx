import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Film, Loader2, Trash2, Upload, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const ECOLOGY_CATEGORIES = [
  { value: "garden-species", label: "Garden Species" },
  { value: "grass-species", label: "Grass Species" },
  { value: "water-pond-species", label: "Water Pond Species" },
  { value: "other", label: "Other" },
] as const;

interface ResearchVideo {
  id: string;
  user_id: string;
  category: string;
  title: string;
  description: string | null;
  video_path: string;
  created_at: string;
}

const MAX_BYTES = 100 * 1024 * 1024; // 100MB

interface Props {
  initialCategory?: string;
}

export const EcologyVideoAnalysis = ({ initialCategory }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<string>(initialCategory ?? "garden-species");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState<ResearchVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  const loadVideos = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("research_videos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Could not load videos", description: error.message, variant: "destructive" });
    } else {
      setVideos((data ?? []) as ResearchVideo[]);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  const grouped = useMemo(() => {
    const map: Record<string, ResearchVideo[]> = {};
    ECOLOGY_CATEGORIES.forEach((c) => (map[c.value] = []));
    videos.forEach((v) => {
      if (!map[v.category]) map[v.category] = [];
      map[v.category].push(v);
    });
    return map;
  }, [videos]);

  const handleUpload = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to post a research clip.", variant: "destructive" });
      return;
    }
    if (!file || !title.trim()) {
      toast({ title: "Missing details", description: "Add a title and pick a video clip.", variant: "destructive" });
      return;
    }
    if (file.size > MAX_BYTES) {
      toast({ title: "Video too large", description: "Please keep clips under 100MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop() || "mp4";
    const path = `${user.id}/${category}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("research-videos")
      .upload(path, file, { contentType: file.type || "video/mp4" });

    if (uploadError) {
      setUploading(false);
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      return;
    }

    const { error: insertError } = await supabase.from("research_videos").insert({
      user_id: user.id,
      category,
      title: title.trim(),
      description: description.trim() || null,
      video_path: path,
    });

    setUploading(false);

    if (insertError) {
      toast({ title: "Could not save clip", description: insertError.message, variant: "destructive" });
      return;
    }

    toast({ title: "Research clip posted", description: "Your video is now in the Video Analysis library." });
    setTitle("");
    setDescription("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
    loadVideos();
  };

  const play = async (video: ResearchVideo) => {
    const { data, error } = await supabase.storage
      .from("research-videos")
      .createSignedUrl(video.video_path, 3600);
    if (error || !data?.signedUrl) {
      toast({ title: "Could not open video", description: error?.message ?? "Unknown error", variant: "destructive" });
      return;
    }
    setPlaying({ title: video.title, url: data.signedUrl });
  };

  const remove = async (video: ResearchVideo) => {
    const { error } = await supabase.from("research_videos").delete().eq("id", video.id);
    if (error) {
      toast({ title: "Could not delete", description: error.message, variant: "destructive" });
      return;
    }
    await supabase.storage.from("research-videos").remove([video.video_path]);
    toast({ title: "Clip removed" });
    loadVideos();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Video className="h-6 w-6" /> Video Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Upload form */}
        <div className="space-y-4 rounded-lg border border-border p-4">
          <h3 className="font-semibold">Post a research video clip</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Species category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {ECOLOGY_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ecology-title">Title</Label>
              <Input
                id="ecology-title"
                className="mt-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bees on the lavender bush"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="ecology-desc">What is observed? (optional)</Label>
            <Textarea
              id="ecology-desc"
              className="mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short research note for this clip"
            />
          </div>
          <div>
            <Label htmlFor="ecology-video">Video clip (max 100MB)</Label>
            <Input
              id="ecology-video"
              ref={fileRef}
              type="file"
              accept="video/*"
              className="mt-2 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <Button onClick={handleUpload} disabled={uploading} className="w-full md:w-auto">
            {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            {uploading ? "Uploading..." : "Post research clip"}
          </Button>
        </div>

        {/* Library */}
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading clips...
          </div>
        ) : (
          <Accordion type="single" collapsible defaultValue={category} className="w-full">
            {ECOLOGY_CATEGORIES.map((c) => (
              <AccordionItem key={c.value} value={c.value}>
                <AccordionTrigger>
                  {c.label} <span className="ml-2 text-sm text-muted-foreground">({grouped[c.value]?.length ?? 0})</span>
                </AccordionTrigger>
                <AccordionContent>
                  {(grouped[c.value]?.length ?? 0) === 0 ? (
                    <p className="py-2 text-sm text-muted-foreground">No research clips posted yet.</p>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {grouped[c.value].map((v) => (
                        <Card key={v.id} className="overflow-hidden">
                          <button
                            type="button"
                            onClick={() => play(v)}
                            className="flex h-32 w-full items-center justify-center bg-muted transition-colors hover:bg-muted/70"
                            aria-label={`Play ${v.title}`}
                          >
                            <Film className="h-10 w-10 text-muted-foreground" />
                          </button>
                          <CardContent className="space-y-2 p-4">
                            <p className="font-semibold">{v.title}</p>
                            {v.description && (
                              <p className="line-clamp-2 text-sm text-muted-foreground">{v.description}</p>
                            )}
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1" onClick={() => play(v)}>
                                Watch
                              </Button>
                              {user?.id === v.user_id && (
                                <Button size="sm" variant="destructive" onClick={() => remove(v)} aria-label="Delete clip">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>

      <Dialog open={!!playing} onOpenChange={(open) => !open && setPlaying(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{playing?.title}</DialogTitle>
          </DialogHeader>
          {playing && <video src={playing.url} controls autoPlay className="w-full rounded-lg" />}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EcologyVideoAnalysis;
