import { endOfDay, startOfDay } from 'date-fns';

import { getClient } from '@/lib/apollo-client';
import { getFormattedDate } from '@/lib/utils';

import { GET_DAILY_TILS } from '../page.queries';
import { TilCard } from './til-card';

export async function TilCardList({ selectedDate }: { selectedDate: Date }) {
  const from = startOfDay(selectedDate);
  const to = endOfDay(selectedDate);

  const { data } = await getClient().query({
    query: GET_DAILY_TILS,
    variables: {
      fromDate: from.toISOString(),
      toDate: to.toISOString(),
    },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const tils = data?.allTils ?? [];

  return (
    <div className='relative ml-4 py-4'>
      {tils.length > 0 ? (
        <div className='border-border/40 space-y-16 border-l-2 pl-10'>
          {tils.map((til: any) => (
            <TilCard
              key={til.id}
              id={til.id}
              title={til.title}
              tags={til.tags}
              content={til.content}
              date={getFormattedDate(
                new Date(Number(til.createdAt)),
                'yyyy. MM. dd',
              )}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-40 text-center'>
          <div className='bg-muted/20 mb-6 flex h-20 w-20 items-center justify-center rounded-full'>
            <p className='animate-bounce text-4xl opacity-50'>🍃</p>
          </div>
          <p className='text-muted-foreground/60 text-lg font-medium tracking-tight italic'>
            이날의 기록은 아직 비어있습니다.
          </p>
          <p className='text-muted-foreground/30 mt-2 text-sm'>
            새로운 지식을 채워보시는 건 어떨까요?
          </p>
        </div>
      )}
    </div>
  );
}
