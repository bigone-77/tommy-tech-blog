'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { postSchema } from '@/schema/write';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Cloudinary 서명 생성
export async function getCloudinarySignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET!,
  );
  return { signature, timestamp };
}

export async function createPostAction(_: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) return { success: false, message: '권한 없음' };

  const rawTags = formData.get('tags') as string;
  const parsedTags = rawTags ? JSON.parse(rawTags) : [];
  const content = formData.get('content') as string;

  const validated = postSchema.safeParse({
    title: formData.get('title'),
    content: content,
    tags: parsedTags,
  });

  if (!validated.success) return { success: false, message: '입력값 오류' };

  // ✅ 본문 첫 번째 이미지 추출 (Thumbnail)
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const thumbnail = imageMatch ? imageMatch[1] : '';

  const postId = crypto.randomUUID();
  const { title, tags } = validated.data;

  try {
    const filePath = path.join(process.cwd(), 'blog/content', `${postId}.mdx`);
    const mdxContent = `---
id: ${postId}
title: ${title}
date: ${new Date().toISOString()}
tags: ${JSON.stringify(tags)}
thumbnail: ${thumbnail}
author: ${session.user.name || 'Tommy'}
---

${content}`;

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, mdxContent, 'utf-8');

    await prisma.post.create({
      data: {
        id: postId,
        title,
        content,
        thumbnail,
        tags,
        authorId: session.user.id!,
        published: true,
      },
    });
  } catch (e) {
    console.error(e);
    return { success: false, message: '저장 실패' };
  }

  revalidatePath('/blog');
  redirect(`/blog/${postId}`);
}
