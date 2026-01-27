import { graphql } from '@/generated/gql';

export const GET_TIL_SUMMARY = graphql(`
  query GetTilSummary($fromDate: String) {
    allTils(fromDate: $fromDate) {
      id
      createdAt
    }
  }
`);

export const GET_DAILY_TILS = graphql(`
  query GetDailyTils($fromDate: String, $toDate: String) {
    allTils(fromDate: $fromDate, toDate: $toDate) {
      id
      title
      content
      tags
      createdAt
    }
  }
`);
