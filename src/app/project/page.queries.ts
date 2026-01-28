import { graphql } from '@/generated/gql';

export const GET_PROJECTS = graphql(`
  query GetProjects($isFeatured: Boolean) {
    allProjects(isFeatured: $isFeatured) {
      id
      title
      description
      thumbnail
      techStack
      techHighlights
      period
      githubUrl
      liveUrl
      createdAt
    }
  }
`);

export const GET_PROJECT = graphql(`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      description
      thumbnail
      techStack
      techHighlights
      period
      githubUrl
      liveUrl
      content
      createdAt
    }
  }
`);
