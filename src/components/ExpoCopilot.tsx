import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bot, X, Send, Loader2, Minimize2, Maximize2, ThumbsUp, ThumbsDown, Copy, Check, Mic, MicOff, Paperclip } from "lucide-react";
import { toast } from "sonner";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

type Message = { role: "user" | "assistant"; content: string };

interface ExpoCopilotProps {
  /** The currently hovered/active section context, e.g. "Sponsorship", "Speakers" */
  context?: string;
  /** Hide the built-in floating launcher (when an external launcher controls it) */
  hideLauncher?: boolean;
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SUGGESTED_QUESTIONS = [
  "Why does my 4-year-old act out of bounds?",
  "What behaviour should I expect at each age?",
  "What are the sponsorship packages?",
  "How do I register as a delegate?",
];

const ExpoCopilot = ({ context, hideLauncher, open, onOpenChange }: ExpoCopilotProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setIsOpen = (value: boolean) => {
    onOpenChange ? onOpenChange(value) : setInternalOpen(value);
  };
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, "up" | "down">>({});
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [attachment, setAttachment] = useState<{ name: string; text: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Animate in after mount
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const streamChat = useCallback(async (userMessages: Message[], ctx?: string) => {
    const resp = await fetch(`${SUPABASE_URL}/functions/v1/expo-copilot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages, context: ctx }),
    });

    if (!resp.ok || !resp.body) {
      const data = await resp.json().catch(() => ({}));
      if (resp.status === 429) throw new Error("Rate limit exceeded. Please try again shortly.");
      if (resp.status === 402) throw new Error(data.error || "Service unavailable.");
      throw new Error(data.error || "Failed to connect to Copilot.");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantText = "";
    let done = false;

    // Seed assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (!done) {
      const { done: streamDone, value } = await reader.read();
      if (streamDone) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIdx: number;
      while ((newlineIdx = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIdx);
        textBuffer = textBuffer.slice(newlineIdx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { done = true; break; }
        try {
          const parsed = JSON.parse(json);
          const chunk = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (chunk) {
            assistantText += chunk;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: assistantText };
              return updated;
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages, context);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(errMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I encountered an error: ${errMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, context, isLoading, streamChat]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleCopy = async (idx: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1500);
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  };

  const handleFeedback = (idx: number, value: "up" | "down") => {
    setFeedback((prev) => {
      const next = { ...prev };
      if (next[idx] === value) {
        delete next[idx];
        return next;
      }
      next[idx] = value;
      return next;
    });
    if (feedback[idx] !== value) {
      toast.success(value === "up" ? "Thanks for the thumbs up!" : "Thanks — we'll use this to improve.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed ${hideLauncher ? "bottom-28" : "bottom-6"} left-6 z-50 flex flex-col items-start gap-3`}>
      {/* Chat Window */}
      {isOpen && (
        <Card
          className={`w-80 shadow-2xl border border-primary/20 bg-card transition-all duration-300 ${
            isMinimized ? "h-14 overflow-hidden" : "h-[480px]"
          } flex flex-col`}
        >
          {/* Header */}
          <CardHeader className="py-3 px-4 bg-primary text-primary-foreground rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-orange-400 rounded-full border border-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">ECD AI</p>
                  {context && (
                    <p className="text-xs text-primary-foreground/70 mt-0.5">
                      Context: {context}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsMinimized((m) => !m)}
                >
                  {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="space-y-3">
                    <div className="bg-muted rounded-xl p-3 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">👋 Hi! I'm your ECD AI</p>
                      <p>I can answer questions about the ECD Coding & Robotics EXPO 2026 — sponsorship, exhibiting, speakers, or delegate registration.</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-1">Try asking:</p>
                    <div className="space-y-2">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="w-full text-left text-xs bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 text-foreground transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.content || (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Thinking…
                          </span>
                        )}
                      </div>
                      {msg.role === "assistant" && msg.content && (
                        <div className="flex items-center gap-1 mt-1 ml-1">
                          <button
                            aria-label="Helpful"
                            onClick={() => handleFeedback(i, "up")}
                            className={`p-1 rounded-md transition-colors hover:bg-muted ${
                              feedback[i] === "up" ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label="Not helpful"
                            onClick={() => handleFeedback(i, "down")}
                            className={`p-1 rounded-md transition-colors hover:bg-muted ${
                              feedback[i] === "down" ? "text-destructive" : "text-muted-foreground"
                            }`}
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label="Copy response"
                            onClick={() => handleCopy(i, msg.content)}
                            className="p-1 rounded-md text-muted-foreground transition-colors hover:bg-muted"
                          >
                            {copiedIdx === i ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about the Expo…"
                  className="flex-1 text-sm h-9"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  className="h-9 w-9 flex-shrink-0"
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Trigger Button */}
      {!hideLauncher && (
      <Button
        onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
        className="h-20 w-20 rounded-full shadow-xl bg-black hover:bg-black/80 relative"
        size="icon"
      >
        {isOpen ? (
          <X className="h-8 w-8 text-white" />
        ) : (
          <>
            <Bot className="h-14 w-14 text-white" />
            <span className="absolute -top-1 -right-1 h-6 w-6 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">ASK</span>
            </span>
          </>
        )}
      </Button>
      )}
    </div>
  );
};

export default ExpoCopilot;
