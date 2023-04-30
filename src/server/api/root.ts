import { createTRPCRouter } from "~/server/api/trpc";
import { showcasesRouter } from './routers/showcases';
import { profileRouter } from './routers/profile';
import { projectsRouter } from "./routers/projects";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  showcases: showcasesRouter,
  profile: profileRouter,
  projects: projectsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
