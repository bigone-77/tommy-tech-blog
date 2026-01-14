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
        orderBy: { createdAt: 'desc' }, // 최신순 정렬 추가
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

  Mutation: {
    createPost: async (_parent, { input }, context) => {
      if (!context.session?.user?.id) {
        throw new Error('인증되지 않은 사용자입니다.');
      }

      const { title, thumbnail, content, tags } = input;

      return await prisma.post.create({
        data: {
          title,
          thumbnail,
          content,
          tags: tags || [],
          authorId: context.session.user.id,
        },
        include: {
          author: true,
          comments: true,
          likes: true,
        },
      });
    },
  },
};
