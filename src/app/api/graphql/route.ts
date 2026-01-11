import { NextRequest } from 'next/server';

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/typeDefs';
import { auth } from '@/lib/auth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async () => {
    const session = await auth();
    return { session };
  },
});

export { handler as GET, handler as POST };
