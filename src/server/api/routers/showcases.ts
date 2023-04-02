import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/dist/api";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

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
  }),

  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1).max(60),
        type: z.string().min(1).max(20),
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
        },
      });

      return showcase;
    }),
});
