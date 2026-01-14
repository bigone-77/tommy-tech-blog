import { Session } from 'next-auth';
import { NextRequest } from 'next/server';

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/typeDefs';
import { auth } from '@/lib/auth';

export interface ContextValue {
  session: Session | null;
}

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest, ContextValue>(
  server,
  {
    context: async () => {
      const session = await auth();
      return { session };
    },
  },
);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
