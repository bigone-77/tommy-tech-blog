import Link from 'next/link';

import { CalendarIcon, PlusIcon, UserIcon } from 'lucide-react';

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
    <div className='space-y-12'>
      {/* 1. Header: 블로그 타이틀 및 액션 */}
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

      {/* 2. Grid Section: 컨테이너 쿼리 적용 (@md 기준) */}
      <section className='grid grid-cols-1 gap-6 @md:grid-cols-2'>
        {data.allPosts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className='group'>
            <Card className='hover:border-foreground/30 h-full transition-colors'>
              <CardHeader>
                {/* 카드 내부 제목은 H3Typography가 계층상 적절함 */}
                <H3Typography className='line-clamp-1 border-none pb-0'>
                  {post.title}
                </H3Typography>
              </CardHeader>
              <CardContent>
                <PTypography className='mt-0 line-clamp-3'>
                  {post.content}
                </PTypography>
              </CardContent>
              <CardFooter className='flex gap-4'>
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
  );
}
