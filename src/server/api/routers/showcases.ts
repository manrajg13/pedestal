import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const showcasesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.showcase.findMany();
  }),
});
