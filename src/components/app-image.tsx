'use client';

import { useState } from 'react';

import Image, { ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

import { RetroGrid } from './ui/retro-grid';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
}

export function AppImage({
  src,
  alt,
  className,
  fill,
  ...props
}: SafeImageProps) {
  const [isError, setIsError] = useState(false);
  const showFallback = !src || isError;

  const isOptimizedDomain =
    src?.startsWith('/') || src?.includes('res.cloudinary.com');

  return (
    <div
      className={cn(
        'bg-muted/30 relative flex h-full w-full items-center justify-center overflow-hidden',
        className,
      )}
    >
      {showFallback ? (
        <div className='relative flex h-full w-full items-center justify-center'>
          <RetroGrid />
          <div className='z-10 flex flex-col items-center gap-2 opacity-20'>
            <div className='bg-foreground/50 h-px w-12' />
            <span className='text-[10px] font-black tracking-[0.2em] uppercase'>
              No Image
            </span>
            <div className='bg-foreground/50 h-px w-12' />
          </div>
        </div>
      ) : (
        <Image
          {...props}
          src={src}
          alt={alt || 'post thumbnail'}
          fill={fill}
          unoptimized={!isOptimizedDomain}
          decoding='async'
          className={cn(
            'object-contain duration-500 ease-in-out',
            'group-hover:scale-105',
          )}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  );
}
