'use client';

import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

function makeClient() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${baseUrl}/api/graphql`,
    }),
  });
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
