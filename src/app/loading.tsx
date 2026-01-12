import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main className='mx-auto max-w-5xl space-y-12 p-10'>
      {/* 헤더 스켈레톤 */}
      <div className='flex items-end justify-between border-b pb-8'>
        <div className='space-y-2'>
          <Skeleton className='h-10 w-64' />
          <Skeleton className='h-6 w-48' />
        </div>
        <Skeleton className='h-9 w-24' />
      </div>

      {/* 카드 리스트 스켈레톤 */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='space-y-4 rounded-xl border p-6'>
            <Skeleton className='h-8 w-3/4' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
            </div>
            <div className='flex gap-4 pt-4'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-20' />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
