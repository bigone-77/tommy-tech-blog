import Link from 'next/link';

import {
  ArrowRightIcon,
  BookText,
  Code2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

import { AppLayout } from '@/components/app-layout';
import { PostCard } from '@/components/post-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { H2Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/apollo-client';
import { cn, getFormattedDate } from '@/lib/utils';

import { GET_POSTS } from './blog/page.queries';

export default async function HomePage() {
  const { data } = await getClient().query({
    query: GET_POSTS,
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const recentPosts = data?.allPosts?.slice(0, 3) || [];

  return (
    <AppLayout>
      <div className='flex flex-col gap-y-24 py-12'>
        {/* 1. 히어로 섹션 */}
        <section className='space-y-8'>
          <div className='space-y-4'>
            <Badge
              variant='secondary'
              className='bg-primary/10 text-primary border-none px-3 py-1 text-xs font-medium'
            >
              <Sparkles className='mr-2 h-3 w-3' /> Junior Frontend developer
            </Badge>
            <h1 className='text-left text-4xl leading-[1.2] font-black tracking-tight lg:text-6xl'>
              ✋ Hello, Tommy
            </h1>
          </div>
          <p className='text-muted-foreground max-w-[700px] text-lg leading-relaxed md:text-xl'>
            과거의 내가 내린 최선의 선택이, 시간이 흐른 뒤에도 여전히 기분 좋은
            정답으로 남도록.
          </p>
          <Button
            size='lg'
            asChild
            className='shadow-primary/20 rounded-full px-8 shadow-lg transition-all hover:-translate-y-1'
          >
            <Link href='/about-me'>소개 더보기</Link>
          </Button>
        </section>

        {/* 2. 최근 블로그 포스트 섹션 */}
        <section className='space-y-10'>
          <div className='flex items-center justify-between border-b pb-5'>
            <div className='flex items-center gap-2'>
              <BookText className='text-primary h-5 w-5' />
              <H2Typography className='border-none pb-0 text-xl font-bold'>
                최근 블로그 포스트
              </H2Typography>
            </div>
            <Link
              href='/blog'
              className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
            >
              전체 읽기 <ArrowRightIcon className='h-4 w-4' />
            </Link>
          </div>

          <div
            className={cn(
              'grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3',
            )}
          >
            {recentPosts.map((post: any) => {
              const excerpt =
                post.content
                  ?.replace(/[#*`>_~-]/g, '')
                  .trim()
                  .slice(0, 120) + '...';
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  url={`/blog/${post.id}`}
                  title={post.title}
                  thumbnail={post.thumbnail || ''}
                  viewCount={post.viewCount}
                  tags={post.tags}
                  excerpt={excerpt}
                  date={getFormattedDate(
                    new Date(Number(post.createdAt)),
                    'yyyy. MM. dd',
                  )}
                />
              );
            })}
          </div>
        </section>

        {/* 3. TIL & Projects 그리드 섹션 */}
        <section className='grid grid-cols-1 gap-16 md:grid-cols-2'>
          {/* TIL 영역 */}
          <div className='space-y-10'>
            <div className='flex items-center justify-between border-b pb-5'>
              <div className='flex items-center gap-2'>
                <GraduationCap className='text-primary h-5 w-5' />
                <H2Typography className='border-none pb-0 text-xl font-bold'>
                  TIL
                </H2Typography>
              </div>
              <Link
                href='/til'
                className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
              >
                전체 읽기 <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </div>

            <div className='grid gap-4'>
              {[
                { id: 1, date: '2026. 01. 12', title: '컨테이너 쿼리 정복' },
                { id: 2, date: '2026. 01. 10', title: 'Next.js 15 서버 액션' },
              ].map((til) => (
                <Link
                  key={til.id}
                  href={`/til/${til.id}`}
                  className='group hover:bg-accent/50 block rounded-xl border p-5 transition-all'
                >
                  <h4 className='group-hover:text-primary text-sm font-bold transition-colors'>
                    {til.title}
                  </h4>
                  <p className='text-muted-foreground mt-1 font-mono text-xs'>
                    {til.date}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Projects 영역 */}
          <div className='space-y-10'>
            <div className='flex items-center justify-between border-b pb-5'>
              <div className='flex items-center gap-2'>
                <Code2 className='text-primary h-5 w-5' />
                <H2Typography className='border-none pb-0 text-xl font-bold'>
                  Projects
                </H2Typography>
              </div>
              <Link
                href='/projects'
                className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
              >
                전체 읽기 <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </div>

            <div className='grid gap-4'>
              {[
                { id: 1, title: '디지털 가든', desc: '개인 블로그 테마' },
                { id: 2, title: '알고리즘 도구', desc: '자동 포스팅 익스텐션' },
              ].map((project) => (
                <div
                  key={project.id}
                  className='group hover:bg-accent/50 cursor-pointer rounded-xl border p-5 transition-all'
                >
                  <h4 className='group-hover:text-primary text-sm font-bold'>
                    {project.title}
                  </h4>
                  <p className='text-muted-foreground mt-1 text-xs'>
                    {project.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
