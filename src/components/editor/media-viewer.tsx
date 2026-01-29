'use client';

import { useRef, useState } from 'react';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface MediaViewerProps {
  src: string;
  alt?: string;
  type?: 'image' | 'video';
  className?: string;
}

export function MediaViewer({
  src,
  alt = '',
  type = 'image',
  className,
}: MediaViewerProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🚀 1. 재생 상태 및 닫기 상태 관리
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const isInView = useInView(containerRef, { amount: 0.1 });

  // 🚀 2. PIP 노출 조건: 비디오 + 재생 중 + 화면 밖 + 닫지 않음
  const showPip = type === 'video' && isPlaying && !isInView && !isClosed;

  const renderMedia = (isPip = false) => {
    const commonProps = {
      src,
      className: cn(
        'w-full object-cover overflow-hidden aspect-video',
        isPip ? 'rounded-lg' : 'rounded-2xl border',
        className,
      ),
    };

    if (type === 'video') {
      return (
        <video
          {...commonProps}
          ref={isPip ? undefined : videoRef}
          controls={!isPip}
          // 🚀 사용자가 직접 재생하게 하려면 autoPlay를 끕니다.
          autoPlay={false}
          loop
          muted={isPip} // PIP 모드는 UX를 위해 음소거
          playsInline
          // 🚀 재생 상태 감지 이벤트 핸들러 추가
          onPlay={() => {
            setIsPlaying(true);
            setIsClosed(false); // 다시 재생하면 닫혔던 PIP 상태 초기화
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      );
    }
    return <img {...commonProps} alt={alt} />;
  };

  return (
    <span ref={containerRef} className='my-10 block w-full'>
      <span className='relative block aspect-video w-full'>
        {renderMedia()}
      </span>

      <AnimatePresence>
        {showPip && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={cn(
              'fixed right-6 bottom-6 z-50 w-72 md:w-80',
              'bg-background overflow-hidden rounded-xl border shadow-2xl backdrop-blur-md',
            )}
          >
            <span className='absolute top-2 right-2 z-10'>
              <button
                onClick={() => setIsClosed(true)}
                className='rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70'
              >
                <X size={14} />
              </button>
            </span>

            <span className='block p-1'>
              {/* PIP용 영상은 자동으로 이어 재생되도록 처리 */}
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className='aspect-video w-full rounded-lg object-cover'
              />
              <span className='block px-3 py-2'>
                <span className='text-muted-foreground block truncate text-[10px] font-bold tracking-widest uppercase'>
                  Live Demo
                </span>
                <span className='block truncate text-xs font-medium'>
                  {alt || '시연 영상 재생 중'}
                </span>
              </span>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function ImageViewer(props: Omit<MediaViewerProps, 'type'>) {
  return <MediaViewer {...props} type='image' />;
}

export function VideoViewer(props: Omit<MediaViewerProps, 'type'>) {
  return <MediaViewer {...props} type='video' />;
}
