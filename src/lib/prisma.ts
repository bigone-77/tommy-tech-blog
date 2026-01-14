import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

import { PrismaClient } from '@/generated/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;

  if (connectionString?.startsWith('prisma://')) {
    return new PrismaClient({
      accelerateUrl: connectionString,
      log: ['query', 'error', 'warn'],
    });
  }

  const pool = new pg.Pool({
    connectionString,
  });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
  });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
