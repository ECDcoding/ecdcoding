import mammoth from "npm:mammoth@1.8.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FILE_ID = "1viL6cvyrjpDTISZ7HnWDIdoKBqxVrrFp";
const GATEWAY = "https://connector-gateway.lovable.dev/google_drive/drive/v3";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const driveKey = Deno.env.get("GOOGLE_DRIVE_API_KEY");
    if (!lovableKey || !driveKey) {
      return new Response(JSON.stringify({ error: "Missing connector credentials" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(`${GATEWAY}/files/${FILE_ID}?alt=media`, {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": driveKey,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: "Drive download failed", status: res.status, body: text }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const buf = await res.arrayBuffer();
    const result = await mammoth.convertToHtml({ buffer: new Uint8Array(buf) });

    return new Response(JSON.stringify({ html: result.value }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});