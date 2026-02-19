import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const EXPO_SYSTEM_PROMPT = `You are the ECD Expo 2026 Copilot — a friendly, knowledgeable assistant for the ECD Coding & Robotics EXPO 2026 event.

Event Details:
- Name: ECD Coding & Robotics EXPO 2026
- Theme: Empowering Tech Savvy Kids for the Future World of Work
- Dates: 09–11 June 2026
- Venue: Nasrec, Soweto, South Africa

Sponsorship Packages:
- Platinum Sponsor: R5,000,000 — Main stage branding, 10 VIP passes, Exhibition booth, Keynote slot, All marketing materials
- Gold Sponsor: R3,000,000 — Stage branding, 6 VIP passes, Exhibition booth, Panel participation, Digital marketing
- Silver Sponsor: R1,500,000 — Logo placement, 4 passes, Small booth, Networking access, Social media mentions
- Bronze Sponsor: R750,000 — Logo on materials, 2 passes, Networking access, Website listing

Exhibitor Booths:
- Local Exhibitor: R2,500
- International Exhibitor: R5,000

Delegate Pass: R200 per person

Delegate Categories: ECD Organizations, ECD Managers, ECD Children (4–12 years), Parents, Other Stakeholders

Main Focus Areas: Developing Tech Savvy Kids, Coding Workshops, Robotics & Drones, Empowering Tech Teachers, Networking, Promoting Sponsors

Keynote speaker topics include: Early Childhood Development & Technology, Coding Education for Young Learners, Robotics & STEM in ECD, Future Skills for Children.

Partnership MOU: All sponsors must agree to the Partnership Memorandum of Understanding before payment.
Payment: PayFast (South African payment gateway) is used for sponsorship, exhibitor bookings, and delegate passes.

Contact: info@ecdcoding.co.za | +27 73 063 9622

Instructions:
- Answer questions about the expo clearly and helpfully.
- If the user hovers over or asks about a specific section (e.g., sponsorship, speakers, delegates), focus your answer on that topic.
- Keep answers concise but complete — 2–4 sentences unless more detail is needed.
- Always be warm, professional, and encouraging.
- If you don't know something specific, refer them to contact info@ecdcoding.co.za.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build system prompt with optional hover context
    const systemContent = context
      ? `${EXPO_SYSTEM_PROMPT}\n\nThe user is currently viewing the "${context}" section of the expo page. Tailor your response to be relevant to that section.`
      : EXPO_SYSTEM_PROMPT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemContent },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please contact info@ecdcoding.co.za." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("expo-copilot error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
