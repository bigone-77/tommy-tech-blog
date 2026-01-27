'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { prisma } from '@/lib/prisma';

export async function incrementView(id: string) {
  const headerList = await headers();

  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const existingLog = await prisma.viewLog.findFirst({
      where: {
        postId: id,
        ip: ip,
        createdAt: { gte: oneDayAgo },
      },
    });

    if (existingLog) {
      return { success: false, message: '이미 집계된 조회수' };
    }

    await prisma.$transaction([
      prisma.post.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      }),
      prisma.viewLog.create({
        data: { postId: id, ip: ip },
      }),
    ]);

    return { success: true };
  } catch (e) {
    console.error('조회수 업데이트 실패:', e);
    return { success: false };
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    return { success: false, message: '게시글 삭제에 실패했습니다.' };
  }
}
