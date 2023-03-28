import { createTRPCRouter } from "~/server/api/trpc";
import { showcasesRouter } from './routers/showcases';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  showcases: showcasesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
