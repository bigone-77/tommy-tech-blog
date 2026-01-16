'use client';

import { useEffect, useState, useTransition } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { ChevronDown, Loader2 } from 'lucide-react';

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

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  tagCounts?: Record<string, number>;
}

export function TagFilter({ tags, selectedTag, tagCounts }: TagFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const [clickedTag, setClickedTag] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending) {
      setClickedTag(null);
    }
  }, [isPending]);

  const handleTagClick = (tag: string) => {
    setClickedTag(tag);
    setIsOpen(false);

    const params = new URLSearchParams();
    if (tag !== 'All') params.set('tag', tag);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <>
      <div
        className={cn(
          'hidden flex-wrap gap-2 transition-opacity md:flex',
          isPending && 'opacity-60',
        )}
      >
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          const isCurrentlyLoading = isPending && clickedTag === tag;

          return (
            <Button
              key={tag}
              variant='outline'
              size='sm'
              disabled={isPending}
              onClick={() => handleTagClick(tag)}
              className={cn(
                'relative h-9 rounded-full border px-4 text-xs font-medium transition-all',
                isActive
                  ? '!bg-foreground !text-background border-transparent'
                  : 'text-muted-foreground border-border hover:bg-accent hover:text-foreground bg-transparent',
              )}
            >
              {isCurrentlyLoading && (
                <Loader2 className='mr-2 h-3 w-3 animate-spin' />
              )}

              <span className='relative z-10 !text-inherit'>{tag}</span>

              {tagCounts?.[tag] && (
                <span
                  className={cn(
                    'ml-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 font-mono text-[10px] transition-colors',
                    isActive
                      ? 'bg-background text-foreground'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {tagCounts[tag]}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            variant='outline'
            className='flex h-10 w-full items-center justify-between px-4 md:hidden'
          >
            <span className='text-sm font-medium'>
              Category:
              <span
                className={cn(
                  'ml-1 capitalize',
                  isPending ? 'text-muted-foreground' : 'text-primary',
                )}
              >
                {isPending && clickedTag
                  ? `Loading ${clickedTag}...`
                  : selectedTag}
              </span>
            </span>
            {isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <ChevronDown className='h-4 w-4 opacity-50' />
            )}
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader className='text-left'>
              <DrawerTitle>Select Category</DrawerTitle>
              <DrawerDescription>정원을 분류별로 살펴보세요.</DrawerDescription>
            </DrawerHeader>
            <div className='grid gap-1 px-4 pt-2 pb-8'>
              {tags.map((tag) => {
                const isActive = selectedTag === tag;
                const isCurrentlyLoading = isPending && clickedTag === tag;
                return (
                  <Button
                    key={tag}
                    variant='ghost'
                    onClick={() => handleTagClick(tag)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-3 py-6 text-sm transition-all',
                      isActive
                        ? '!bg-foreground !text-background font-bold'
                        : 'text-muted-foreground',
                    )}
                  >
                    <div className='flex items-center'>
                      {isCurrentlyLoading && (
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      )}
                      <span className='!text-inherit'>{tag}</span>
                    </div>
                    {tagCounts?.[tag] && (
                      <span
                        className={cn(
                          'flex h-6 min-w-6 items-center justify-center rounded-md border font-mono text-[10px]',
                          isActive
                            ? 'bg-background text-foreground'
                            : 'border-border',
                        )}
                      >
                        {tagCounts[tag]}
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
