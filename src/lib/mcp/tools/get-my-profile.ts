import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_my_profile",
  title: "Get my profile",
  description: "Return the signed-in user's ECDcoding profile (name, username, role, location).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    const { data, error } = await supabaseForUser(ctx)
      .from("profiles")
      .select("first_name,last_name,username,registration_type,state,country,institution")
      .eq("user_id", ctx.getUserId() ?? "")
      .maybeSingle();
    if (error) throw new ToolError(error.message);
    if (!data) return { content: [{ type: "text", text: "No profile found." }] };
    const profile = {
      first_name: data.first_name, last_name: data.last_name, username: data.username,
      registration_type: data.registration_type, state: data.state, country: data.country,
      institution: data.institution,
    };
    return { content: [{ type: "text", text: JSON.stringify(profile) }], structuredContent: { profile } };
  },
});
