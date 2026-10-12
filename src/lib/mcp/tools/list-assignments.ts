import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_assignments",
  title: "List assignments",
  description: "List active ECDcoding assignments, optionally filtered by age group, with the caller's response status.",
  inputSchema: {
    age_group: z.string().optional().describe("Optional age group filter, e.g. '04-07' or '08-12'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ age_group }, ctx) => {
    const sb = supabaseForUser(ctx);
    let q = sb.from("assignments").select("id,title,category,delivery_method,instructions,age_group,created_at")
      .eq("is_active", true).order("created_at", { ascending: false }).limit(50);
    if (age_group) q = q.eq("age_group", age_group);
    const { data, error } = await q;
    if (error) throw new ToolError(error.message);
    const { data: resp } = await sb.from("assignment_responses").select("assignment_id,status")
      .eq("user_id", ctx.getUserId() ?? "");
    const status = new Map((resp ?? []).map((r) => [r.assignment_id, r.status]));
    const assignments = (data ?? []).map((a) => ({
      id: a.id, title: a.title, category: a.category, delivery_method: a.delivery_method,
      instructions: a.instructions, age_group: a.age_group, created_at: a.created_at,
      my_status: status.get(a.id) ?? null,
    }));
    return { content: [{ type: "text", text: JSON.stringify(assignments) }], structuredContent: { assignments } };
  },
});
