export function TilChartSkeleton() {
  return <div className='bg-muted h-52 w-full animate-pulse rounded-xl' />;
}

export function TilCalendarSkeleton() {
  return <div className='bg-muted h-[400px] w-full animate-pulse rounded-xl' />;
}

export function TilDailySkeleton() {
  return (
    <div className='space-y-8'>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='bg-muted h-32 w-full animate-pulse rounded-xl'
        />
      ))}
    </div>
  );
}
