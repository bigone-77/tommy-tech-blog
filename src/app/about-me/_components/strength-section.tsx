'use client';

import { useEffect, useState } from 'react';

import {
  ArrowRight,
  CheckCircle2,
  Code2,
  LayoutTemplate,
  Rocket,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Highlighter } from '@/components/ui/highlighter';
import { H2Typography, PTypography } from '@/components/ui/typography';

// 📱 화면 크기를 감지하는 커스텀 훅
function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => setValue(event.matches);
    const result = window.matchMedia(query);
    result.addEventListener('change', onChange);
    setValue(result.matches);
    return () => result.removeEventListener('change', onChange);
  }, [query]);
  return value;
}

// 📦 공통 상세 콘텐츠 레이아웃
function ContentInner({ s }: { s: any }) {
  return (
    <div className='space-y-8 py-6'>
      <div className='space-y-3'>
        <h4 className='text-foreground flex items-center gap-2 text-base font-bold'>
          <CheckCircle2 className='text-primary size-4' />
          The Challenge (문제 상황)
        </h4>
        <p className='text-muted-foreground border-muted border-l-2 pl-6 text-sm leading-relaxed break-keep'>
          {s.details.challenge}
        </p>
      </div>

      <div className='space-y-3'>
        <h4 className='text-foreground flex items-center gap-2 text-base font-bold'>
          <CheckCircle2 className='text-primary size-4' />
          The Approach (해결 과정)
        </h4>
        <p className='text-muted-foreground border-muted border-l-2 pl-6 text-sm leading-relaxed break-keep'>
          {s.details.approach}
        </p>
      </div>

      <div className='bg-primary/5 border-primary/10 space-y-3 rounded-2xl border p-5 shadow-inner'>
        <div className='flex items-center gap-2'>
          <Rocket className='text-primary size-4' />
          <h4 className='text-primary text-xs font-bold tracking-widest uppercase'>
            Result & Impact
          </h4>
        </div>
        <p className='text-foreground text-sm leading-relaxed font-semibold'>
          {s.details.result}
        </p>
      </div>
    </div>
  );
}

function StrengthCard({ s, i }: { s: any; i: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const Trigger = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='group border-border bg-card relative flex cursor-pointer flex-col gap-5 overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl'
    >
      <BorderBeam
        size={250}
        duration={isHovered ? 3 : 10}
        delay={i * 2}
        borderWidth={2}
      />
      <div className='flex items-center justify-between'>
        <div className='bg-muted group-hover:bg-primary/10 rounded-lg p-2.5 transition-colors'>
          {s.icon}
        </div>
        <Badge
          variant='outline'
          className='font-mono text-[10px] tracking-wider uppercase opacity-70'
        >
          {s.tag}
        </Badge>
      </div>
      <div className='space-y-3 text-left'>
        <h3 className='text-lg font-extrabold tracking-tight'>{s.title}</h3>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {s.description}
        </p>
      </div>
      <div className='mt-auto border-t border-dashed pt-4'>
        <div className='text-primary flex items-center justify-between'>
          <span className='text-[10px] font-bold tracking-widest uppercase'>
            Case Study Inside
          </span>
          <ArrowRight className='size-3 transition-transform group-hover:translate-x-1' />
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent className='max-h-[85vh] max-w-2xl overflow-y-auto'>
          <DialogHeader className='text-left'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='bg-primary/10 text-primary rounded-lg p-2'>
                {s.icon}
              </div>
              <Badge variant='secondary'>{s.tag}</Badge>
            </div>
            <DialogTitle className='text-2xl font-black'>{s.title}</DialogTitle>
          </DialogHeader>
          <ContentInner s={s} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
      <DrawerContent className='px-4'>
        <DrawerHeader className='px-0 text-left'>
          <div className='mb-2 flex items-center gap-3'>
            <div className='bg-primary/10 text-primary rounded-lg p-2'>
              {s.icon}
            </div>
            <Badge variant='secondary'>{s.tag}</Badge>
          </div>
          <DrawerTitle className='text-xl font-black'>{s.title}</DrawerTitle>
        </DrawerHeader>
        <div className='max-h-[60vh] overflow-y-auto px-1'>
          <ContentInner s={s} />
        </div>
        <DrawerFooter className='px-0 pt-4 pb-8'>
          <DrawerClose asChild>
            {/* 🚀 닫기 버튼: h-12와 rounded-xl로 모바일 터치 최적화 */}
            <Button
              variant='outline'
              className='h-12 w-full rounded-xl font-bold'
            >
              닫기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function StrengthSection() {
  const PRIMARY_HEX = '#10b981';
  const strengths = [
    {
      title: 'Maintainable Architecture',
      tag: 'Engineering',
      icon: <Code2 className='text-primary size-6' />,
      description:
        "당장의 기능 구현보다 '시스템의 수명'에 집착합니다. 복합적인 비즈니스 로직을 견고한 타입 시스템으로 설계합니다.",
      details: {
        challenge:
          '환경공단 프로젝트 당시 50개 이상의 복잡한 데이터 그리드를 관리해야 했습니다. 표준 인터페이스 부재로 유지보수 비용이 기하급수적으로 늘어나는 상황이었습니다.',
        approach:
          'IBSheet의 모든 메서드를 TypeScript로 래핑하는 자체 타입 시스템을 구축했습니다. 이를 통해 런타임 에러를 사전에 차단하는 선언적 개발 환경을 조성했습니다.',
        result:
          '리그레션 버그가 현저히 감소했으며, 동료 개발자들의 온보딩 속도가 평균 2주에서 3일로 단축되는 성과를 거두었습니다.',
      },
    },
    {
      title: 'Performance & UX Obsession',
      tag: 'Optimization',
      icon: <Zap className='size-6 text-yellow-500' />,
      description:
        '대용량 데이터를 다루며 렌더링 병목 지점을 파악하고 최적화합니다. 인터랙션과 성능 사이의 균형을 찾는 과정을 즐깁니다.',
      details: {
        challenge:
          '수만 건의 실시간 데이터 렌더링 시 브라우저 메인 스레드 차단으로 인해 사용자 스크롤이 끊기는 UX 저하 현상이 발생했습니다.',
        approach:
          '가상 스크롤링 기법을 적용하고 복잡한 연산을 웹 워커로 분리했습니다. 또한 정교한 메모이제이션으로 불필요한 리렌더링을 차단했습니다.',
        result:
          '초기 로딩 속도를 60% 개선하고 프레임 드랍 현상을 완전히 해결하여 매끄러운 인터랙션을 구현했습니다.',
      },
    },
    {
      title: 'Standardization & DX',
      tag: 'Collaboration',
      icon: <LayoutTemplate className='size-6 text-blue-500' />,
      description:
        '반복되는 UI 패턴을 컴포넌트화하여 팀의 효율을 높입니다. 기술 컨벤션 수립을 통해 소통의 비용을 낮추는 것을 좋아합니다.',
      details: {
        challenge:
          '프로젝트 규모 확장 시 중복 UI 코드가 산재하고 스타일링 방식이 파편화되어 디자인 일관성 유지가 어려웠습니다.',
        approach:
          '공통 UI 컴포넌트 라이브러리를 구축하고 ESLint/Prettier 등 자동화 도구와 결합한 사내 기술 컨벤션을 주도적으로 수립했습니다.',
        result:
          'UI 개발 시간을 40% 절감했으며, 코드 리뷰 시 스타일 논쟁을 줄이고 비즈니스 로직에 집중할 수 있는 환경을 만들었습니다.',
      },
    },
  ];

  return (
    <section id='strength' className='scroll-mt-32'>
      <BlurFade delay={0.3} inView>
        <div className='space-y-12'>
          <div className='space-y-2 text-center md:text-left'>
            <H2Typography className='border-none pb-0'>
              🛡️ Technical Strength
            </H2Typography>
            <PTypography className='text-muted-foreground mt-0 max-w-2xl break-keep'>
              도구에 매몰되지 않고 본질에 집중하며 얻은{' '}
              <span className='inline-block'>
                <Highlighter
                  action='underline'
                  color={PRIMARY_HEX}
                  strokeWidth={2}
                  animationDuration={1000}
                >
                  <span className='text-foreground text-sm font-bold md:text-base'>
                    실무적 해결 역량
                  </span>
                </Highlighter>
              </span>
              입니다. 카드를 클릭해 상세 내용을 확인해보세요.
            </PTypography>
          </div>
          <div className='grid gap-6 md:grid-cols-3'>
            {strengths.map((s, i) => (
              <StrengthCard key={i} s={s} i={i} />
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
