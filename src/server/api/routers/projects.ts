import { Project } from "@prisma/client";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const filterProject = async (projects: Project[]) => {
  return projects.map((project) => {

    return {
      project
    };
  });
};

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.project.findMany({
      take: 100,
    });

    return filterProject(projects);
  }),

  getProjectsByShowcaseId: publicProcedure
  .input(
    z.object({
      showcaseId: z.string(),
    })
  )
  .query(({ ctx, input }) =>
    ctx.prisma.project
      .findMany({
        where: {
          showcaseId: input.showcaseId,
        },
        take: 100,
      })
      .then(filterProject)
    ),

  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(0).max(60),
        description: z.string().min(0).max(500),
        tag_1: z.string().min(0).max(40),
        tag_2: z.string().min(0).max(40),
        tag_3: z.string().min(0).max(40),
        link: z.string().min(0).max(400),
        showcaseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.create({
        data: {
          name: input.name,
          description: input.description,
          tag_1: input.tag_1,
          tag_2: input.tag_2,
          tag_3: input.tag_3,
          link: input.link,
          showcaseId: input.showcaseId,
        },
      });

      return project;
    }),
});
