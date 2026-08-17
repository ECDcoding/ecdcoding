import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Film, Loader2, Trash2, Upload, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { ResearchVideoPlayer } from "@/components/ResearchVideoPlayer";
import busyBeeImage from "@/assets/busy-bee.jpg";

/** Sample clip that shows parents and kids what a good research video looks like. */
const SAMPLE_VIDEO_URL =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

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
  image_path: string | null;
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
  const imageRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<string>(initialCategory ?? "garden-species");
  const [libraryCategory, setLibraryCategory] = useState<string>(initialCategory ?? "garden-species");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState<ResearchVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<{ title: string; url: string; isImage: boolean } | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
      setLibraryCategory(initialCategory);
    }
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
      const rows = (data ?? []) as ResearchVideo[];
      setVideos(rows);
      const withImages = rows.filter((r) => r.image_path);
      if (withImages.length) {
        const { data: signed } = await supabase.storage
          .from("research-videos")
          .createSignedUrls(withImages.map((r) => r.image_path as string), 60 * 60 * 8);
        const map: Record<string, string> = {};
        withImages.forEach((r, i) => {
          const url = signed?.[i]?.signedUrl;
          if (url) map[r.id] = url;
        });
        setImageUrls(map);
      } else {
        setImageUrls({});
      }
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
    if (!title.trim()) {
      toast({ title: "Missing details", description: "Add a title for your post.", variant: "destructive" });
      return;
    }
    if (!file && !image) {
      toast({ title: "Missing details", description: "Pick a video clip or a picture to post.", variant: "destructive" });
      return;
    }
    if (file && file.size > MAX_BYTES) {
      toast({ title: "Video too large", description: "Please keep clips under 100MB.", variant: "destructive" });
      return;
    }
    if (image && image.size > 10 * 1024 * 1024) {
      toast({ title: "Picture too large", description: "Please keep pictures under 10MB.", variant: "destructive" });
      return;
    }

    setUploading(true);

    let path: string | null = null;
    if (file) {
      const ext = file.name.split(".").pop() || "mp4";
      path = `${user.id}/${category}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("research-videos")
        .upload(path, file, { contentType: file.type || "video/mp4" });
      if (uploadError) {
        setUploading(false);
        toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
        return;
      }
    }

    let imagePath: string | null = null;
    if (image) {
      const imgExt = image.name.split(".").pop() || "jpg";
      imagePath = `${user.id}/${category}/${Date.now()}-picture.${imgExt}`;
      const { error: imgError } = await supabase.storage
        .from("research-videos")
        .upload(imagePath, image, { contentType: image.type || "image/jpeg" });
      if (imgError) {
        imagePath = null;
        toast({ title: "Picture not uploaded", description: imgError.message, variant: "destructive" });
      }
    }

    const { error: insertError } = await supabase.from("research_videos").insert({
      user_id: user.id,
      category,
      title: title.trim(),
      description: description.trim() || null,
      video_path: path,
      image_path: imagePath,
    });

    setUploading(false);

    if (insertError) {
      toast({ title: "Could not save clip", description: insertError.message, variant: "destructive" });
      return;
    }

    toast({
      title: file ? "Research clip posted" : "Picture posted",
      description: file
        ? "Your video is now in the Video Analysis library."
        : "Your picture is now in the Video Analysis library.",
    });
    setTitle("");
    setDescription("");
    setFile(null);
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
    if (imageRef.current) imageRef.current.value = "";
    loadVideos();
  };

  const play = async (video: ResearchVideo) => {
    if (video.video_path) {
      const { data, error } = await supabase.storage
        .from("research-videos")
        .createSignedUrl(video.video_path, 60 * 60 * 8);
      if (error || !data?.signedUrl) {
        toast({ title: "Could not open video", description: error?.message ?? "Unknown error", variant: "destructive" });
        return;
      }
      setPlaying({ title: video.title, url: data.signedUrl });
    } else if (video.image_path) {
      // Picture-only post: open the picture in the dialog
      const { data, error } = await supabase.storage
        .from("research-videos")
        .createSignedUrl(video.image_path, 60 * 60 * 8);
      if (error || !data?.signedUrl) {
        toast({ title: "Could not open picture", description: error?.message ?? "Unknown error", variant: "destructive" });
        return;
      }
      setPlaying({ title: video.title, url: data.signedUrl });
    } else {
      toast({ title: "Nothing to play", description: "This post has no video or picture.", variant: "destructive" });
    }
  };

  const remove = async (video: ResearchVideo) => {
    const { error } = await supabase.from("research_videos").delete().eq("id", video.id);
    if (error) {
      toast({ title: "Could not delete", description: error.message, variant: "destructive" });
      return;
    }
    if (video.video_path) {
      await supabase.storage.from("research-videos").remove([video.video_path]);
    }
    if (video.image_path) {
      await supabase.storage.from("research-videos").remove([video.image_path]);
    }
    toast({ title: "Post removed" });
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
        {/* Sample expectation clip */}
        <div className="space-y-3 rounded-lg border border-border p-4">
          <h3 className="font-semibold">Sample: what we expect from your clip</h3>
          <p className="text-sm text-muted-foreground">
            Watch this short example before recording on your own device. Use the Play, Replay and
            Repeat buttons as many times as you need.
          </p>
          <ResearchVideoPlayer src={SAMPLE_VIDEO_URL} title="Sample research clip" />
          <p className="text-sm font-medium text-zinc-100">Post a video related picture here.</p>
          <div className="space-y-2">
            <p className="text-sm font-medium">Related picture example: Busy Bee</p>
            <img
              src={busyBeeImage}
              alt="Busy bee collecting pollen on a lavender flower"
              loading="lazy"
              width={1024}
              height={640}
              className="w-full max-w-md rounded-lg border border-border"
            />
            <p className="text-sm text-muted-foreground">
              Post a still picture like this together with your clip so the species is easy to identify.
            </p>
          </div>
        </div>

        {/* Upload form */}
        <div className="space-y-4 rounded-lg border border-border p-4">
          <h3 className="font-semibold">Post a research video clip or picture</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Species category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2 bg-zinc-800/70 border-zinc-600 text-zinc-100">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 z-50 border-zinc-600">
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
                className="mt-2 bg-zinc-800/70 border-zinc-600 text-zinc-100 placeholder:text-zinc-400"
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
              className="mt-2 bg-zinc-800/70 border-zinc-600 text-zinc-100 placeholder:text-zinc-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short research note for this clip"
            />
          </div>
          <div>
            <Label htmlFor="ecology-video">Video clip (optional, max 100MB)</Label>
            <Input
              id="ecology-video"
              ref={fileRef}
              type="file"
              accept="video/*"
              className="mt-2 cursor-pointer bg-zinc-800/70 border-zinc-600 text-zinc-100 file:text-zinc-100"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div>
            <Label htmlFor="ecology-picture">Picture (optional, max 10MB) — post a picture on its own or with a clip</Label>
            <Input
              id="ecology-picture"
              ref={imageRef}
              type="file"
              accept="image/*"
              className="mt-2 cursor-pointer bg-zinc-800/70 border-zinc-600 text-zinc-100 file:text-zinc-100"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
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
          <div className="space-y-4">
            <div className="flex flex-col gap-2 rounded-lg bg-zinc-800/70 border border-zinc-600 p-3 sm:flex-row sm:items-center">
              <Label className="whitespace-nowrap">Filter by species category</Label>
              <Select value={libraryCategory} onValueChange={setLibraryCategory}>
                <SelectTrigger className="w-full sm:max-w-xs bg-zinc-800/70 border-zinc-600 text-zinc-100">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 z-50 border-zinc-600">
                  {ECOLOGY_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label} ({grouped[c.value]?.length ?? 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(grouped[libraryCategory]?.length ?? 0) === 0 ? (
              <p className="py-2 text-sm text-muted-foreground">No research clips posted yet.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grouped[libraryCategory].map((v) => (
                  <Card key={v.id} className="overflow-hidden">
                    <button
                      type="button"
                      onClick={() => play(v)}
                      className="relative flex h-32 w-full items-center justify-center overflow-hidden bg-zinc-800 transition-colors hover:bg-zinc-700"
                      aria-label={`Play ${v.title}`}
                    >
                      {imageUrls[v.id] ? (
                        <img
                          src={imageUrls[v.id]}
                          alt={`Picture for ${v.title}`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Film className="h-10 w-10 text-muted-foreground" />
                      )}
                    </button>
                    <CardContent className="space-y-2 p-4">
                      <p className="font-semibold">{v.title}</p>
                      {v.description && (
                        <p className="line-clamp-2 text-sm text-muted-foreground">{v.description}</p>
                      )}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-zinc-800/70 border-zinc-600 text-zinc-100 hover:bg-zinc-700 hover:text-zinc-50" onClick={() => play(v)}>
                          {v.video_path ? "Watch" : "View"}
                        </Button>
                        {user?.id === v.user_id && (
                          <Button size="sm" variant="destructive" onClick={() => remove(v)} aria-label="Delete post">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>

      <Dialog open={!!playing} onOpenChange={(open) => !open && setPlaying(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{playing?.title}</DialogTitle>
          </DialogHeader>
          {playing && <ResearchVideoPlayer src={playing.url} title={playing.title} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EcologyVideoAnalysis;
