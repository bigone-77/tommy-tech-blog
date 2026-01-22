// components/blog-content.tsx (Server Component)
import { PostCard } from '@/components/post-card';
import { TagFilter } from '@/components/tag-filter';
import { getClient } from '@/lib/apollo-client';
import { getFormattedDate } from '@/lib/utils';

import { GET_POSTS } from '../page.queries';

export async function BlogContent({ selectedTag }: { selectedTag: string }) {
  const { data } = await getClient().query({
    query: GET_POSTS,
    context: {
      fetchOptions: {
        next: { revalidate: 3600 },
      },
    },
  });

  if (!data?.allPosts) return null;

  const tagCounts: Record<string, number> = { All: data.allPosts.length };
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
    <>
      <div className='pt-4'>
        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          tagCounts={tagCounts}
        />
      </div>

      <div className='mt-12 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-12'>
        {filteredPosts.map((post: any) => (
          <PostCard
            key={post.id}
            url={`/blog/${post.id}`}
            title={post.title}
            date={getFormattedDate(
              new Date(Number(post.createdAt)),
              'M월 d일, yyyy년',
            )}
            thumbnail={post.thumbnail || ''}
          />
        ))}
      </div>
    </>
  );
}
