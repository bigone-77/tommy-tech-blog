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
    <div className='border-border/40 relative ml-4 space-y-16 border-l-2 py-4 pl-10'>
      {tils.length > 0 ? (
        tils.map((til: any) => (
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
        ))
      ) : (
        <div className='text-muted-foreground/50 py-32 text-center'>
          <p className='mb-4 text-4xl'>🍃</p>
          <p className='font-medium italic'>이날의 기록은 아직 비어있습니다.</p>
        </div>
      )}
    </div>
  );
}
