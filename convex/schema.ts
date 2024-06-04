import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
  v.literal("image"),
  v.literal("pdf"),
  v.literal("csv"),
  v.literal("word"),
  v.literal("excel")
);

export const participantTypes = v.union(
  v.literal("admin"),
  v.literal("manager"),
  v.literal("reveiwer"),
  v.literal("author")
);

export const statusTypes = v.union(
  v.literal("rejected"),
  v.literal("accepted"),
  v.literal("pending")
);
export default defineSchema({
  files: defineTable({
    name: v.string(),
    type: fileTypes,
    fileId: v.id("_storage"),
  }),
  submissions: defineTable({
    // author: v.id("users"),
    country: v.string(),
    files: v.optional(v.id("files")),
    status: statusTypes,
    email: v.string()
  }),
  conferences: defineTable({
    country: v.string(),
    state: v.string(),
    submissions: v.optional(v.array(v.id("submissions"))),
    name: v.string(),
    blogsite: v.string(),
    // owner: v.id("users"),
    participant: v.optional(
      v.array(
        v.object({
          id: v.id("users"),
          role: participantTypes,
        })
      )
    ),
  }),
});
