'use client';

import React, { forwardRef, useRef } from 'react';

import {
  Cpu,
  Database,
  GitBranch,
  Layers,
  Layout,
  Terminal,
  Zap,
} from 'lucide-react';

import { AnimatedBeam } from '@/components/ui/animated-beam';
import { BlurFade } from '@/components/ui/blur-fade';
import { Highlighter } from '@/components/ui/highlighter';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { H2Typography, PTypography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; tooltip: string }
>(({ className, children, tooltip }, ref) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={ref}
            className={cn(
              'bg-background hover:border-primary z-10 flex size-12 cursor-help items-center justify-center rounded-full border-2 p-3 shadow-lg transition-all hover:scale-110 md:size-14',
              className,
            )}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side='top'
          className='bg-popover text-popover-foreground border px-3 py-1.5 text-xs font-medium'
        >
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

Circle.displayName = 'Circle';

export function SkillsetSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  const PRIMARY_HEX = '#10b981';

  return (
    <section id='skills' className='scroll-mt-32'>
      <BlurFade delay={0.5} inView>
        <div className='space-y-12'>
          <div className='space-y-2 text-center md:text-left'>
            <H2Typography className='border-none pb-0'>
              🛠️ Engineering Stack
            </H2Typography>
            <PTypography className='text-muted-foreground mt-0 max-w-3xl break-keep'>
              도구의 나열보다{' '}
              <span className='inline-block'>
                <Highlighter
                  action='underline'
                  color={PRIMARY_HEX}
                  strokeWidth={2}
                  animationDuration={1000}
                >
                  <span className='text-foreground font-bold'>
                    각 기술의 유기적인 결합을 통해 얻는 실무적 임팩트
                  </span>
                </Highlighter>
              </span>
              에 집중합니다.
            </PTypography>
          </div>

          <div
            className='bg-muted/5 relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-3xl border p-10 md:h-[420px]'
            ref={containerRef}
          >
            <div className='flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10'>
              <div className='flex flex-row items-center justify-between'>
                {/* 🛡️ Stability Group: 표준과 협업 */}
                <Circle
                  ref={div1Ref}
                  tooltip='Lint/Prettier 등 자동화된 개발 표준 수립'
                >
                  <Terminal className='text-primary size-6' />
                </Circle>
                {/* 🚀 Performance Group: 대용량 데이터 대응 */}
                <Circle
                  ref={div5Ref}
                  tooltip='대규모 트래픽 및 데이터 연동 최적화'
                >
                  <Database className='size-6 text-blue-500' />
                </Circle>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <Circle
                  ref={div2Ref}
                  tooltip='디자인 시스템 구축을 통한 UI 일관성 확보'
                >
                  <Layout className='size-6 text-emerald-500' />
                </Circle>
                {/* ⚡ Core Hub: 통합과 해결 */}
                <Circle
                  ref={div4Ref}
                  tooltip='비즈니스 요구사항 통합 및 아키텍처 설계'
                  className='border-primary shadow-primary/20 bg-primary/5 size-16 border-4'
                >
                  <Zap className='text-primary size-8 animate-pulse' />
                </Circle>
                <Circle
                  ref={div6Ref}
                  tooltip='Next.js 기반 고성능 렌더링 최적화'
                >
                  <Cpu className='size-6 text-orange-500' />
                </Circle>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <Circle
                  ref={div3Ref}
                  tooltip='GitFlow 기반의 안정적인 릴리즈 관리'
                >
                  <GitBranch className='size-6 text-red-500' />
                </Circle>
                <Circle
                  ref={div7Ref}
                  tooltip='IBSheet 등 엔터프라이즈 그리드 커스텀 및 타입화'
                >
                  <Layers className='size-6 text-cyan-500' />
                </Circle>
              </div>
            </div>

            {/* Beams: 흐름의 논리를 부여 */}
            {[div1Ref, div2Ref, div3Ref].map((ref, idx) => (
              <AnimatedBeam
                key={idx}
                containerRef={containerRef}
                fromRef={ref}
                toRef={div4Ref}
                duration={4}
                gradientStartColor={PRIMARY_HEX}
              />
            ))}
            {[div5Ref, div6Ref, div7Ref].map((ref, idx) => (
              <AnimatedBeam
                key={idx}
                containerRef={containerRef}
                fromRef={ref}
                toRef={div4Ref}
                duration={4}
                reverse
                gradientStartColor='#3b82f6'
              />
            ))}
          </div>

          {/* 🚀 실속 있는 기술 요약 그리드 */}
          <div className='grid grid-cols-1 gap-8 px-2 sm:grid-cols-2 md:grid-cols-4'>
            <div className='border-primary/30 space-y-3 border-l-2 pl-5'>
              <p className='text-primary text-[11px] font-black tracking-widest uppercase'>
                Stability
              </p>
              <p className='text-foreground/80 text-sm leading-snug font-medium break-keep'>
                TypeScript 기반의{' '}
                <span className='text-foreground font-bold'>
                  강력한 타입 안전성
                </span>
                으로 런타임 에러 최소화
              </p>
            </div>
            <div className='space-y-3 border-l-2 border-blue-500/30 pl-5'>
              <p className='text-[11px] font-black tracking-widest text-blue-500 uppercase'>
                Scalability
              </p>
              <p className='text-foreground/80 text-sm leading-snug font-medium break-keep'>
                대용량 데이터 그리드 최적화를 통한{' '}
                <span className='text-foreground font-bold'>
                  엔터프라이즈 비즈니스 대응
                </span>
              </p>
            </div>
            <div className='space-y-3 border-l-2 border-emerald-500/30 pl-5'>
              <p className='text-[11px] font-black tracking-widest text-emerald-500 uppercase'>
                Consistency
              </p>
              <p className='text-foreground/80 text-sm leading-snug font-medium break-keep'>
                Shadcn/Tailwind 기반{' '}
                <span className='text-foreground font-bold'>
                  디자인 시스템 구축
                </span>{' '}
                및 개발 경험 개선
              </p>
            </div>
            <div className='space-y-3 border-l-2 border-red-500/30 pl-5'>
              <p className='text-[11px] font-black tracking-widest text-red-500 uppercase'>
                Reliability
              </p>
              <p className='text-foreground/80 text-sm leading-snug font-medium break-keep'>
                GitFlow와 기술 컨벤션을 통한{' '}
                <span className='text-foreground font-bold'>
                  안정적인 릴리즈 프로세스
                </span>{' '}
                확보
              </p>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
