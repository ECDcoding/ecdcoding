import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react";

interface ImageCropDialogProps {
  open: boolean;
  file: File | null;
  onCancel: () => void;
  onCropped: (blob: Blob) => void;
  outputSize?: number; // square output size in px
}

/**
 * Square profile-picture cropper. Canvas-based, no extra deps.
 * User pans by dragging, zooms via slider/wheel, optional rotate.
 */
export const ImageCropDialog = ({
  open,
  file,
  onCancel,
  onCropped,
  outputSize = 512,
}: ImageCropDialogProps) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const VIEW = 320; // square preview viewport (px)

  useEffect(() => {
    if (!file) { setImgUrl(null); setImg(null); return; }
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    const i = new Image();
    i.onload = () => {
      setImg(i);
      // initial zoom: cover the viewport
      const baseScale = Math.max(VIEW / i.width, VIEW / i.height);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setRotation(0);
      // store baseScale via dataset trick on image
      (i as any)._baseScale = baseScale;
    };
    i.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const baseScale = img ? (img as any)._baseScale ?? 1 : 1;
  const scale = baseScale * zoom;

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  };
  const onPointerUp = () => setDragging(false);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    setZoom((z) => Math.min(4, Math.max(1, z + delta)));
  };

  const handleSave = async () => {
    if (!img) return;
    setSaving(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = outputSize;
      canvas.height = outputSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Map preview viewport -> output canvas
      const ratio = outputSize / VIEW;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, outputSize, outputSize);
      ctx.translate(outputSize / 2, outputSize / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(offset.x * ratio, offset.y * ratio);
      const dw = img.width * scale * ratio;
      const dh = img.height * scale * ratio;
      ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
      const blob: Blob | null = await new Promise((res) =>
        canvas.toBlob((b) => res(b), "image/jpeg", 0.92)
      );
      if (blob) onCropped(blob);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crop your profile picture</DialogTitle>
          <DialogDescription>
            Drag to reposition, zoom and rotate to get the perfect look.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
            className="relative overflow-hidden rounded-full border-2 border-primary bg-muted touch-none cursor-grab active:cursor-grabbing"
            style={{ width: VIEW, height: VIEW }}
          >
            {imgUrl && img && (
              <img
                src={imgUrl}
                alt="To crop"
                draggable={false}
                className="absolute select-none pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  width: img.width,
                  height: img.height,
                  transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${scale})`,
                  transformOrigin: "center center",
                }}
              />
            )}
          </div>

          <div className="w-full flex items-center gap-3">
            <ZoomOut className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[zoom]}
              min={1}
              max={4}
              step={0.01}
              onValueChange={(v) => setZoom(v[0])}
              className="flex-1"
            />
            <ZoomIn className="h-4 w-4 text-muted-foreground" />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              title="Rotate 90°"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!img || saving}>
              {saving ? "Saving..." : "Apply & Upload"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;