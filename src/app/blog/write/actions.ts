'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { postSchema } from '@/schema/write';

export async function createPostAction(_: any, formData: FormData) {
  const session = await auth();

  // 1. 관리자 권한 체크
  if (!session?.user?.isAdmin) {
    return { success: false, message: '관리자 권한이 없습니다.' };
  }

  const rawData = Object.fromEntries(formData.entries());
  const validated = postSchema.safeParse(rawData);

  if (!validated.success) {
    return { success: false, message: '입력값이 올바르지 않습니다.' };
  }

  const postId = crypto.randomUUID();

  try {
    const contentDir = path.join(process.cwd(), 'blog/content');
    const filePath = path.join(contentDir, `${postId}.mdx`);

    const mdxContent = `---
id: ${postId}
title: ${validated.data.title}
date: ${new Date().toISOString()}
author: ${session.user.name || 'Tommy'}
---

${validated.data.content}`;

    await fs.mkdir(contentDir, { recursive: true });
    await fs.writeFile(filePath, mdxContent, 'utf-8');

    await prisma.post.create({
      data: {
        id: postId,
        title: validated.data.title,
        content: validated.data.content,
        authorId: session.user.id!,
        published: true,
      },
    });
  } catch (error) {
    console.error('저장 중 오류 발생:', error);
    return {
      success: false,
      message: '파일 또는 DB 저장 중 오류가 발생했습니다.',
    };
  }

  revalidatePath('/blog');
  redirect(`/blog/${postId}`);
}
