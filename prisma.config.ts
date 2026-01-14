import { config } from 'dotenv';
import path from 'path';
import { defineConfig, env } from 'prisma/config';

// NODE_ENV에 따라 파일 로드
const nodeEnv = process.env.NODE_ENV || 'development';
config({ path: path.resolve(process.cwd(), `.env.${nodeEnv}`) });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // ✅ CLI(push, migrate)가 사용할 URL
    url: env('DATABASE_URL'),
  },
});
