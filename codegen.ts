import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs.ts',
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/generated/**/*'],
  generates: {
    'src/generated/graphql-resolvers.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        mappers: {
          User: '@prisma/client#User as PrismaUser',
          Post: '@prisma/client#Post as PrismaPost',
          Til: '@/lib/prisma#Til',
          Project: '@/lib/prisma#Project',
        },
        contextType: '@/app/api/graphql/route#ContextValue',
        maybeValue: 'T | null',
        avoidOptionals: false,
      },
    },
    'src/generated/gql/': {
      preset: 'client',
      plugins: [],
      config: {
        maybeValue: 'T | null',
        avoidOptionals: true,
      },
    },
  },
};
export default config;
