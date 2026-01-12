import { graphql } from '@/generated/gql';

export const GET_POST_BY_ID = graphql(`
  query GetPostById($id: ID!) {
    post(id: $id) {
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
