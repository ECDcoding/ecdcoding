import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_learning_basics",
  title: "List Learning the Basics content",
  description: "List active Learning the Basics lesson content, optionally filtered by category and age group.",
  inputSchema: {
    category: z.string().optional().describe("Optional category, e.g. 'Numeracy' or 'Literacy'."),
    age_group: z.enum(["04-07", "08-12"]).optional().describe("Optional age group."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, age_group }, ctx) => {
    let q = supabaseForUser(ctx).from("learning_basics_content")
      .select("id,category,age_group,title,subtitle,description,link_url,display_order")
      .eq("is_active", true).order("display_order").limit(100);
    if (category) q = q.eq("category", category);
    if (age_group) q = q.eq("age_group", age_group);
    const { data, error } = await q;
    if (error) throw new ToolError(error.message);
    const items = (data ?? []).map((i) => ({
      id: i.id, category: i.category, age_group: i.age_group, title: i.title,
      subtitle: i.subtitle, description: i.description, link_url: i.link_url,
    }));
    return { content: [{ type: "text", text: items.length ? JSON.stringify(items) : "No content yet." }], structuredContent: { items } };
  },
});
