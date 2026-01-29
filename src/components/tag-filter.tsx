'use client';

import { useEffect, useState, useTransition } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Check, ChevronDown, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

interface Props {
  tags: string[];
  selectedTag: string;
  tagCounts?: Record<string, number>;
  paramName?: string;
  label?: string;
}

export function TagFilter({
  tags,
  selectedTag,
  tagCounts,
  paramName = 'tag',
  label = '태그',
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [clickedTag, setClickedTag] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending) setClickedTag(null);
  }, [isPending]);

  const handleTagClick = (tag: string) => {
    setClickedTag(tag);
    setIsOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    if (tag !== 'All') {
      params.set(paramName, tag);
    } else {
      params.delete(paramName);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <>
      {/* 💻 데스크톱 뷰 */}
      <div
        className={cn(
          'hidden flex-wrap gap-2 transition-opacity md:flex',
          isPending && 'opacity-60',
        )}
      >
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <Button
              key={tag}
              variant='outline'
              disabled={isPending}
              onClick={() => handleTagClick(tag)}
              className={cn(
                'h-8 rounded-md border px-3 text-xs font-medium transition-all',
                isActive
                  ? 'bg-foreground text-background border-transparent dark:bg-zinc-100 dark:text-zinc-900' // 🚀 다크 모드 활성 고대비 적용
                  : 'text-muted-foreground border-border hover:bg-accent hover:text-foreground bg-transparent dark:border-white/20 dark:text-zinc-400', // 🚀 다크 모드 비활성 명도 조정
              )}
            >
              {isPending && clickedTag === tag && (
                <Loader2 className='mr-1.5 h-3.5 w-3.5 animate-spin' />
              )}
              <span>{tag === 'All' ? '전체' : tag}</span>
              {tagCounts?.[tag] && (
                <span
                  className={cn(
                    'ml-1.5 font-mono text-[10px]',
                    isActive
                      ? 'opacity-70'
                      : 'text-muted-foreground/50 dark:text-zinc-500',
                  )}
                >
                  {tagCounts[tag]}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* 📱 모바일 드로어 뷰 */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            variant='outline'
            className='flex h-10 w-full items-center justify-between rounded-md px-3 shadow-none md:hidden dark:border-white/20'
          >
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-muted-foreground font-medium'>
                {label}:
              </span>
              <span
                className={cn(
                  'font-semibold',
                  isPending ? 'opacity-50' : 'text-foreground',
                )}
              >
                {selectedTag === 'All' ? '전체' : selectedTag}
              </span>
            </div>
            {isPending ? (
              <Loader2 className='h-4 w-4 animate-spin opacity-50' />
            ) : (
              <ChevronDown className='h-4 w-4 opacity-30' />
            )}
          </Button>
        </DrawerTrigger>

        <DrawerContent className='dark:border-white/10 dark:bg-zinc-950'>
          <div className='mx-auto w-full max-w-md'>
            <DrawerHeader className='px-6 pt-6 pb-2 text-left'>
              <DrawerTitle className='text-lg font-bold dark:text-zinc-100'>
                {label} 선택
              </DrawerTitle>
              <DrawerDescription className='text-xs dark:text-zinc-500'>
                필터링할 {label}를 선택하세요.
              </DrawerDescription>
            </DrawerHeader>
            <div className='max-h-[50vh] overflow-y-auto px-2 pt-2 pb-8'>
              <div className='grid gap-0.5'>
                {tags.map((tag) => {
                  const isActive = selectedTag === tag;
                  return (
                    <Button
                      key={tag}
                      variant='ghost'
                      onClick={() => handleTagClick(tag)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-md px-4 py-6 text-sm',
                        isActive
                          ? 'bg-accent text-accent-foreground font-bold dark:bg-zinc-800'
                          : 'text-muted-foreground/80 dark:text-zinc-400 hover:dark:bg-zinc-900',
                      )}
                    >
                      <div className='flex items-center gap-3'>
                        <div
                          className={cn(
                            'flex size-4 items-center justify-center rounded-sm border transition-colors',
                            isActive
                              ? 'bg-foreground border-foreground dark:border-zinc-100 dark:bg-zinc-100'
                              : 'border-muted-foreground/30 dark:border-white/20',
                          )}
                        >
                          {isActive && (
                            <Check className='text-background h-3 w-3 dark:text-zinc-900' />
                          )}
                        </div>
                        <span>{tag === 'All' ? '전체' : tag}</span>
                      </div>
                      {tagCounts?.[tag] && (
                        <span className='font-mono text-[11px] opacity-40 dark:text-zinc-500'>
                          {tagCounts[tag]}
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
