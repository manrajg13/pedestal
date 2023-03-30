import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/nextjs/dist/api";
import { TRPCError } from "@trpc/server";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export const showcasesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const showcases = await ctx.prisma.showcase.findMany({
      take: 100,
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
          message: "Author for post not found",
        });

      return {
        showcase,
        author,
      };
    });
  }),
});
