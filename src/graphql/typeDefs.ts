import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    name: String
    image: String
    isAdmin: Boolean
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: String!
    author: User!
  }

  type Query {
    # 로그인한 내 정보 (세션 기반)
    me: User
    # 모든 게시글 (DB 기반)
    allPosts: [Post!]!
  }
`;
