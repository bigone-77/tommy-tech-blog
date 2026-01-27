'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function deleteTil(id: string) {
  try {
    await prisma.til.delete({ where: { id } });
    revalidatePath('/til');
    return { success: true };
  } catch (error) {
    return { success: false, message: '학습 기록 삭제에 실패했습니다.' };
  }
}
