import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, Repeat, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface Props {
  src: string;
  title?: string;
}

/**
 * Video player with explicit Play/Pause, Replay and Repeat (loop) controls.
 * Also recovers automatically when the stream stalls mid-playback.
 */
export const ResearchVideoPlayer = ({ src, title }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [muted, setMuted] = useState(false);
  const [stalled, setStalled] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) {
      v.play().catch(() => setStalled(true));
    } else {
      v.pause();
    }
  }, []);

  const replay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => setStalled(true));
  }, []);

  // Recover from stalls: nudge the stream so playback continues instead of
  // stopping in the middle of the clip.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let recovering = false;
    const recover = () => {
      if (recovering || v.paused || v.ended) return;
      recovering = true;
      const t = v.currentTime;
      window.setTimeout(() => {
        if (v.readyState < 3 && !v.paused) {
          try {
            v.currentTime = Math.max(0, t - 0.05);
          } catch {
            /* ignore */
          }
          v.play().catch(() => setStalled(true));
        }
        recovering = false;
      }, 900);
    };

    const onPlay = () => {
      setPlaying(true);
      setStalled(false);
    };
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onWaiting = () => {
      setStalled(true);
      recover();
    };
    const onPlaying = () => setStalled(false);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("stalled", onWaiting);
    v.addEventListener("suspend", recover);
    v.addEventListener("playing", onPlaying);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("stalled", onWaiting);
      v.removeEventListener("suspend", recover);
      v.removeEventListener("playing", onPlaying);
    };
  }, [src]);

  return (
    <div className="space-y-3">
      <video
        ref={videoRef}
        src={src}
        title={title}
        controls
        playsInline
        preload="auto"
        loop={loop}
        muted={muted}
        className="w-full rounded-lg bg-black"
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>
          {playing ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {playing ? "Pause" : "Play"}
        </Button>
        <Button size="sm" variant="outline" onClick={replay} aria-label="Replay from start">
          <RotateCcw className="mr-2 h-4 w-4" /> Replay
        </Button>
        <Button
          size="sm"
          variant={loop ? "default" : "outline"}
          onClick={() => setLoop((l) => !l)}
          aria-label="Repeat video"
          aria-pressed={loop}
        >
          <Repeat className="mr-2 h-4 w-4" /> {loop ? "Repeat on" : "Repeat"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        {stalled && <span className="text-xs text-muted-foreground">Buffering…</span>}
      </div>
    </div>
  );
};

export default ResearchVideoPlayer;
