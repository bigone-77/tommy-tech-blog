import Link from 'next/link';

import { Post } from '@prisma/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { AppImage } from './app-image';

interface Props extends Pick<Post, 'title' | 'thumbnail'> {
  url: string;
  date: string;
}

export function PostCard({ url, title, date, thumbnail }: Props) {
  return (
    <Link href={url} className='group block h-full'>
      <Card className='hover:border-primary/40 flex h-full flex-col overflow-hidden py-0 transition-all duration-300 hover:shadow-md'>
        <div className='bg-muted relative aspect-video w-full overflow-hidden border-b'>
          <AppImage
            src={thumbnail}
            alt={title}
            fill
            className='transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>

        <CardHeader className='flex-1'>
          <CardTitle
            className={cn(
              'group-hover:text-primary text-lg leading-snug font-bold tracking-tight transition-colors',
              'line-clamp-2',
            )}
          >
            {title}
          </CardTitle>
        </CardHeader>

        {/* 3. 푸터 영역: mt-auto로 항상 카드 바닥에 밀착 */}
        <CardContent className='px-5 pt-0 pb-5'>
          <time className='text-muted-foreground block font-mono text-[10px] font-medium tracking-widest uppercase'>
            {date}
          </time>
        </CardContent>
      </Card>
    </Link>
  );
}
