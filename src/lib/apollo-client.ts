import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';

export const { getClient } = registerApolloClient(() => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${baseUrl}/api/graphql`,
    }),
  });
});
