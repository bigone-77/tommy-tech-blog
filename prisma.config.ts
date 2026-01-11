import { config } from 'dotenv';
import path from 'path';
import { defineConfig, env } from 'prisma/config';

config({ path: path.resolve(process.cwd(), '.env.local') });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
