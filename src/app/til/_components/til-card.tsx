import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TilCardProps {
  id: string;
  date: string;
  title: string;
  tags: string[];
  content: string;
  className?: string;
}

export function TilCard({
  id,
  date,
  title,
  tags,
  content = '',
  className,
}: TilCardProps) {
  const excerpt = content
    ? content
        .replace(/[#*`_]/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .slice(0, 160) + (content.length > 160 ? '...' : '')
    : '';

  return (
    <div className={cn('group relative', className)}>
      <div className='absolute top-2 -left-[43px] z-10'>
        <div className='bg-background border-primary h-5 w-5 rounded-full border-4 shadow-[0_0_10px_rgba(var(--primary),0.3)] transition-transform duration-300 group-hover:scale-125' />
      </div>

      <div className='space-y-3'>
        <div className='flex items-center gap-3'>
          <time className='text-muted-foreground font-mono text-sm font-medium'>
            {date}
          </time>
        </div>

        <Link href={`/til/${id}`} className='group/link block'>
          <h3 className='group-hover/link:text-primary mb-2 text-2xl font-black tracking-tight transition-colors'>
            {title}
          </h3>

          {excerpt && (
            <p className='text-muted-foreground/80 mb-4 line-clamp-2 text-base leading-relaxed'>
              {excerpt}
            </p>
          )}

          <div className='flex items-center justify-between'>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='bg-secondary/40 hover:bg-secondary rounded-md px-2 py-0.5 text-[11px] font-bold transition-colors'
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className='text-primary flex -translate-x-2 items-center gap-1 text-sm font-bold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100'>
              기록 보기 <ArrowRight className='h-4 w-4' />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
