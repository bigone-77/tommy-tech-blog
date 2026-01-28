import Link from 'next/link';

import { Project, ProjectStatus } from '@prisma/client';
// 🚀 ProjectStatus 임포트
import { ArrowUpRight, Calendar, Github, Globe } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const STATUS_CONFIG = {
  [ProjectStatus.LIVE]: {
    label: '운영중',
    class: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  [ProjectStatus.DEVELOPING]: {
    label: '개발중',
    class: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  },
  [ProjectStatus.ARCHIVED]: {
    label: '보관됨',
    class: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
  },
};

interface Props extends Pick<
  Project,
  | 'id'
  | 'title'
  | 'thumbnail'
  | 'description'
  | 'techHighlights'
  | 'techStack'
  | 'period'
  | 'status'
  | 'githubUrl'
  | 'liveUrl'
> {
  isFeatured?: boolean;
  className?: string;
}

export function ProjectCard({
  id,
  title,
  description,
  thumbnail,
  techHighlights,
  techStack,
  period,
  status, // 🚀 status 구조 분해 할당
  githubUrl,
  liveUrl,
  isFeatured,
  className,
}: Props) {
  const statusStyle = STATUS_CONFIG[status]; // 🚀 현재 상태에 맞는 스타일 매핑

  return (
    <div className={cn('group relative h-full', className)}>
      <Link
        href={`/project/${id}`}
        className='absolute inset-0 z-0'
        aria-label={`${title} 상세 보기`}
      />

      <Card className='hover:border-primary/40 pointer-events-none relative flex h-full flex-col overflow-hidden py-0 transition-all duration-300 group-hover:shadow-lg'>
        {/* 1. 썸네일 및 상태 뱃지 영역 */}
        <div
          className={cn(
            'bg-muted relative w-full overflow-hidden border-b transition-all',
            isFeatured ? 'aspect-[2.2/1]' : 'aspect-[16/10]',
          )}
        >
          <AppImage
            src={thumbnail}
            alt={title}
            fill
            className='transition-transform duration-500 group-hover:scale-105'
          />
          {/* 🚀 동적 상태 뱃지 배치 */}
          <div className='absolute top-3 left-3 z-10'>
            <span
              className={cn(
                'rounded-full border px-2.5 py-1 text-[10px] font-bold backdrop-blur-md',
                statusStyle.class,
              )}
            >
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* 2. 헤더 및 본문 (밀도 최적화 유지) */}
        <CardHeader
          className={cn(
            'flex-1 gap-2',
            isFeatured ? 'px-6 pt-6 pb-4' : 'px-4 pt-4 pb-3',
          )}
        >
          <div className='flex items-start justify-between gap-2'>
            <CardTitle
              className={cn(
                'group-hover:text-primary line-clamp-1 leading-snug font-bold tracking-tight transition-colors',
                isFeatured ? 'text-xl' : 'text-base',
              )}
            >
              {title}
            </CardTitle>
            <ArrowUpRight className='text-muted-foreground/30 group-hover:text-primary h-4 w-4 shrink-0 transition-colors' />
          </div>

          <p
            className={cn(
              'text-muted-foreground/80 leading-relaxed',
              isFeatured ? 'line-clamp-2 text-sm' : 'line-clamp-2 text-[13px]',
            )}
          >
            {description}
          </p>

          <div className='mt-1 flex flex-wrap gap-x-2 gap-y-1'>
            {techStack.slice(0, isFeatured ? 5 : 3).map((tech) => (
              <span
                key={tech}
                className='text-muted-foreground/60 text-[10px] font-medium'
              >
                #{tech}
              </span>
            ))}
          </div>

          <div className='mt-2 flex flex-wrap gap-1'>
            {techHighlights.slice(0, 2).map((highlight) => (
              <span
                key={highlight}
                className={cn(
                  'bg-primary/5 text-primary/70 border-primary/10 rounded border font-medium',
                  isFeatured
                    ? 'px-2 py-0.5 text-[10px]'
                    : 'px-1.5 py-0.5 text-[9px]',
                )}
              >
                {highlight}
              </span>
            ))}
          </div>
        </CardHeader>

        {/* 3. 푸터 영역 */}
        <CardContent
          className={cn(
            'mt-auto border-t',
            isFeatured ? 'px-6 py-4' : 'px-4 py-3',
          )}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1.5'>
              <Calendar size={12} className='text-muted-foreground/50' />
              <span className='text-muted-foreground/80 font-mono text-[10px] font-medium tracking-tight uppercase'>
                {period}
              </span>
            </div>

            <div className='pointer-events-auto relative z-10 flex items-center gap-3'>
              {githubUrl && (
                <a
                  href={githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground/40 hover:text-foreground p-1 transition-colors'
                >
                  <Github size={16} />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground/40 hover:text-primary p-1 transition-colors'
                >
                  <Globe size={16} />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
