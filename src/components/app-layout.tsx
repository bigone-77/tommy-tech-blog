import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ContentLayoutProps {
  className?: string;
  children: ReactNode;
  aside?: ReactNode;
}

export function AppLayout({ className, children, aside }: ContentLayoutProps) {
  return (
    <div className='mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
      <div className='lg:divide-border flex flex-col lg:flex-row lg:divide-x'>
        <article
          className={cn(
            '@container/post min-w-0 flex-1 pt-12 pb-20 lg:pr-12',
            className,
          )}
        >
          {children}
        </article>

        {/* 사이드바 영역: aside가 있을 때만 렌더링 */}
        {aside && (
          <aside className='hidden w-full lg:block lg:max-w-[270px] lg:flex-shrink-0 lg:pl-12'>
            {/* 사이드바도 본문과 높이를 맞추기 위해 pb-20을 적용하는 것이 깔끔합니다. */}
            <div className='sticky top-24 pt-12 pb-20'>{aside}</div>
          </aside>
        )}
      </div>
    </div>
  );
}
