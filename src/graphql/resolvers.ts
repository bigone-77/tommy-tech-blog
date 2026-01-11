import { prisma } from '@/lib/prisma';

export const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      const sessionUser = context.session?.user;

      if (!sessionUser?.username) return null;

      const dbUser = await prisma.user.findUnique({
        where: { username: sessionUser.username },
      });

      if (!dbUser) return null;

      return {
        ...dbUser,
        isAdmin: sessionUser.isAdmin,
      };
    },
  },
};
