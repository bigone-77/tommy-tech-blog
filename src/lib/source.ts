import { type Source, loader } from 'fumadocs-core/source';

import { prisma } from './prisma';

interface MyBlogConfig {
  pageData: {
    title: string;
    date: Date;
    content: string;
    tags: string[];
    thumbnail?: string | null;
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
      type: 'page', // 가상 파일의 타입을 '페이지'로 지정
      path: `${post.id}.mdx`, // 가상의 경로 설정 (Fumadocs 내부 인덱싱용)
      data: {
        title: post.title,
        date: post.createdAt,
        content: post.content, // DB에 저장된 MDX 문자열 (Frontmatter 포함)
        tags: post.tags,
        thumbnail: post.thumbnail,
      },
    })),
  };

  return loader({
    baseUrl: '/blog',
    source: mySource,
  });
}
