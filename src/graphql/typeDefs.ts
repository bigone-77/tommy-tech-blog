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
    createdAt: String!
  }

  type Til {
    id: ID!
    title: String!
    content: String!
    tags: [String!]!
    published: Boolean!
    author: User!
    authorId: String!
    createdAt: String!
  }

  type Query {
    me: User

    # --- Blog ---
    allPosts: [Post!]!
    post(id: ID!): Post

    # --- TIL ---
    allTils(fromDate: String, toDate: String): [Til!]!
    til(id: ID!): Til
  }
`;
