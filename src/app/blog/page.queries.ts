import { graphql } from '@/generated/gql';

export const GET_POSTS = graphql(`
  query GetPosts {
    allPosts {
      id
      title
      content
      createdAt
      author {
        username
      }
    }
  }
`);
