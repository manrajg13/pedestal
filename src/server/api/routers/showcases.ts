import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";
import { type Showcase } from "@prisma/client";

const addUserDatatoShowcases = async (showcases: Showcase[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: showcases.map((showcase) => showcase.authorId),
      limit: 100,
    })
  ).map(filterUserForClient);

  return showcases.map((showcase) => {
    const author = users.find((user) => user.id === showcase.authorId);

    if (!author || !author.username)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Author for showcase not found",
      });

    return {
      showcase,
      author: {
        ...author,
        username: author.username,
      },
    };
  });
};

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
});

export const showcasesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const showcases = await ctx.prisma.showcase.findMany({
      take: 100,
      orderBy: [{ createdOn: "desc" }],
    });

    return addUserDatatoShowcases(showcases);
  }),

  getShowcaseById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.showcase.findFirst({
        where: {
          id: input.id,
        },
      })
    ),

  getShowcaseByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.showcase
        .findMany({
          where: {
            authorId: input.userId,
          },
          take: 100,
          orderBy: [{ createdOn: "desc" }],
        })
        .then(addUserDatatoShowcases)
    ),

  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1).max(60),
        type: z.string().min(1).max(20),
        c_background: z.string().min(0).max(20),
        c_width: z.number(),
        c_height: z.number(),
        c_gap: z.number(),
        c_cols: z.number(),
        p_border_color: z.string().min(0).max(20),
        p_background: z.string().min(0).max(20),
        p_border_weight: z.number(),
        p_border_roundness: z.number(),
        p_height: z.number(),
        t_icon: z.string().min(0).max(20),
        t_text_color: z.string().min(0).max(20),
        t_icon_size: z.number(),
        t_title_size: z.number(),
        t_description_size: z.number(),
        t_link_size: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const showcase = await ctx.prisma.showcase.create({
        data: {
          authorId,
          title: input.title,
          type: input.type,
          c_background: input.c_background,
          c_width: input.c_width,
          c_height: input.c_height,
          c_gap: input.c_gap,
          c_cols: input.c_cols,
          p_border_color: input.p_border_color,
          p_background: input.p_background,
          p_border_weight: input.p_border_weight,
          p_border_roundness: input.p_border_roundness,
          p_height: input.p_height,
          t_icon: input.t_icon,
          t_text_color: input.t_text_color,
          t_icon_size: input.t_icon_size,
          t_title_size: input.t_title_size,
          t_description_size: input.t_description_size,
          t_link_size: input.t_link_size,
        },
      });

      return showcase;
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        c_background: z.string().min(0).max(20),
        c_width: z.number(),
        c_height: z.number(),
        c_gap: z.number(),
        c_cols: z.number(),
        p_border_color: z.string().min(0).max(20),
        p_background: z.string().min(0).max(20),
        p_border_weight: z.number(),
        p_border_roundness: z.number(),
        p_height: z.number(),
        t_icon: z.string().min(0).max(20),
        t_text_color: z.string().min(0).max(20),
        t_icon_size: z.number(),
        t_title_size: z.number(),
        t_description_size: z.number(),
        t_link_size: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const showcase = await ctx.prisma.showcase.update({
        where: {
          id: input.id,
        },
        data: {
          c_background: input.c_background,
          c_width: input.c_width,
          c_height: input.c_height,
          c_gap: input.c_gap,
          c_cols: input.c_cols,
          p_border_color: input.p_border_color,
          p_background: input.p_background,
          p_border_weight: input.p_border_weight,
          p_border_roundness: input.p_border_roundness,
          p_height: input.p_height,
          t_icon: input.t_icon,
          t_text_color: input.t_text_color,
          t_icon_size: input.t_icon_size,
          t_title_size: input.t_title_size,
          t_description_size: input.t_description_size,
          t_link_size: input.t_link_size,
        },
      });

      return showcase;
    }),
});
