import Link from 'next/link';

import { getBlogSource } from '@/lib/source';
import { getFormattedDate } from '@/lib/utils';

interface ReadMoreSectionProps {
  currentId: string;
  currentTags?: string[];
}

export async function ReadMoreSection({
  currentId,
  currentTags = [],
}: ReadMoreSectionProps) {
  const blogSource = await getBlogSource();
  const allPages = blogSource.getPages();

  const recommendedPosts = allPages
    .filter((page) => page.slugs[0] !== currentId)
    .map((page) => {
      const tagOverlap = currentTags.filter((tag) =>
        page.data.tags?.includes(tag),
      ).length;

      return {
        url: `/blog/${page.slugs[0]}`,
        title: page.data.title,
        date: new Date(page.data.date),
        thumbnail: page.data.thumbnail,
        relevanceScore: tagOverlap,
      };
    })
    .sort((a, b) => {
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return b.date.getTime() - a.date.getTime();
    })
    .slice(0, 3);

  if (recommendedPosts.length === 0) return null;

  return (
    <section className='border-border mt-20 border-t pt-12'>
      <h2 className='mb-8 text-2xl font-bold tracking-tight'>관련 게시글</h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {recommendedPosts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className='group flex flex-col space-y-3'
          >
            {post.thumbnail && (
              <div className='bg-muted aspect-video overflow-hidden rounded-xl border'>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className='h-full w-full object-cover transition-transform group-hover:scale-105'
                />
              </div>
            )}
            <div className='space-y-1'>
              <h3 className='group-hover:text-primary line-clamp-1 font-bold transition-colors'>
                {post.title}
              </h3>
              <time className='text-muted-foreground/60 text-[11px] font-medium uppercase'>
                {getFormattedDate(post.date, 'yyyy년 M월 d일')}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
