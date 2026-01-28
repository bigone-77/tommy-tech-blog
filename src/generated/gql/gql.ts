/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetPosts {\n    allPosts {\n      id\n      title\n      content\n      thumbnail\n      tags\n      createdAt\n      viewCount\n      readingTime\n      author {\n        username\n      }\n    }\n  }\n": typeof types.GetPostsDocument,
    "\n  query GetProjects($isFeatured: Boolean, $status: ProjectStatus, $take: Int) {\n    allProjects(isFeatured: $isFeatured, status: $status, take: $take) {\n      id\n      title\n      description\n      thumbnail\n      techStack\n      techHighlights\n      period\n      status\n      isFeatured\n      githubUrl\n      liveUrl\n      createdAt\n    }\n  }\n": typeof types.GetProjectsDocument,
    "\n  query GetProject($id: ID!) {\n    project(id: $id) {\n      id\n      title\n      description\n      thumbnail\n      techStack\n      techHighlights\n      period\n      status\n      isFeatured\n      githubUrl\n      liveUrl\n      content\n      createdAt\n    }\n  }\n": typeof types.GetProjectDocument,
    "\n  query GetTilSummary($fromDate: String) {\n    allTils(fromDate: $fromDate) {\n      id\n      createdAt\n    }\n  }\n": typeof types.GetTilSummaryDocument,
    "\n  query GetDailyTils($fromDate: String, $toDate: String) {\n    allTils(fromDate: $fromDate, toDate: $toDate) {\n      id\n      title\n      content\n      tags\n      createdAt\n    }\n  }\n": typeof types.GetDailyTilsDocument,
};
const documents: Documents = {
    "\n  query GetPosts {\n    allPosts {\n      id\n      title\n      content\n      thumbnail\n      tags\n      createdAt\n      viewCount\n      readingTime\n      author {\n        username\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetProjects($isFeatured: Boolean, $status: ProjectStatus, $take: Int) {\n    allProjects(isFeatured: $isFeatured, status: $status, take: $take) {\n      id\n      title\n      description\n      thumbnail\n      techStack\n      techHighlights\n      period\n      status\n      isFeatured\n      githubUrl\n      liveUrl\n      createdAt\n    }\n  }\n": types.GetProjectsDocument,
    "\n  query GetProject($id: ID!) {\n    project(id: $id) {\n      id\n      title\n      description\n      thumbnail\n      techStack\n      techHighlights\n      period\n      status\n      isFeatured\n      githubUrl\n      liveUrl\n      content\n      createdAt\n    }\n  }\n": types.GetProjectDocument,
    "\n  query GetTilSummary($fromDate: String) {\n    allTils(fromDate: $fromDate) {\n      id\n      createdAt\n    }\n  }\n": types.GetTilSummaryDocument,
    "\n  query GetDailyTils($fromDate: String, $toDate: String) {\n    allTils(fromDate: $fromDate, toDate: $toDate) {\n      id\n      title\n      content\n      tags\n      createdAt\n    }\n  }\n": types.GetDailyTilsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts {\n    allPosts {\n      id\n      title\n      content\n      thumbnail\n      tags\n      createdAt\n      viewCount\n      readingTime\n      author {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    allPosts {\n      id\n      title\n      content\n      thumbnail\n      tags\n      createdAt\n      viewCount\n      readingTime\n      author {\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProjects($isFeatured: Boolean, $status: ProjectStatus, $take: Int) {\n    allProjects(isFeatured: $isFeatured, status: $status, take: $take) {\n      id\n      title\n      description\n      thumbnail\n      techStack\n      techHighlights\n      period\n      status\n      isFeatured\n      githubUrl\n      liveUrl\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetProjects($isFeatured: Boolean, $status: ProjectStatus, $take: Int) {\n    allProjects(isFeatured: $isFeatured, status: $status, take: $take) {\n      id\n      title\n      description\n      thumbnail\n      techStack\n      techHighlights\n      period\n      status\n      isFeatured\n      githubUrl\n      liveUrl\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProject($id: ID!) {\n    project(id: $id) {\n      id\n      title\n      description\n      thumbnail\n      techStack\n      techHighlights\n      period\n      status\n      isFeatured\n      githubUrl\n      liveUrl\n      content\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetProject($id: ID!) {\n    project(id: $id) {\n      id\n      title\n      description\n      thumbnail\n      techStack\n      techHighlights\n      period\n      status\n      isFeatured\n      githubUrl\n      liveUrl\n      content\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTilSummary($fromDate: String) {\n    allTils(fromDate: $fromDate) {\n      id\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetTilSummary($fromDate: String) {\n    allTils(fromDate: $fromDate) {\n      id\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetDailyTils($fromDate: String, $toDate: String) {\n    allTils(fromDate: $fromDate, toDate: $toDate) {\n      id\n      title\n      content\n      tags\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetDailyTils($fromDate: String, $toDate: String) {\n    allTils(fromDate: $fromDate, toDate: $toDate) {\n      id\n      title\n      content\n      tags\n      createdAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;