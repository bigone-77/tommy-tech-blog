import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('❌ DATABASE_URL 환경 변수를 찾을 수 없습니다.');
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const filePath = path.join(__dirname, '../data/projects.json');
  const projects = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  console.log(`🔍 [${process.env.NODE_ENV}] 데이터 시딩 시작...`);

  await prisma.$transaction([
    prisma.project.deleteMany(),
    prisma.project.createMany({
      data: projects.map((p: any) => ({
        ...p,
        isFeatured: p.isFeatured ?? false,
        published: true,
      })),
    }),
  ]);

  console.log('✅ 시딩 성공!');
}

main()
  .catch((e) => {
    console.error('❌ 최종 실패:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
