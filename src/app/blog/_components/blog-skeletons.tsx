import { Skeleton } from '@/components/ui/skeleton';

export function TagFilterSkeleton() {
  return (
    <div className='flex flex-wrap gap-2 pt-4'>
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className='h-9 w-16 rounded-full' />
      ))}
    </div>
  );
}

// 포스트 카드 그리드 스켈레톤
export function PostGridSkeleton() {
  return (
    <div className='mt-12 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-12'>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className='space-y-4 rounded-2xl border p-6'>
          <Skeleton className='aspect-video w-full rounded-xl' />
          <Skeleton className='h-7 w-3/4' />
          <Skeleton className='h-4 w-full' />
        </div>
      ))}
    </div>
  );
}
