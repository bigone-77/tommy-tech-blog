import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { remarkGfm } from 'fumadocs-core/mdx-plugins';
import { DocsBody } from 'fumadocs-ui/page';
import { ArrowLeft, Calendar, Github, Globe, Hammer } from 'lucide-react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import { AppImage } from '@/components/app-image';
import { AppLayout } from '@/components/app-layout';
import { ReadProgressBar } from '@/components/read-progressbar';
import { TableOfContents } from '@/components/table-of-contents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { H1Typography } from '@/components/ui/typography';
import { GetProjectQuery, ProjectStatus } from '@/generated/gql/graphql';
import { getClient } from '@/lib/apollo-client';
import { BreadcrumbSetter } from '@/lib/breadcrumb-store';
import { extractHeadings } from '@/lib/toc';
import { getMDXComponents } from '@/mdx-components';

import { GET_PROJECT } from '../page.queries';

interface Props {
  params: Promise<{ id: string }>;
}

const STATUS_LABELS: Record<
  ProjectStatus,
  { label: string; variant: 'default' | 'secondary' | 'outline' }
> = {
  [ProjectStatus.Live]: { label: '운영 중', variant: 'default' },
  [ProjectStatus.Developing]: { label: '개발 중', variant: 'secondary' },
  [ProjectStatus.Archived]: { label: '보관됨', variant: 'outline' },
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  // 🚀 1. DB에서 프로젝트 데이터 패칭
  const { data } = await getClient().query<GetProjectQuery>({
    query: GET_PROJECT,
    variables: { id },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const project = data?.project;
  if (!project) return notFound();

  const headings = extractHeadings(project.content);
  const hasToc = headings?.length > 0;

  return (
    <AppLayout
      aside={
        hasToc ? (
          <div className='border-border bg-card sticky top-24 rounded-xl border p-5 shadow-sm'>
            <p className='text-muted-foreground/50 mb-3 text-[11px] font-bold tracking-widest uppercase'>
              목차
            </p>
            <TableOfContents headings={headings} />
          </div>
        ) : null
      }
    >
      <ReadProgressBar />
      <BreadcrumbSetter title={project.title} />

      <div className='space-y-12 pb-20'>
        {/* 상단 네비게이션 */}
        <div className='flex items-center justify-between'>
          <Button
            variant='ghost'
            asChild
            className='text-muted-foreground hover:text-foreground h-8 gap-2 px-2'
          >
            <Link href='/project'>
              <ArrowLeft className='h-4 w-4' />
              <span className='text-sm font-medium'>목록으로</span>
            </Link>
          </Button>
        </div>

        {/* 🚀 [특정 컴포넌트 1] 프로젝트 메인 헤더 */}
        <section className='space-y-8'>
          <div className='relative aspect-[21/9] w-full overflow-hidden rounded-3xl border shadow-2xl'>
            <AppImage
              src={project.thumbnail}
              alt={project.title}
              fill
              className='object-cover'
              priority
            />
          </div>

          <div className='space-y-6'>
            <div className='flex flex-wrap items-center gap-3'>
              <Badge
                variant={STATUS_LABELS[project.status].variant}
                className='px-3 py-1 text-xs font-bold'
              >
                {STATUS_LABELS[project.status].label}
              </Badge>
              {project.isFeatured && (
                <Badge className='border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600'>
                  Featured
                </Badge>
              )}
            </div>

            <H1Typography className='text-start text-4xl font-black lg:text-5xl'>
              {project.title}
            </H1Typography>

            <p className='text-muted-foreground max-w-[800px] text-lg leading-relaxed'>
              {project.description}
            </p>

            {/* 🚀 [특정 컴포넌트 2] 액션 버튼 그룹 (Live, Github) */}
            <div className='flex flex-wrap gap-4 pt-2'>
              {project.liveUrl && (
                <Button
                  asChild
                  size='lg'
                  className='rounded-full px-8 font-bold shadow-lg transition-transform hover:-translate-y-1'
                >
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Globe className='mr-2 h-5 w-5' /> 라이브 데모
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='rounded-full px-8 font-bold transition-transform hover:-translate-y-1'
                >
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github className='mr-2 h-5 w-5' /> GitHub 저장소
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* 🚀 [특정 컴포넌트 3] 프로젝트 요약 정보 카드 (Info Grid) */}
        <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='bg-muted/30 flex items-start gap-4 rounded-2xl border p-6'>
            <Calendar className='text-primary mt-1 h-5 w-5' />
            <div>
              <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                진행 기간
              </p>
              <p className='mt-1 font-mono font-medium'>{project.period}</p>
            </div>
          </div>
          <div className='bg-muted/30 flex items-start gap-4 rounded-2xl border p-6'>
            <Hammer className='text-primary mt-1 h-5 w-5' />
            <div>
              <p className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                핵심 기술
              </p>
              <div className='mt-2 flex flex-wrap gap-1.5'>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className='bg-background/80 rounded-md border px-2 py-0.5 text-[11px] font-bold'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className='border-border/50' />

        {/* MDX 본문 영역 */}
        <article className='prose dark:prose-invert prose-lg max-w-none'>
          <DocsBody>
            <MDXRemote
              source={project.content}
              components={getMDXComponents()}
              options={{
                mdxOptions: {
                  format: 'md',
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeRaw,
                    [
                      rehypePrettyCode,
                      {
                        theme: { dark: 'one-dark-pro', light: 'github-light' },
                        keepBackground: true,
                        showLineNumbers: true,
                      },
                    ],
                    rehypeSlug,
                  ],
                },
              }}
            />
          </DocsBody>
        </article>
      </div>
    </AppLayout>
  );
}
