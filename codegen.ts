import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs.ts',
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/generated/**/*'],
  generates: {
    'src/generated/graphql-resolvers.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        mappers: {
          User: '@prisma/client#User',
          Post: '@prisma/client#Post',
        },
        scalars: {
          DateTime: 'Date',
        },
        contextType: '@/app/api/graphql/route#ContextValue',
        useIndexSignature: true,
      },
    },
    'src/generated/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
