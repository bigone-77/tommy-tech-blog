import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

// 상대 경로 임포트
import { ProjectStatus } from '../src/generated/gql/graphql';

// 🚀 1. 파일에서 DATABASE_URL 수동 추출 (기존 로직 유지)
const envPath = path.resolve(process.cwd(), '.env.development');
const envContent = fs.readFileSync(envPath, 'utf-8');
const dbUrlMatch = envContent.match(/DATABASE_URL=["']?(.+?)["']?(\s|$)/);
const databaseUrl = dbUrlMatch ? dbUrlMatch[1] : undefined;

if (!databaseUrl) {
  throw new Error(
    '❌ .env.development 파일에서 DATABASE_URL을 찾을 수 없습니다.',
  );
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const filePath = path.join(__dirname, '../data/projects.json');
  const projects = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  console.log('🔍 데이터 검증 및 시딩 시작...');

  const validStatuses = Object.values(ProjectStatus) as string[];

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

  console.log('✅ 드디어 시딩 성공!');
}

main()
  .catch((e) => {
    console.error('❌ 최종 실패:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Pool 종료 추가
  });
