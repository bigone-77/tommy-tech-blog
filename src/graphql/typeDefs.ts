import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    name: String
    email: String
    image: String
    isAdmin: Boolean
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    thumbnail: String
    content: String!
    published: Boolean!
    viewCount: Int!
    readingTime: Int!
    author: User!
    authorId: String!
    tags: [String!]!
    likes: [Like!]!
    createdAt: String!
  }

  type Like {
    id: ID!
    ip: String!
    post: Post!
    postId: String!
  }

  input CreatePostInput {
    title: String!
    thumbnail: String
    content: String!
    tags: [String!]
  }

  type Query {
    me: User
    allPosts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
`;
