'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { blogSchema } from '@/schema/blog';

export async function updatePostAction(id: string, _: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { success: false, message: '권한이 없습니다.' };
  }

  const rawTags = formData.get('tags') as string;
  const parsedTags = rawTags ? JSON.parse(rawTags) : [];
  const content = formData.get('content') as string;

  const validated = blogSchema.safeParse({
    title: formData.get('title'),
    content: content,
    tags: parsedTags,
  });

  if (!validated.success) {
    return { success: false, message: '입력값이 올바르지 않습니다.' };
  }

  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const thumbnail = imageMatch ? imageMatch[1] : '';

  const { title, tags } = validated.data;

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        thumbnail,
        tags,
      },
    });
  } catch (e) {
    console.error('DB 수정 실패:', e);
    return {
      success: false,
      message: '데이터베이스 저장 중 오류가 발생했습니다.',
    };
  }

  revalidatePath(`/blog/${id}`);
  revalidatePath('/blog');

  redirect(`/blog/${id}`);
}
