'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { tilSchema } from '@/schema/til';

export async function createTilAction(_: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) return { success: false, message: '권한 없음' };

  const rawTags = formData.get('tags') as string;
  const parsedTags = rawTags ? JSON.parse(rawTags) : [];
  const content = formData.get('content') as string;
  const title = formData.get('title') as string;

  const validated = tilSchema.safeParse({ title, content, tags: parsedTags });
  if (!validated.success)
    return { success: false, message: '입력값을 확인해주세요.' };

  const tilId = crypto.randomUUID();

  try {
    await prisma.til.create({
      data: {
        id: tilId,
        title: validated.data.title,
        content: validated.data.content,
        tags: validated.data.tags,
        authorId: session.user.id!,
        published: true,
      },
    });
  } catch (e) {
    console.error('TIL 저장 실패:', e);
    return { success: false, message: '저장 실패' };
  }

  revalidatePath('/til');
  redirect(`/til/${tilId}`);
}
