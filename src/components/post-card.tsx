import Link from 'next/link';

import { Post } from '@prisma/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

        <CardHeader>
          <CardTitle className='group-hover:text-primary text-xl leading-tight font-bold tracking-tight transition-colors'>
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <time className='text-muted-foreground/60 block font-mono text-xs font-medium tracking-widest uppercase'>
            {date}
          </time>
        </CardContent>
      </Card>
    </Link>
  );
}
