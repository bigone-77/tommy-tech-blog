import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function ProjectCardSkeleton({ isFeatured }: { isFeatured?: boolean }) {
  return (
    <Card
      className={cn(
        'relative flex h-full flex-col overflow-hidden border-none bg-transparent shadow-none',
        isFeatured
          ? 'md:col-span-3 lg:col-span-6'
          : 'md:col-span-2 lg:col-span-5',
      )}
    >
      <div
        className={cn(
          'bg-muted/50 relative w-full overflow-hidden rounded-2xl border',
          isFeatured ? 'aspect-[2.2/1]' : 'aspect-[16/10]',
        )}
      >
        <Skeleton className='h-full w-full' />
      </div>

      <CardHeader
        className={cn('gap-2 px-0 pb-3', isFeatured ? 'pt-6' : 'pt-4')}
      >
        <div className='flex items-center justify-between'>
          <Skeleton className='h-7 w-2/3' />
          <Skeleton className='h-5 w-5 rounded-md' />
        </div>
        <Skeleton className='h-4 w-full' />
      </CardHeader>

      <CardContent className='mt-auto space-y-4 px-0 pb-4'>
        <div className='flex gap-1.5'>
          <Skeleton className='h-5 w-12 rounded-md' />
          <Skeleton className='h-5 w-16 rounded-md' />
        </div>
        <div className='flex items-center justify-between border-t pt-3'>
          <Skeleton className='h-4 w-24' />
          <div className='flex gap-2'>
            <Skeleton className='h-5 w-5 rounded-full' />
            <Skeleton className='h-5 w-5 rounded-full' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectGridSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='flex flex-wrap gap-2'>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className='h-8 w-20 rounded-full' />
        ))}
      </div>

      <div className='grid grid-flow-row-dense grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-5 lg:grid-cols-[repeat(11,minmax(0,1fr))]'>
        <ProjectCardSkeleton isFeatured />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton isFeatured />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </div>
  );
}
