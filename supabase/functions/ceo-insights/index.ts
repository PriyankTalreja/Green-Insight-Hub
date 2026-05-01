import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an EY senior partner advising the CEO of Adani Green Energy Ltd.
You write in EY's "Building a better working world" tone: precise, board-ready, structured, action-oriented.

Context: Adani Green has 14.2 GW operational, 7.4 GW under construction, target 50 GW by FY30.
CUF 24.8%, availability 99.6%, EBITDA margin ~92%, net debt/EBITDA 5.8x, DSO 142 days, market share 17.4%.
Peers: ReNew, Tata Power Renewables, Greenko, JSW Energy Renewables.
Strategic pillars: Scale, Cost leadership, Balance sheet, Diversification (BESS/Hybrid/H2), ESG.

Always answer with:
1) Headline insight (one sentence)
2) Key data points (3 bullets)
3) Recommended actions (numbered, with owner and timeline)
4) Risk / watch-out (one line)

Keep it under 250 words. Use INR, GW, bps where appropriate.`;

const ALLOWED_LENSES = new Set(["strategic", "competitive", "operational", "tactical"]);
const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 4000;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // --- Auth check ---
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const rawMessages = body?.messages;
    const rawLens = body?.lens;

    // --- Input validation ---
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return new Response(JSON.stringify({ error: "messages must be a non-empty array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (rawMessages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: `Too many messages (max ${MAX_MESSAGES})` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages: Array<{ role: string; content: string }> = [];
    for (const m of rawMessages) {
      if (!m || typeof m.role !== "string" || typeof m.content !== "string") {
        return new Response(JSON.stringify({ error: "Invalid message shape" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Strip any client-supplied system messages to prevent prompt override
      if (m.role !== "user" && m.role !== "assistant") continue;
      if (m.content.length > MAX_CONTENT_LENGTH) {
        return new Response(
          JSON.stringify({ error: `Message exceeds ${MAX_CONTENT_LENGTH} chars` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      messages.push({ role: m.role, content: m.content });
    }

    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "No valid user/assistant messages" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate lens against allowlist
    let lens: string | null = null;
    if (rawLens != null) {
      if (typeof rawLens !== "string" || !ALLOWED_LENSES.has(rawLens.toLowerCase())) {
        return new Response(JSON.stringify({ error: "Invalid lens" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      lens = rawLens.toLowerCase();
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const sys = lens
      ? `${SYSTEM_PROMPT}\n\nThe CEO is currently reviewing the ${lens} lens. Tailor your answer to that lens.`
      : SYSTEM_PROMPT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: sys }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please retry shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add funds in Lovable workspace settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ceo-insights error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
