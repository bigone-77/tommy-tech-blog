// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/typeDefs.ts',
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/generated/**/*'],
  generates: {
    'src/generated/graphql-resolvers.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        mappers: {
          // ✅ 핵심: User 대신 PrismaUser라는 이름으로 가져와서 충돌을 피합니다.
          User: '@/generated#User as PrismaUser',
          Post: '@/generated#Post as PrismaPost',
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
