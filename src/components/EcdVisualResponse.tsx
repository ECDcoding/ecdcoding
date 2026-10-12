import { MessageResponse } from "@/components/ai-elements/message";

type VisualItem = { shape: string; colour: string; label: string };
const shapes = ["circle", "square", "rectangle", "triangle", "star", "arrow", "plus", "minus", "equals"];
const colours = ["red", "blue", "green", "yellow", "orange", "purple"];

function parseItems(value: string): VisualItem[] | null {
  try {
    const data: unknown = JSON.parse(value);
    if (!Array.isArray(data) || data.length < 1 || data.length > 6) return null;
    const items: VisualItem[] = [];
    for (const item of data) {
      if (!item || typeof item !== "object") return null;
      const { shape, colour, label } = item;
      if (typeof shape !== "string" || !shapes.includes(shape) || typeof colour !== "string" || !colours.includes(colour) || typeof label !== "string" || !label.trim() || label.length > 100) return null;
      items.push({ shape, colour, label });
    }
    return items;
  } catch {
    return null;
  }
}

function Illustration({ shape }: { shape: string }) {
  switch (shape) {
    case "circle": return <circle cx="50" cy="50" r="32" />;
    case "square": return <rect x="18" y="18" width="64" height="64" />;
    case "rectangle": return <rect x="8" y="28" width="84" height="44" />;
    case "triangle": return <polygon points="50,12 88,82 12,82" />;
    case "star": return <polygon points="50,8 62,36 92,39 69,59 76,89 50,73 24,89 31,59 8,39 38,36" />;
    case "arrow": return <path d="M10 40H56V20L90 50 56 80V60H10Z" />;
    case "plus": return <path d="M40 14H60V40H86V60H60V86H40V60H14V40H40Z" />;
    case "minus": return <rect x="14" y="40" width="72" height="20" />;
    default: return <><rect x="14" y="27" width="72" height="16" /><rect x="14" y="57" width="72" height="16" /></>;
  }
}

/** Only the allowlisted diagram format is rendered; model HTML/SVG is never executed. */
export default function EcdVisualResponse({ content, streaming = false }: { content: string; streaming?: boolean }) {
  const parts = content.split(/(```ecd-visual\s*\n[\s\S]*?```)/g);
  return <div className="min-w-0 w-full space-y-3">
    {parts.map((part, index) => {
      if (!part.trim()) return null;
      const match = part.match(/^```ecd-visual\s*\n([\s\S]*?)```$/);
      if (match) {
        const items = parseItems(match[1]);
        if (items) return <div key={index} className="ecd-visual-grid grid grid-cols-2 gap-3" role="group">
          {items.map((item, itemIndex) => <figure key={itemIndex} className={`ecd-visual-item ecd-visual-${item.colour} m-0 min-w-0 rounded-md border border-border bg-muted/30 p-3`}>
            <svg viewBox="0 0 100 100" className="mx-auto h-20 w-full max-w-24 fill-current" role="img" aria-label={item.label}><title>{item.label}</title><Illustration shape={item.shape} /></svg>
            <figcaption className="mt-2 break-words text-center text-sm font-medium text-foreground">{item.label}</figcaption>
          </figure>)}
        </div>;
      }
      // Do not expose an unfinished diagram's JSON during token streaming.
      const visible = streaming ? part.split("```ecd-visual")[0] : part;
      return visible.trim() ? <MessageResponse key={index}>{visible}</MessageResponse> : null;
    })}
  </div>;
}