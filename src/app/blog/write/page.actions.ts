'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import crypto from 'crypto';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateReadingTime } from '@/lib/utils';
import { blogSchema } from '@/schema/blog';

export async function createPostAction(_: any, formData: FormData) {
  const session = await auth();

  if (!session?.user?.isAdmin) return { success: false, message: '권한 없음' };

  const rawTags = formData.get('tags') as string;
  const parsedTags = rawTags ? JSON.parse(rawTags) : [];
  const content = formData.get('content') as string;

  const validated = blogSchema.safeParse({
    title: formData.get('title'),
    content: content,
    tags: parsedTags,
  });

  if (!validated.success) return { success: false, message: '입력값 오류' };

  const readingTime = calculateReadingTime(content);

  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const thumbnail = imageMatch ? imageMatch[1] : '';
  const postId = crypto.randomUUID();
  const { title, tags } = validated.data;

  try {
    await prisma.post.create({
      data: {
        id: postId,
        title,
        content,
        thumbnail,
        tags,
        authorId: session.user.id!,
        published: true,
        readingTime,
      },
    });
  } catch (e) {
    console.error('DB 저장 실패:', e);
    return { success: false, message: '저장 실패' };
  }

  revalidatePath('/blog');
  redirect(`/blog/${postId}`);
}
