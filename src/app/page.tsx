import Link from 'next/link';

import { ArrowRightIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import {
  H1Typography,
  H2Typography,
  H3Typography,
  MutedTypography,
  PTypography,
  SmallTypography,
} from '@/components/ui/typography';
import { getClient } from '@/lib/apollo-client';

// 쿼리 경로가 blog 폴더 안으로 이동했으므로 경로를 수정합니다.
import { GET_POSTS } from './blog/page.queries';

// TIL 및 프로젝트 맛보기 더미 데이터
const RECENT_TILS = [
  {
    id: 1,
    date: '2026.01.12',
    title: '컨테이너 쿼리로 반응형 레이아웃 정복하기',
  },
  { id: 2, date: '2026.01.10', title: 'Next.js 15의 새로운 서버 액션 패턴' },
];

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: '디지털 가든',
    description: 'Tania Rascia 스타일의 개인 블로그 테마',
  },
  {
    id: 2,
    title: '알고리즘 자동화 도구',
    description: '백준 문제를 블로그로 자동 포스팅하는 익스텐션',
  },
];

export default async function HomePage() {
  const { data } = await getClient().query({
    query: GET_POSTS,
    context: { fetchOptions: { cache: 'no-store' } },
  });

  // 최근 블로그 글 상단 3개만 추출
  const recentPosts = data?.allPosts?.slice(0, 3) || [];

  return (
    <div className='space-y-24'>
      {/* 1. 인트로 섹션: Hey, I'm Tommy! */}
      <section className='space-y-6'>
        <H1Typography className='text-left'>
          반가워요, 신토미입니다! 💾
        </H1Typography>
        <PTypography>
          {`소프트웨어 엔지니어이자 오픈 소스 크리에이터입니다. 이곳은 제가 공부한
          내용과 프로젝트를 기록하는 저만의 ${(<strong>디지털 정원</strong>)}입니다.`}
        </PTypography>
        <div className='flex gap-4'>
          <Button asChild>
            <Link href='/about-me'>소개 더보기</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/blog/write' className='gap-2'>
              <PlusIcon className='h-4 w-4' />새 글 작성
            </Link>
          </Button>
        </div>
      </section>

      <section className='space-y-6'>
        <div className='flex items-end justify-between border-b pb-4'>
          <H2Typography className='border-none pb-0'>
            최근 블로그 포스트
          </H2Typography>
          <Link
            href='/blog'
            className='group flex items-center gap-1 text-sm font-medium hover:underline'
          >
            전체 읽기{' '}
            <ArrowRightIcon className='h-3 w-3 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>
        <div className='divide-border divide-y'>
          {recentPosts.map((post: any) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className='group block py-4 first:pt-0'
            >
              <div className='flex items-center justify-between'>
                <H3Typography className='group-hover:text-primary transition-colors'>
                  {post.title}
                </H3Typography>
                <MutedTypography>
                  {new Date(parseInt(post.createdAt)).toLocaleDateString()}
                </MutedTypography>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. TIL 섹션: 간결한 리스트 */}
      <section className='space-y-6'>
        <div className='flex items-end justify-between border-b pb-4'>
          <H2Typography className='border-none pb-0'>
            오늘 배운 것 (TIL)
          </H2Typography>
          <Link
            href='/til'
            className='group flex items-center gap-1 text-sm font-medium hover:underline'
          >
            모든 기록 보기{' '}
            <ArrowRightIcon className='h-3 w-3 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>
        <div className='space-y-4'>
          {RECENT_TILS.map((til) => (
            <Link
              key={til.id}
              href={`/til/${til.id}`}
              className='group flex items-center gap-4'
            >
              <SmallTypography className='text-primary font-mono'>
                {til.date}
              </SmallTypography>
              <span className='font-medium group-hover:underline'>
                {til.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. 프로젝트 섹션: 카드 그리드 (@md 컨테이너 쿼리 활용) */}
      <section className='space-y-6'>
        <div className='flex items-end justify-between border-b pb-4'>
          <H2Typography className='border-none pb-0'>프로젝트</H2Typography>
          <Link
            href='/projects'
            className='group flex items-center gap-1 text-sm font-medium hover:underline'
          >
            전체 프로젝트{' '}
            <ArrowRightIcon className='h-3 w-3 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>
        <div className='grid grid-cols-1 gap-4 @md:grid-cols-2'>
          {FEATURED_PROJECTS.map((project) => (
            <Card
              key={project.id}
              className='hover:bg-accent/50 transition-colors'
            >
              <CardHeader className='p-6'>
                <H3Typography className='mt-0'>{project.title}</H3Typography>
                <MutedTypography className='mt-2'>
                  {project.description}
                </MutedTypography>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
