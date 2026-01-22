'use client';

import { useEffect, useState } from 'react';

import { Progress } from '@/components/ui/progress';

export function ReadProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // 현재 스크롤 위치 / (전체 문서 높이 - 뷰포트 높이) 계산
      const currentScroll = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        const scrollPercentage = (currentScroll / totalHeight) * 100;
        setProgress(scrollPercentage);
      }
    };

    window.addEventListener('scroll', updateProgress);
    // 렌더링 시 초기 위치 계산
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className='fixed top-0 left-0 z-[100] w-full'>
      {/* 🚀 shadcn Progress 컴포넌트 활용 */}
      <Progress
        value={progress}
        className='h-1 rounded-none bg-transparent' // 배경 투명하게, 두께는 얇게 설정
        // 인디케이터 색상을 브랜드 컬러에 맞게 조정하고 싶다면 ui/progress.tsx 파일의 클래스를 확인하세요.
      />
    </div>
  );
}
