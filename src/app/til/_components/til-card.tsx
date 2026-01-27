import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TilCardProps {
  id: string;
  date: string;
  title: string;
  tags: string[];
  className?: string;
}

export function TilCard({ id, date, title, tags, className }: TilCardProps) {
  return (
    <div className={cn('relative', className)}>
      {/* 🚀 타임라인 노드: 이전 스크린샷의 인디고 포인트를 유지합니다. */}
      <div className='border-primary bg-background absolute top-1.5 -left-[41px] h-4 w-4 rounded-full border-2 shadow-[0_0_8px_rgba(var(--primary),0.4)]' />

      <div className='group space-y-3 transition-all'>
        {/* 날짜 표시 */}
        <time className='text-muted-foreground font-mono text-sm'>{date}</time>

        {/* 제목 및 링크 */}
        <Link href={`/til/${id}`} className='block space-y-3'>
          <h3 className='group-hover:text-primary text-xl leading-snug font-bold tracking-tight transition-colors'>
            {title}
          </h3>

          {/* 태그 리스트 */}
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant='secondary'
                className='bg-secondary/50 hover:bg-secondary rounded-md px-2 py-0.5 text-[11px] font-semibold transition-colors'
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
}
