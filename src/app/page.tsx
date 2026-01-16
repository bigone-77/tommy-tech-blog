import Link from 'next/link';

import {
  ArrowRightIcon,
  BookText,
  Code2,
  GraduationCap,
  PlusIcon,
  Sparkles,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// ✅ 설치 권장
import { H2Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/apollo-client';

import { GET_POSTS } from './blog/page.queries';

export default async function HomePage() {
  const { data } = await getClient().query({
    query: GET_POSTS,
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const recentPosts = data?.allPosts?.slice(0, 3) || [];

  return (
    <div className='mx-auto max-w-4xl space-y-32 pb-20'>
      <section className='relative space-y-8 pt-10'>
        <div className='space-y-4'>
          <Badge
            variant='secondary'
            className='bg-primary/10 text-primary border-none px-3 py-1 text-xs font-medium'
          >
            <Sparkles className='mr-2 h-3 w-3' /> Available for projects
          </Badge>
          <h1 className='text-left text-4xl leading-[1.1] font-black tracking-tight lg:text-6xl'>
            반가워요, <br />
            <span className='text-primary'>신토미</span>입니다! 💾
          </h1>
        </div>

        <p className='text-muted-foreground max-w-2xl text-xl leading-relaxed'>
          소프트웨어 엔지니어이자 오픈 소스 크리에이터입니다. 이곳은 제가 공부한
          내용과 프로젝트를 기록하는 저만의{' '}
          <span className='text-foreground decoration-primary/30 underline underline-offset-4'>
            디지털 정원
          </span>
          입니다.
        </p>

        <div className='flex flex-wrap gap-4'>
          <Button
            size='lg'
            asChild
            className='shadow-primary/20 rounded-full px-8 shadow-lg transition-all hover:-translate-y-1'
          >
            <Link href='/about-me'>소개 더보기</Link>
          </Button>
          <Button
            size='lg'
            variant='outline'
            asChild
            className='hover:bg-accent rounded-full px-8 transition-all'
          >
            <Link href='/blog/write' className='gap-2'>
              <PlusIcon className='h-4 w-4' /> 새 글 작성
            </Link>
          </Button>
        </div>
      </section>

      {/* 2. Blog Posts: 리스트형이 아닌 카드형 강조 */}
      <section className='space-y-10'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <BookText className='text-primary h-5 w-5' />
            <H2Typography className='border-none pb-0 text-2xl font-bold'>
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

        <div className='grid gap-4'>
          {recentPosts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.id}`} className='group'>
              <div className='bg-card hover:border-primary/20 relative overflow-hidden rounded-2xl border p-6 transition-all hover:shadow-md'>
                <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
                  <div className='space-y-1'>
                    <h3 className='group-hover:text-primary text-lg font-bold transition-colors'>
                      {post.title}
                    </h3>
                    <div className='flex gap-2'>
                      {post.tags?.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className='text-muted-foreground text-[10px] tracking-wider uppercase'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <time className='text-muted-foreground shrink-0 font-mono text-sm'>
                    {new Date(parseInt(post.createdAt)).toLocaleDateString(
                      'ko-KR',
                      {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      },
                    )}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TIL & Projects: 2열 그리드 배치로 정보 밀도 최적화 */}
      <div className='grid grid-cols-1 gap-16 md:grid-cols-2'>
        {/* TIL 섹션 */}
        <section className='space-y-8'>
          <div className='flex items-center justify-between border-b pb-4'>
            <div className='flex items-center gap-2'>
              <GraduationCap className='text-primary h-5 w-5' />
              <H2Typography className='border-none pb-0 text-xl font-bold'>
                TIL
              </H2Typography>
            </div>
            <Link
              href='/til'
              className='text-muted-foreground text-xs font-medium hover:underline'
            >
              전체보기
            </Link>
          </div>
          <div className='space-y-6'>
            {[
              { id: 1, date: '01.12', title: '컨테이너 쿼리 정복' },
              { id: 2, date: '01.10', title: 'Next.js 15 서버 액션' },
            ].map((til) => (
              <Link
                key={til.id}
                href={`/til/${til.id}`}
                className='group flex items-start gap-4'
              >
                <span className='text-primary bg-primary/5 mt-1 rounded-md px-2 py-1 text-[10px] font-black'>
                  {til.date}
                </span>
                <span className='group-hover:text-primary text-sm leading-snug font-medium transition-colors'>
                  {til.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 프로젝트 섹션 */}
        <section className='space-y-8'>
          <div className='flex items-center justify-between border-b pb-4'>
            <div className='flex items-center gap-2'>
              <Code2 className='text-primary h-5 w-5' />
              <H2Typography className='border-none pb-0 text-xl font-bold'>
                Projects
              </H2Typography>
            </div>
            <Link
              href='/projects'
              className='text-muted-foreground text-xs font-medium hover:underline'
            >
              전체보기
            </Link>
          </div>
          <div className='grid gap-4'>
            {[
              { id: 1, title: '디지털 가든', desc: '개인 블로그 테마' },
              { id: 2, title: '알고리즘 도구', desc: '자동 포스팅 익스텐션' },
            ].map((project) => (
              <div
                key={project.id}
                className='group hover:bg-accent/50 cursor-pointer rounded-xl border p-4 transition-all'
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
        </section>
      </div>
    </div>
  );
}
