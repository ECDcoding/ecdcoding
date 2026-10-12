import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyProfile from "./tools/get-my-profile";
import listAssignments from "./tools/list-assignments";
import listLearningBasics from "./tools/list-learning-basics";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "ecdcoding",
  title: "ecdcoding",
  version: "0.1.0",
  instructions:
    "Tools for ECDcoding, an early childhood coding and learning platform. Read the signed-in user's profile, their assignments with response status, and Learning the Basics lesson content.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyProfile, listAssignments, listLearningBasics],
});
