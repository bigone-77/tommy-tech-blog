import Link from 'next/link';

import { CalendarIcon, PlusIcon, UserIcon } from 'lucide-react';

import { AppLayout } from '@/components/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  H1Typography,
  H3Typography,
  LeadTypography,
  MutedTypography,
  PTypography,
} from '@/components/ui/typography';
import { getClient } from '@/lib/apollo-client';

import { GET_POSTS } from './page.queries';

export default async function Page() {
  const { data } = await getClient().query({
    query: GET_POSTS,
    context: { fetchOptions: { cache: 'no-store' } },
  });

  if (!data || !data.allPosts) return null;

  return (
    <AppLayout
    // aside={
    //   <div className='border-border bg-card rounded-xl border p-6 shadow-sm'>
    //     <p className='text-muted-foreground/80 mb-4 text-xs font-bold tracking-widest uppercase'>
    //       Explore
    //     </p>
    //     <p className='text-muted-foreground text-sm'>
    //       태그나 카테고리 필터링이 들어갈 자리입니다.
    //     </p>
    //   </div>
    // }
    >
      <div className='space-y-12'>
        <header className='flex items-end justify-between border-b pb-8'>
          <div className='space-y-2'>
            <H1Typography>신토미의 기술 블로그</H1Typography>
            <LeadTypography>배움의 과정을 기록하고 공유합니다.</LeadTypography>
          </div>
          <Link href='/blog/write'>
            <Button size='sm' className='gap-2'>
              <PlusIcon className='h-4 w-4' />새 글 작성
            </Button>
          </Link>
        </header>

        {/* 2. Grid Section: AppLayout 내부 @container/post를 기준으로 반응형 작동 */}
        <section className='grid grid-cols-1 gap-6 @md/post:grid-cols-2'>
          {data.allPosts.map((post: any) => (
            <Link href={`/blog/${post.id}`} key={post.id} className='group'>
              <Card className='hover:border-foreground/30 flex h-full flex-col transition-colors'>
                <CardHeader className='space-y-3'>
                  {/* 태그 표시 영역 추가 */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-1.5'>
                      {post.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant='secondary'
                          className='text-[10px] tracking-wider uppercase'
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <H3Typography className='line-clamp-1 border-none pb-0'>
                    {post.title}
                  </H3Typography>
                </CardHeader>

                <CardContent className='flex-1'>
                  <PTypography className='text-muted-foreground mt-0 line-clamp-3'>
                    {post.content}
                  </PTypography>
                </CardContent>

                <CardFooter className='flex gap-4 border-t pt-4'>
                  <div className='flex items-center gap-1'>
                    <UserIcon className='text-muted-foreground h-3.5 w-3.5' />
                    <MutedTypography>
                      {post.author.username || '익명'}
                    </MutedTypography>
                  </div>
                  <div className='flex items-center gap-1'>
                    <CalendarIcon className='text-muted-foreground h-3.5 w-3.5' />
                    <MutedTypography>
                      {new Date(parseInt(post.createdAt)).toLocaleDateString()}
                    </MutedTypography>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
