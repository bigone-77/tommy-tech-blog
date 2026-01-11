import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '../../auth.config';
import { prisma } from './prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.username = token.username as string;
        session.user.isAdmin = token.username === 'bigone-77';
      }
      return session;
    },
  },
});
