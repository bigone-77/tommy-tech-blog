import { ReactNode } from 'react';

interface ContentLayoutProps {
  children: ReactNode;
  aside?: ReactNode;
}

export function AppLayout({ children, aside }: ContentLayoutProps) {
  return (
    <div className='mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8'>
      <div className='lg:divide-border flex flex-col lg:flex-row lg:divide-x'>
        <article className='@container/post min-w-0 flex-1 py-12 lg:pr-12'>
          {children}
        </article>

        {/* 사이드바 영역: aside가 있을 때만 렌더링 */}
        {aside && (
          <aside className='hidden w-full lg:block lg:max-w-[270px] lg:flex-shrink-0 lg:pl-12'>
            <div className='sticky top-24 py-12'>{aside}</div>
          </aside>
        )}
      </div>
    </div>
  );
}
