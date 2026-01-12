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
        include: {
          author: true,
          comments: true,
          likes: true,
        },
      });
    },
    post: async (_parent, { id }) => {
      return await prisma.post.findUnique({
        where: { id },
        include: {
          author: true,
          comments: true,
          likes: true,
        },
      });
    },
  },
};
