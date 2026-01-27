import { endOfDay, startOfDay } from 'date-fns';

import { getClient } from '@/lib/apollo-client';
import { getFormattedDate } from '@/lib/utils';

import { GET_DAILY_TILS } from '../page.queries';
import { TilCard } from './til-card';

export async function TilCardList({ selectedDate }: { selectedDate: Date }) {
  const { data } = await getClient().query({
    query: GET_DAILY_TILS,
    variables: {
      fromDate: getFormattedDate(
        startOfDay(selectedDate),
        "yyyy-MM-dd'T'HH:mm:ss'Z'",
      ),
      toDate: getFormattedDate(
        endOfDay(selectedDate),
        "yyyy-MM-dd'T'HH:mm:ss'Z'",
      ),
    },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const tils = data?.allTils ?? [];

  return (
    <div className='border-muted relative ml-4 space-y-12 border-l-2 pl-8'>
      {tils.length > 0 ? (
        tils.map((til: any) => (
          <TilCard
            key={til.id}
            id={til.id}
            title={til.title}
            tags={til.tags}
            date={getFormattedDate(
              new Date(Number(til.createdAt)),
              'yyyy. MM. dd',
            )}
          />
        ))
      ) : (
        <div className='text-muted-foreground py-20 text-center italic'>
          기록이 없습니다. 🍃
        </div>
      )}
    </div>
  );
}
