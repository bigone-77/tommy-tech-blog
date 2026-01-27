'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { tilSchema } from '@/schema/til';

export async function updateTilAction(id: string, _: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { success: false, message: '권한이 없습니다.' };
  }

  const rawTags = formData.get('tags') as string;
  const parsedTags = rawTags ? JSON.parse(rawTags) : [];
  const content = formData.get('content') as string;
  const title = formData.get('title') as string;

  const validated = tilSchema.safeParse({ title, content, tags: parsedTags });
  if (!validated.success) {
    return { success: false, message: '입력값이 올바르지 않습니다.' };
  }

  try {
    await prisma.til.update({
      where: { id },
      data: {
        title: validated.data.title,
        content: validated.data.content,
        tags: validated.data.tags,
      },
    });
  } catch (e) {
    console.error('TIL 수정 실패:', e);
    return {
      success: false,
      message: '데이터베이스 저장 중 오류가 발생했습니다.',
    };
  }

  revalidatePath(`/til/${id}`);
  revalidatePath('/til');

  redirect(`/til/${id}`);
}
