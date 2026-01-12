import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String! # Prisma의 ?에도 불구하고 UI 보장을 위해 ! 추가
    name: String
    email: String
    image: String
    isAdmin: Boolean
    posts: [Post!]!
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    viewCount: Int!
    author: User!
    authorId: String!
    comments: [Comment!]!
    likes: [Like!]!
    createdAt: String!
  }

  type Comment {
    id: ID!
    content: String!
    createdAt: String!
    post: Post!
    postId: String!
  }

  type Like {
    id: ID!
    ip: String!
    post: Post!
    postId: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  type Query {
    me: User # 로그인 안 했을 수 있으므로 Optional 유지
    allPosts: [Post!]!
    post(id: ID!): Post # 게시글이 없을 수 있으므로 Optional 유지
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
`;
