import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { statusTypes, participantTypes } from "./schema";

export const createConference = mutation({
  args: {
    country: v.string(),
    state: v.string(),
    name: v.string(),
    blogsite: v.string(),
  },
  handler: async (ctx, args) => {
    const cfId = await ctx.db.insert("conferences", {
      country: args.country,
      state: args.state,
      name: args.name,
      blogsite: args.blogsite,
      submissions: [],
      participant: []
    });

    console.log(cfId);

    return cfId;
  },
});

export const getConference = query({
  async handler(ctx) {
    return ctx.db.query("conferences").collect();
  },
});

export const createSubmission = mutation({
  args: {
    country: v.string(),
    files: v.id("files"),
    status: statusTypes,
    email: v.string()
  },
  handler: async (ctx, args) => {
    const subId = await ctx.db.insert("submissions", {
      country: args.country,
      status: args.status,
      email: args.email,
      files: args.files,
    });

    console.log(subId);

    return subId;
  },
});

export const updateSubmissionField = mutation({
  args: { id: v.id("conferences"), subId: v.id("submissions") },
  handler: async (ctx, args) => {
      const { id , subId} = args;
      const conf = await ctx.db.get(id);
      conf?.submissions?.push(subId)
      console.log(conf)
      
      await ctx.db.patch(id, {
        submissions : conf?.submissions
      });

  },
});

export const getSubmissions = mutation({
  args: {id: v.id("conferences")},
  async handler(ctx, args) {
    const conf = await ctx.db.get(args.id);

    const data = conf?.submissions?.map(async (subId) => await ctx.db.get(subId));
    return data
  },
});

