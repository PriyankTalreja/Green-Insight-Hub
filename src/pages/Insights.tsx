import { useRef, useState } from "react";
import { PageHeader, SectionCard } from "@/components/dss/Primitives";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "What's the single biggest risk to our FY30 50 GW ambition?",
  "How should we address the 142-day DSO?",
  "Where are we losing to ReNew and how do we close the gap?",
  "Sequence the next ₹50,000 Cr of capex — what's the right order?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ceo-insights`;

const Insights = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setIsLoading(true);

    let accumulated = "";
    const upsert = (chunk: string) => {
      accumulated += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: accumulated } : m));
        }
        return [...prev, { role: "assistant", content: accumulated }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (resp.status === 429) {
        toast({ title: "Rate limited", description: "Please retry in a moment.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (resp.status === 402) {
        toast({ title: "AI credits exhausted", description: "Top up in workspace settings.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        toast({ title: "Error", description: "AI service unavailable.", variant: "destructive" });
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content;
            if (c) upsert(c);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Stream failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="AI Insights · EY voice"
        title="Interrogate any data point in EY partner voice"
        lead="Streaming AI assistant briefed on Adani Green's strategic, competitive, operational and tactical context. Designed to give the CEO 250-word board-ready answers in headline → data → actions → risk format."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard title="Conversation" subtitle="Streaming responses powered by Lovable AI">
            <div ref={scrollRef} className="space-y-4 max-h-[500px] overflow-y-auto pr-2 mb-4">
              {messages.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm">Ask a question to begin. Try a suggested prompt →</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-sm border ${
                    m.role === "user"
                      ? "bg-muted border-border"
                      : "bg-primary/5 border-l-4 border-l-primary border-primary/20"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-2 text-muted-foreground">
                    {m.role === "user" ? "CEO" : "EY Senior Partner"}
                  </p>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> EY Partner is thinking…
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask the EY partner about strategic, competitive, operational or tactical decisions…"
                className="resize-none min-h-[60px]"
                disabled={isLoading}
              />
              <Button onClick={() => send(input)} disabled={isLoading || !input.trim()} size="lg" className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Suggested prompts" subtitle="Tap to send">
          <div className="space-y-2">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={isLoading}
                className="w-full text-left p-3 border border-border hover:border-primary hover:bg-primary/5 transition-colors rounded-sm text-sm disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-6 p-3 bg-muted rounded-sm text-xs text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Output format</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Headline insight</li>
              <li>Key data points (3 bullets)</li>
              <li>Recommended actions w/ owner &amp; timeline</li>
              <li>Risk / watch-out</li>
            </ol>
          </div>
        </SectionCard>
      </div>
    </>
  );
};

export default Insights;
