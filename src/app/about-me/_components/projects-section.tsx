import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { ProjectCard } from '@/app/project/_components/project-card';
import { GET_PROJECTS } from '@/app/project/page.queries';
import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { Highlighter } from '@/components/ui/highlighter';
import { H2Typography, PTypography } from '@/components/ui/typography';
import { GetProjectsQuery } from '@/generated/gql/graphql';
import { getClient } from '@/lib/apollo-client';

export async function ProjectsSection() {
  const PRIMARY_HEX = '#10b981';

  const { data } = await getClient().query<GetProjectsQuery>({
    query: GET_PROJECTS,
    variables: {
      isFeatured: true,
      take: null,
    },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const allFeaturedProjects = data?.allProjects || [];
  const displayProjects = allFeaturedProjects.slice(0, 4);
  const hasMore = allFeaturedProjects.length > 4;

  if (allFeaturedProjects.length === 0) return null;

  return (
    <section id='projects' className='scroll-mt-32'>
      <BlurFade delay={0.4} inView>
        <div className='space-y-12'>
          <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-end'>
            <div className='space-y-2'>
              <H2Typography className='border-none pb-0 text-left'>
                🚀 Projects
              </H2Typography>
              {/* 🚀 오글거리는 수식어를 걷어내고 '고민의 흔적'에 집중한 문구 */}
              <PTypography className='text-muted-foreground mt-0 max-w-2xl break-keep'>
                더 나은 사용자 경험과 코드를 위해{' '}
                <span className='inline-block'>
                  <Highlighter
                    action='underline'
                    color={PRIMARY_HEX}
                    strokeWidth={2}
                    animationDuration={1000}
                  >
                    <span className='text-foreground font-bold'>
                      치열하게 고민하고 해결한 기록
                    </span>
                  </Highlighter>
                </span>{' '}
                중 일부입니다.
              </PTypography>
            </div>

            {/* 🟢 'TOTAL' 대신 'FEATURED'를 사용하여 엄선된 느낌을 강조 */}
            <div className='border-primary/20 bg-primary/5 text-primary flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-widest shadow-sm'>
              <span className='relative flex h-2 w-2'>
                <span className='bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
                <span className='bg-primary relative inline-flex h-2 w-2 rounded-full'></span>
              </span>
              {allFeaturedProjects.length} FEATURED PROJECTS
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {displayProjects.map((project, i) => (
              <BlurFade key={project.id} delay={0.5 + i * 0.1} inView>
                <div className='group transition-transform duration-300 hover:-translate-y-1'>
                  <ProjectCard {...project} isFeatured={false} />
                </div>
              </BlurFade>
            ))}
          </div>

          {hasMore && (
            <div className='flex justify-center pt-4'>
              <Button
                variant='ghost'
                asChild
                className='group text-muted-foreground hover:bg-primary/5 hover:text-primary rounded-full px-8 transition-all'
              >
                <Link href='/project'>
                  전체 기록 탐색하기 ({allFeaturedProjects.length - 4}+ more)
                  <ArrowRightIcon className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </BlurFade>
    </section>
  );
}
