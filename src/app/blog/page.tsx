import { AppLayout } from '@/components/app-layout';
import { PostCard } from '@/components/post-card';
import { TagFilter } from '@/components/tag-filter';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { H1Typography, LeadTypography } from '@/components/ui/typography';
import { getClient } from '@/lib/apollo-client';
import { cn, getFormattedDate } from '@/lib/utils';

import { GET_POSTS } from './page.queries';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedTag = resolvedParams.tag || 'All';

  const { data } = await getClient().query({
    query: GET_POSTS,
    context: { fetchOptions: { cache: 'no-store' } },
  });

  if (!data || !data.allPosts) return null;

  const tagCounts: Record<string, number> = {
    All: data.allPosts.length,
  };

  data.allPosts.forEach((post: any) => {
    post.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const allTags = [
    'All',
    ...Object.keys(tagCounts)
      .filter((t) => t !== 'All')
      .sort(),
  ];

  const filteredPosts =
    selectedTag === 'All'
      ? data.allPosts
      : data.allPosts.filter((post: any) => post.tags?.includes(selectedTag));

  return (
    <AppLayout>
      <div className='absolute top-0 left-0 z-0 h-50 w-full [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]'>
        <FlickeringGrid
          className='absolute top-0 left-0 size-full'
          squareSize={4}
          gridGap={6}
          color='#6B7280'
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <header className='relative z-10 space-y-4 border-b pb-12'>
        <div className='space-y-4'>
          <H1Typography className='text-5xl font-black tracking-tighter'>
            DIGITAL GARDEN
          </H1Typography>
          <LeadTypography className='text-muted-foreground/70'>
            신토미의 기술 블로그: 배움과 기록의 아카이브.
          </LeadTypography>
        </div>

        <div className='pt-4'>
          <TagFilter
            tags={allTags}
            selectedTag={selectedTag}
            tagCounts={tagCounts}
          />
        </div>
      </header>

      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          'gap-6 md:gap-8 lg:gap-12',
          'mt-12',
          filteredPosts.length < 4 ? 'border-b pb-12' : '',
        )}
      >
        {filteredPosts.map((post: any) => (
          <PostCard
            key={post.id}
            url={`/blog/${post.id}`}
            title={post.title}
            date={getFormattedDate(new Date(post.createdAt), 'M월 d일, yyyy년')}
            thumbnail={post.thumbnail || ''}
          />
        ))}
      </div>
    </AppLayout>
  );
}
