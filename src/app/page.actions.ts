'use server';

import { serialize } from 'next-mdx-remote/serialize';

import { remarkGfm } from 'fumadocs-core/mdx-plugins';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import { prisma } from '@/lib/prisma';

export async function trackSiteVisit(ip: string) {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingVisit = await prisma.siteVisit.findFirst({
      where: {
        ip: ip,
        createdAt: { gte: oneDayAgo },
      },
    });

    if (existingVisit) return { success: false };

    await prisma.siteVisit.create({
      data: { ip },
    });

    return { success: true };
  } catch (e) {
    console.error('사이트 방문 기록 실패:', e);
    return { success: false };
  }
}

export async function getTotalVisitors() {
  return await prisma.siteVisit.count();
}

export async function compileMDXAction(content: string) {
  if (!content) return null;

  try {
    const mdxSource = await serialize(content, {
      mdxOptions: {
        format: 'md',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeRaw,
          [
            rehypePrettyCode,
            {
              theme: {
                dark: 'one-dark-pro',
                light: 'github-light',
              },
              keepBackground: true,
              showLineNumbers: true,
              onVisitLine(node: any) {
                if (node.children.length === 0) {
                  node.children = [{ type: 'text', value: ' ' }];
                }
              },
            },
          ],
          rehypeSlug,
        ],
      },
    });

    return JSON.parse(JSON.stringify(mdxSource));
  } catch (error) {
    console.error('MDX 컴파일 에러:', error);
    return null;
  }
}
