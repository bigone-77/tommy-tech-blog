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

  type Project {
    id: ID!
    title: String!
    description: String!
    thumbnail: String!
    techStack: [String!]!
    techHighlights: [String!]!
    period: String!
    githubUrl: String
    liveUrl: String
    content: String!
    isFeatured: Boolean!
    published: Boolean!
    createdAt: String!
  }

  type Query {
    me: User
    allPosts: [Post!]!
    post(id: ID!): Post
    allTils(fromDate: String, toDate: String): [Til!]!
    til(id: ID!): Til
    allProjects(isFeatured: Boolean): [Project!]!
    project(id: ID!): Project
  }
`;
