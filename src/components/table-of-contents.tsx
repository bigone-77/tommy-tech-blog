'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const visibleHeadings = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleHeadings.current.set(entry.target.id, entry.isIntersecting);
        });

        const firstVisibleHeading = headings.find((h) =>
          visibleHeadings.current.get(h.id),
        );

        if (firstVisibleHeading) {
          setActiveId(firstVisibleHeading.id);
        }
      },
      {
        rootMargin: '-85px 0% -80% 0%',
        threshold: 0,
      },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // TableOfContents.tsx 내부 handleClick 함수

  const handleClick = (id: string) => {
    const element = document.getElementById(id);

    if (!element) {
      console.warn(`ID를 찾을 수 없습니다: ${id}`); // 🚀 디버깅용 로그
      return;
    }

    // 🚀 window.pageYOffset을 사용하는 것이 더 정확합니다.
    const offset = 100; // 헤더 높이에 맞춰 조정하세요.
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    window.history.pushState({}, '', `#${id}`);
  };

  if (headings.length === 0) return null;

  return (
    <nav className={cn('text-sm', className)}>
      <ul className='border-border/30 space-y-0.5 border-l'>
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => handleClick(heading.id)}
              style={{
                paddingLeft: `${(heading.level - 1) * 0.75 + 1}rem`,
              }}
              className={cn(
                'hover:text-foreground block w-full border-l-2 border-transparent py-1 text-left transition-all duration-200',
                'text-[13px] leading-tight wrap-break-word whitespace-normal',
                activeId === heading.id
                  ? 'border-primary text-primary bg-primary/5 font-medium'
                  : 'text-muted-foreground/60 hover:border-border/60',
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
