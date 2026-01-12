import { notFound } from 'next/navigation';

import { H1Typography } from '@/components/ui/typography';
import { blogSource } from '@/lib/source';
import { PostInput as PostType } from '@/schema/write';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const page = blogSource.getPage([id]);

  if (!page) return notFound();

  const post = page.data as unknown as PostType;
  const MDX = page.data.body;

  return (
    <article>
      <H1Typography>{post.title}</H1Typography>
      <div className='prose dark:prose-invert'>
        <MDX />
      </div>
    </article>
  );
}
