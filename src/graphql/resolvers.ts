import { Resolvers } from '@/generated/graphql-resolvers';
import { prisma } from '@/lib/prisma';

export const resolvers: Resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context.session?.user?.username) return null;

      const user = await prisma.user.findUnique({
        where: { username: context.session.user.username },
      });

      if (!user) return null;

      return {
        ...user,
        isAdmin: context.session.user.isAdmin,
      };
    },

    allPosts: async () => {
      return await prisma.post.findMany({
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    post: async (_parent, { id }) => {
      return await prisma.post.findUnique({
        where: { id },
        include: { author: true },
      });
    },

    allTils: async (_parent, { fromDate, toDate }) => {
      return await prisma.til.findMany({
        where: {
          published: true,
          ...(fromDate || toDate
            ? {
                createdAt: {
                  ...(fromDate ? { gte: new Date(fromDate) } : {}),
                  ...(toDate ? { lte: new Date(toDate) } : {}),
                },
              }
            : {}),
        },
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      });
    },

    til: async (_parent, { id }) => {
      return await prisma.til.findUnique({
        where: { id },
        include: { author: true },
      });
    },

    allProjects: async (_parent, { isFeatured }) => {
      return await prisma.project.findMany({
        where: {
          published: true,
          ...(typeof isFeatured === 'boolean' ? { isFeatured } : {}),
        },
        orderBy: { createdAt: 'desc' },
      });
    },

    project: async (_parent, { id }) => {
      return await prisma.project.findUnique({
        where: { id },
      });
    },
  },
};
