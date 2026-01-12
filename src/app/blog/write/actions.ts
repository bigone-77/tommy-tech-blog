'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { postSchema } from '@/schema/write';

export async function createPostAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { success: false, message: '관리자 권한이 없습니다.' };
  }

  const rawData = Object.fromEntries(formData.entries());
  const validated = postSchema.safeParse(rawData);

  if (!validated.success) {
    return { success: false, message: '입력값이 올바르지 않습니다.' };
  }

  try {
    await prisma.post.create({
      data: {
        title: validated.data.title,
        content: validated.data.content,
        authorId: session.user.id!,
        published: true,
      },
    });
  } catch (error) {
    return { success: false, message: 'DB 저장 오류가 발생했습니다.' };
  }

  revalidatePath('/blog');
  redirect('/blog');
}
