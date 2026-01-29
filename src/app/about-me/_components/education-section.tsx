import { Award, BookOpen, GraduationCap, Trophy } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { H2Typography, SmallTypography } from '@/components/ui/typography';

export function EducationSection() {
  return (
    <section id='education' className='scroll-mt-32'>
      <BlurFade delay={0.6} inView>
        <div className='space-y-12'>
          <H2Typography className='border-none pb-0 text-left'>
            🎓 Education & Awards
          </H2Typography>

          <div className='grid gap-12 md:grid-cols-2'>
            {/* 🎓 Education: 배움의 기반을 증명 */}
            <div className='space-y-8'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 rounded-lg p-2'>
                  <GraduationCap className='text-primary size-5' />
                </div>
                <h3 className='text-xl font-bold tracking-tight'>Education</h3>
              </div>

              <div className='border-muted relative space-y-10 border-l-2 pl-8'>
                <div className='group relative transition-opacity hover:opacity-100'>
                  {/* Career 섹션과 동일한 도트 시스템 */}
                  <div className='border-background bg-primary absolute top-1 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />

                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-center'>
                      <h4 className='text-lg leading-none font-bold'>
                        대학교명
                      </h4>
                      <SmallTypography className='text-muted-foreground/70 font-mono'>
                        20XX.XX — 20XX.XX
                      </SmallTypography>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='rounded-md px-1.5 py-0 text-[10px] font-bold'
                      >
                        Computer Science
                      </Badge>
                      <span className='text-muted-foreground text-sm font-medium'>
                        전공명
                      </span>
                    </div>

                    <p className='text-muted-foreground text-xs leading-relaxed break-keep'>
                      <BookOpen className='mr-1 mb-0.5 inline size-3 opacity-50' />
                      자료구조, 알고리즘, 운영체제 등{' '}
                      <span className='text-foreground font-medium'>
                        컴퓨터공학 전반의 핵심 지식
                      </span>
                      을 습득했습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 🏆 Awards: 결과로 증명된 실력 */}
            <div className='space-y-8'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-yellow-500/10 p-2'>
                  <Trophy className='size-5 text-yellow-500' />
                </div>
                <h3 className='text-xl font-bold tracking-tight'>Awards</h3>
              </div>

              <div className='border-muted relative space-y-10 border-l-2 pl-8'>
                {/* 1. 실제 수상 내역 예시 */}
                <div className='group relative'>
                  <div className='border-background absolute top-1 -left-[41px] size-4 rounded-full border-4 bg-yellow-500 transition-transform group-hover:scale-110' />

                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-center'>
                      <h4 className='text-foreground/90 text-lg leading-none font-bold'>
                        OO 소프트웨어 공모전
                      </h4>
                      <SmallTypography className='text-muted-foreground/70 font-mono'>
                        20XX.XX
                      </SmallTypography>
                    </div>

                    <div className='flex items-center gap-2'>
                      <Badge className='rounded-md border-yellow-500/20 bg-yellow-500/10 px-1.5 py-0 text-[10px] font-bold text-yellow-600'>
                        First Prize
                      </Badge>
                      <span className='text-muted-foreground text-sm font-medium'>
                        최우수상 (1위)
                      </span>
                    </div>

                    <p className='text-muted-foreground text-xs leading-relaxed break-keep'>
                      <Award className='mr-1 mb-0.5 inline size-3 opacity-50' />
                      <span className='text-foreground font-medium'>
                        공공데이터를 활용한 웹 서비스
                      </span>{' '}
                      구현의 창의성과 기술적 완성도를 인정받았습니다.
                    </p>
                  </div>
                </div>

                {/* 추가 수상 내역은 위와 같은 구조로 배치 */}
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
