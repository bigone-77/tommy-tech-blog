'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingElements = document.querySelectorAll('.prose h1, .prose h2');
    const headingsArray: Heading[] = [];

    headingElements.forEach((element) => {
      if (element.id) {
        headingsArray.push({
          id: element.id,
          text: element.textContent || '',
          level: parseInt(element.tagName.charAt(1)),
        });
      }
    });

    setHeadings(headingsArray);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -80% 0%', threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth',
      });
      window.history.pushState({}, '', `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <h4 className='text-foreground mb-4 text-sm font-semibold tracking-wider uppercase'>
        목차
      </h4>
      <nav>
        <ul className='space-y-2 border-l'>
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={cn(
                  'hover:text-foreground block border-l-2 border-transparent py-1 pl-4 text-left text-sm transition-colors',
                  activeId === heading.id
                    ? 'border-primary text-primary font-medium'
                    : 'text-muted-foreground',
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
