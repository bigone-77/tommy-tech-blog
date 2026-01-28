import Link from 'next/link';

import { Project } from '@prisma/client';
import { ArrowUpRight, Calendar, Github, Globe } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props extends Pick<
  Project,
  | 'id'
  | 'title'
  | 'thumbnail'
  | 'description'
  | 'techHighlights'
  | 'techStack'
  | 'period'
  | 'githubUrl'
  | 'liveUrl'
> {
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
  githubUrl,
  liveUrl,
  className,
}: Props) {
  return (
    <div className={cn('group relative h-full', className)}>
      <Link
        href={`/projects/${id}`}
        className='absolute inset-0 z-0'
        aria-label={`${title} 상세 보기`}
      />

      <Card className='hover:border-primary/40 pointer-events-none relative flex h-full flex-col overflow-hidden py-0 transition-all duration-300 group-hover:shadow-lg'>
        <div className='bg-muted relative aspect-video w-full overflow-hidden border-b'>
          <AppImage
            src={thumbnail}
            alt={title}
            fill
            className='transition-transform duration-500 group-hover:scale-105'
          />
        </div>

        <CardHeader className='flex-1 gap-2 pb-4'>
          <div className='flex items-start justify-between gap-2'>
            <CardTitle className='group-hover:text-primary line-clamp-1 text-lg leading-snug font-bold tracking-tight transition-colors'>
              {title}
            </CardTitle>
            <ArrowUpRight className='text-muted-foreground/30 group-hover:text-primary h-4 w-4 shrink-0 transition-colors' />
          </div>

          <p className='text-muted-foreground/80 line-clamp-2 text-xs leading-relaxed'>
            {description}
          </p>

          <div className='mt-1 flex flex-wrap gap-1.5'>
            {techStack.slice(0, 3).map((tech) => (
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
                className='bg-primary/5 text-primary/70 border-primary/10 rounded border px-1.5 py-0.5 text-[9px] font-medium'
              >
                {highlight}
              </span>
            ))}
          </div>
        </CardHeader>

        <CardContent className='border-t px-5 pt-4 pb-4'>
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
