import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { fileTypes } from "./schema";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const generateDownloadUrl = mutation({
  args: {
    id: v.id("_storage"),
  },
  async handler(ctx, args) {
    return ctx.storage.getUrl(args.id);
  },
});

export const createFile = mutation({
  args: {
    name: v.string(),
    fileId: v.id("_storage"),
    type: fileTypes,
  },
  async handler(ctx, args) {
    const fileId = await ctx.db.insert("files", {
      name: args.name,
      fileId: args.fileId,
      type: args.type,
    });

    console.log(fileId);
    return fileId
  },
});

export const getFiles = query({
  args: {},
  async handler(ctx, args) {
    return ctx.db.query("files").collect();
  },
});

export const deleteFile = mutation({
  args: { fileId: v.id("files") },
  async handler(ctx, args) {
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError("This file does not exist");
    }

    await ctx.db.delete(args.fileId);
  },
});
