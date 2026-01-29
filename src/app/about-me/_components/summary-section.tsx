import { Github, Mail } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { Highlighter } from '@/components/ui/highlighter';
import { H1Typography, PTypography } from '@/components/ui/typography';

export function SummarySection() {
  const PRIMARY_HEX = '#10b981';

  return (
    <section id='summary' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16'>
          <div className='group bg-muted/30 relative aspect-[3/4] w-44 shrink-0 overflow-hidden rounded-[2.5rem] border p-1 shadow-sm transition-all duration-500 hover:shadow-lg md:w-40 lg:w-48'>
            <div className='relative h-full w-full overflow-hidden rounded-[calc(2.5rem-4px)]'>
              <AppImage
                src='https://res.cloudinary.com/dpzexzf44/image/upload/v1769689309/1630281-20408-Picsart-AiImageEnhancer_yewdnk.png'
                alt='신태일 프로필'
                fill
                priority
                className='object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </div>
          </div>

          <div className='flex-1 space-y-6 text-center md:text-left'>
            <div className='space-y-4'>
              <div className='flex flex-col items-center gap-3 md:flex-row'>
                <H1Typography className='text-3xl font-black tracking-tight md:text-3xl lg:text-4xl'>
                  신태일
                </H1Typography>
                <Badge
                  variant='outline'
                  className='border-primary/30 bg-primary/5 text-primary rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase'
                >
                  Frontend Engineer
                </Badge>
              </div>

              <div className='flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start'>
                <a
                  href='mailto:taeil012@gmail.com'
                  className='group text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors'
                >
                  <Mail className='size-4' />
                  <span className='font-mono text-sm font-medium tracking-tight'>
                    taeil012@gmail.com
                  </span>
                </a>
                <a
                  href='https://github.com/bigone-77'
                  className='group text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors'
                >
                  <Github className='size-4' />
                  <span className='font-mono text-sm font-medium tracking-tight'>
                    GitHub
                  </span>
                </a>
              </div>
            </div>

            <PTypography className='text-muted-foreground text-base leading-relaxed break-keep md:text-base md:leading-relaxed lg:text-lg lg:leading-loose'>
              복잡한 비즈니스 요구사항을{' '}
              <span className='text-foreground font-bold'>
                유연하고 정갈한 코드
              </span>
              로 구현합니다.
              <span className='mx-1 inline-block'>
                <Highlighter
                  action='underline'
                  color={PRIMARY_HEX}
                  strokeWidth={2}
                  animationDuration={1000}
                >
                  <span className='text-foreground font-bold'>
                    문제를 마주하고 해결하는 모든 과정을 기록으로 남기며
                  </span>
                </Highlighter>
              </span>
              , 시스템의{' '}
              <span className='text-foreground font-bold'>
                지속 가능한 성장
              </span>
              과 사용자 경험의 깊이를 고민합니다.
            </PTypography>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
