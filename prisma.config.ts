import { config } from 'dotenv';
import path from 'path';
import { defineConfig, env } from 'prisma/config';

const nodeEnv = process.env.NODE_ENV || 'development';
config({ path: path.resolve(process.cwd(), `.env.${nodeEnv}`) });

export default defineConfig({
  migrations: {
    seed: 'npx tsx ./prisma/seed.ts',
  },
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
