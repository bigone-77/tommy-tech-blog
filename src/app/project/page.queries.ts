import { graphql } from '@/generated/gql';

export const GET_PROJECTS = graphql(`
  query GetProjects($isFeatured: Boolean, $status: ProjectStatus, $take: Int) {
    allProjects(isFeatured: $isFeatured, status: $status, take: $take) {
      id
      title
      description
      thumbnail
      techStack
      techHighlights
      period
      status
      isFeatured
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
      status
      isFeatured
      githubUrl
      liveUrl
      content
      createdAt
    }
  }
`);
