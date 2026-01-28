import Link from 'next/link';

import {
  ArrowRightIcon,
  BookOpen,
  FolderCode,
  PenTool,
  Sparkles,
} from 'lucide-react';

import { AppLayout } from '@/components/app-layout';
import { PostCard } from '@/components/post-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { H2Typography } from '@/components/ui/typography';
import {
  GetDailyTilsQuery,
  GetPostsQuery,
  GetProjectsQuery,
} from '@/generated/gql/graphql';
import { getClient } from '@/lib/apollo-client';
import { getFormattedDate } from '@/lib/utils';

import { GET_POSTS } from './blog/page.queries';
import { ProjectCard } from './project/_components/project-card';
import { GET_PROJECTS } from './project/page.queries';
import { TilCard } from './til/_components/til-card';
import { GET_DAILY_TILS } from './til/page.queries';

export default async function HomePage() {
  const [blogRes, tilsRes, projectsRes] = await Promise.all([
    getClient().query<GetPostsQuery>({
      query: GET_POSTS,
      context: { fetchOptions: { cache: 'no-store' } },
    }),
    getClient().query<GetDailyTilsQuery>({
      query: GET_DAILY_TILS,
      context: { fetchOptions: { cache: 'no-store' } },
    }),
    getClient().query<GetProjectsQuery>({
      query: GET_PROJECTS,
      variables: {
        isFeatured: true,
        take: 3,
      },
      context: { fetchOptions: { cache: 'no-store' } },
    }),
  ]);

  const recentBlogs = blogRes.data?.allPosts?.slice(0, 3) || [];
  const recentTils = tilsRes.data?.allTils?.slice(0, 3) || [];

  // 🚀 서버에서 3개만 응답받으므로 더 이상 slice가 필요 없습니다.
  const featuredProjects = projectsRes.data?.allProjects || [];

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
              <BookOpen className='text-primary h-5 w-5' />
              <H2Typography className='border-none pb-0 text-xl font-bold'>
                블로그
              </H2Typography>
            </div>
            <Link
              href='/blog'
              className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
            >
              전체 읽기 <ArrowRightIcon className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
            {recentBlogs.map((post) => {
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
                  readingTime={post.readingTime}
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
                <PenTool className='text-primary h-5 w-5' />
                <H2Typography className='border-none pb-0 text-xl font-bold'>
                  오늘 배운 것
                </H2Typography>
              </div>
              <Link
                href='/til'
                className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
              >
                전체 읽기 <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </div>

            <div className='border-border/40 ml-4 space-y-12 border-l-2 py-2 pl-10'>
              {recentTils.map((til) => (
                <TilCard
                  key={til.id}
                  id={til.id}
                  title={til.title}
                  tags={til.tags}
                  content={til.content}
                  date={getFormattedDate(
                    new Date(Number(til.createdAt)),
                    'yyyy. MM. dd',
                  )}
                />
              ))}
            </div>
          </div>

          {/* 🚀 Projects 영역: Featured & 최신 3개만 렌더링 */}
          <div className='space-y-10'>
            <div className='flex items-center justify-between border-b pb-5'>
              <div className='flex items-center gap-2'>
                <FolderCode className='text-primary h-5 w-5' />
                <H2Typography className='border-none pb-0 text-xl font-bold'>
                  프로젝트
                </H2Typography>
              </div>
              <Link
                href='/project'
                className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
              >
                전체 읽기 <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </div>

            <div className='grid gap-4'>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} isFeatured={false} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
