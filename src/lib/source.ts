import { type Source, loader } from 'fumadocs-core/source';

import { prisma } from './prisma';

interface MyBlogConfig {
  pageData: {
    title: string;
    date: Date;
    content: string;
    tags: string[];
    thumbnail?: string | null;
    viewCount: number;
    readingTime: number;
  };
  metaData: Record<string, unknown>;
}

export async function getBlogSource() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  const mySource: Source<MyBlogConfig> = {
    files: posts.map((post) => ({
      type: 'page',
      path: `${post.id}.mdx`,
      data: {
        title: post.title,
        date: post.createdAt,
        content: post.content,
        tags: post.tags,
        thumbnail: post.thumbnail,
        viewCount: post.viewCount,
        readingTime: post.readingTime,
      },
    })),
  };

  return loader({
    baseUrl: '/blog',
    source: mySource,
  });
}
