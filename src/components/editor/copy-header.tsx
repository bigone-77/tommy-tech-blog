'use client';

import React from 'react';

import { Link } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CopyHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: number;
  children: React.ReactNode;
  id?: string;
}

export function CopyHeader({
  level,
  children,
  className,
  id,
  ...props
}: CopyHeaderProps) {
  const safeId = id;

  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const copyToClipboard = async () => {
    if (!safeId) return;

    const url = `${window.location.origin}${window.location.pathname}#${safeId}`;
    window.history.pushState({}, '', `#${safeId}`);

    const element = document.getElementById(safeId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('URL 복사 실패:', err);
    }
  };

  const showCopyFunctionality = level === 1 || level === 2;

  return (
    <HeadingTag
      id={safeId}
      className={cn(
        'scroll-mt-24',
        showCopyFunctionality &&
          'group hover:text-muted-foreground relative flex cursor-pointer items-center gap-2 transition-colors duration-200',
        className,
      )}
      onClick={showCopyFunctionality ? copyToClipboard : undefined}
      title={showCopyFunctionality ? '섹션 링크 복사하기' : undefined}
      {...props}
    >
      {children}
      {showCopyFunctionality && (
        <Link className='h-4 w-4 flex-shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
      )}
    </HeadingTag>
  );
}
