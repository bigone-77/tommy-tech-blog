import { AppImage } from '@/components/app-image';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { H2Typography, SmallTypography } from '@/components/ui/typography';

export function CareerSection() {
  return (
    <section id='career' className='scroll-mt-32'>
      <BlurFade delay={0.2} inView>
        <div className='space-y-12'>
          <H2Typography className='flex items-center gap-3 border-none pb-0 text-left'>
            💼 Career
          </H2Typography>

          <div className='border-muted relative ml-2 space-y-16 border-l-2 pl-8'>
            <div className='flex flex-col justify-between gap-6 md:flex-row md:items-start'>
              {/* items-center를 items-start로 변경하여 로고와 텍스트를 왼쪽으로 붙임 */}
              <div className='flex flex-col items-start gap-4 md:flex-row md:items-start'>
                {/* 📸 회사 로고 박스 */}
                <div className='relative size-12 shrink-0 overflow-hidden rounded-xl border bg-white p-1 shadow-sm md:size-14'>
                  <AppImage
                    src='https://www.clamos.io/assets/favicon/favicon-32x32.png'
                    alt='(주)클라모스 로고'
                    fill
                    className='object-contain'
                  />
                </div>

                {/* text-center를 text-left로 변경 */}
                <div className='space-y-1.5 text-left'>
                  <h3 className='text-foreground text-2xl font-black tracking-tight'>
                    (주)클라모스
                  </h3>
                  <p className='text-muted-foreground max-w-[300px] text-xs leading-tight font-medium md:max-w-none'>
                    공공기관 및 대규모 기업 대상 시스템 통합(SI) 및 웹 솔루션
                    전문 기업
                  </p>
                </div>
              </div>

              {/* 날짜 또한 자연스럽게 왼쪽 정렬된 상태로 아래에 배치됨 */}
              <SmallTypography className='text-muted-foreground shrink-0 font-mono uppercase'>
                2023.01 — Present
              </SmallTypography>
            </div>

            {/* 🛠 상세 프로젝트 리스트 */}
            <div className='space-y-14'>
              {/* 1. 한국환경공단 프로젝트 */}
              <div className='group relative space-y-4'>
                <div className='border-background bg-primary absolute top-1.5 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />
                <div className='space-y-1'>
                  <p className='text-primary text-[11px] font-bold tracking-widest uppercase'>
                    Frontend Engineer / Maintenance Lead
                  </p>
                  <h4 className='text-foreground/90 text-lg font-bold tracking-tight'>
                    한국환경공단 올바로 차세대 시스템 구축
                  </h4>
                </div>
                <ul className='space-y-3'>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <span className='text-foreground font-semibold'>
                      대용량 데이터 처리 및 배포:
                    </span>{' '}
                    수만 건의 데이터 요청·응답 아키텍처를 최적화하고, WebtoB
                    환경에 온프레미스 방식으로 배포 및 운영을 전담했습니다.
                  </li>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <span className='text-foreground font-semibold'>
                      IBSheet 라이브러리 커스터마이징:
                    </span>{' '}
                    사내 비즈니스 로직에 최적화되도록 IBSheet의 타입 시스템을
                    전면 재구성하여 개발 생산성을 높였습니다.
                  </li>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <span className='text-foreground font-semibold'>
                      풀 사이클 유지보수:
                    </span>{' '}
                    1차 개발 이후 안정적인 연착륙을 위해 전 파트의 유지보수
                    프로세스를 정립했습니다.
                  </li>
                </ul>
                <div className='flex flex-wrap gap-1.5 pt-1'>
                  {[
                    'React',
                    'TypeScript',
                    'IBSheet',
                    'WebtoB',
                    'On-premise',
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      variant='secondary'
                      className='rounded-sm px-1.5 py-0 font-mono text-[10px]'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 2. 해양경찰 프로젝트 */}
              <div className='group relative space-y-4'>
                <div className='border-background bg-primary/60 absolute top-1.5 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />
                <h4 className='text-foreground/90 text-lg font-bold tracking-tight'>
                  해양경찰 장구류 관리 시스템 개발
                </h4>
                <ul className='space-y-3'>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <span className='text-foreground font-semibold'>
                      자산 관리 모듈 전담:
                    </span>{' '}
                    공공데이터 기반의 장구류 관리 로직을 구축하고, 데이터 정합성
                    확보를 위한 유효성 검사 모듈을 개발했습니다.
                  </li>
                </ul>
                <div className='flex flex-wrap gap-1.5 pt-1'>
                  {['React', 'JavaScript', 'Shadcn UI', 'Context API'].map(
                    (tech) => (
                      <Badge
                        key={tech}
                        variant='outline'
                        className='rounded-sm px-1.5 py-0 font-mono text-[10px] opacity-70'
                      >
                        {tech}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
