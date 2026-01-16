'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/prisma';

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('게시글 삭제에 실패했습니다.');
  }

  revalidatePath('/blog');
  redirect('/blog');
}
