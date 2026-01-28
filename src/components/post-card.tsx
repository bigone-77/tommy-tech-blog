import Link from 'next/link';

import { Post } from '@prisma/client';
import { Clock, Eye } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { AppImage } from './app-image';

interface Props extends Pick<
  Post,
  'id' | 'title' | 'thumbnail' | 'viewCount' | 'tags' | 'readingTime'
> {
  url: string;
  date: string;
  excerpt?: string;
}

export function PostCard({
  url,
  title,
  date,
  thumbnail,
  viewCount,
  tags,
  excerpt,
  readingTime,
}: Props) {
  return (
    <Link href={url} className='group block h-full'>
      <Card className='hover:border-primary/40 relative flex h-full flex-col overflow-hidden py-0 transition-all duration-300 hover:shadow-lg'>
        <div className='bg-muted relative aspect-video w-full overflow-hidden border-b'>
          <AppImage
            src={thumbnail}
            alt={title}
            fill
            className='transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          {tags && tags.length > 0 && (
            <div className='absolute top-3 left-3 z-10'>
              <Badge
                variant='secondary'
                className='bg-background/60 text-[10px] backdrop-blur-md'
              >
                {tags[0]}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className='flex-1 gap-2 pb-4'>
          <CardTitle className='group-hover:text-primary line-clamp-2 text-lg leading-snug font-bold tracking-tight transition-colors'>
            {title}
          </CardTitle>

          {excerpt && (
            <p className='text-muted-foreground/80 line-clamp-3 text-xs leading-relaxed'>
              {excerpt}
            </p>
          )}
        </CardHeader>

        <CardContent className='border-t px-5 pt-4 pb-4'>
          <div className='flex items-center justify-between'>
            <time className='text-muted-foreground/80 block font-mono text-[10px] font-medium tracking-widest uppercase'>
              {date}
            </time>
            <div className='flex items-center gap-3'>
              <div className='text-muted-foreground/50 flex items-center gap-1 font-mono text-[10px]'>
                <Eye size={12} className='shrink-0' />
                <span>{(viewCount || 0).toLocaleString()}</span>
              </div>
              <div className='text-muted-foreground/50 flex items-center gap-1 font-mono text-[10px]'>
                <Clock size={12} className='shrink-0' />
                <span>{readingTime || 5}m</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
