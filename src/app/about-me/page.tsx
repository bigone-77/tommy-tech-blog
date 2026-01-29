import { AppLayout } from '@/components/app-layout';
import { ReadProgressBar } from '@/components/read-progressbar';
import { TableOfContents } from '@/components/table-of-contents';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbSetter } from '@/lib/breadcrumb-store';

import { CareerSection } from './_components/career-section';
import { EducationSection } from './_components/education-section';
import { ProjectsSection } from './_components/projects-section';
import { SkillsetSection } from './_components/skillset-section';
import { StrengthSection } from './_components/strength-section';
import { SummarySection } from './_components/summary-section';

export default function AboutMePage() {
  const title = '소개';

  const headings = [
    { id: 'summary', text: '👤 Summary', level: 2 },
    { id: 'career', text: '💼 Career', level: 2 },
    { id: 'strength', text: '🛡️ Technical Strength', level: 2 },
    { id: 'projects', text: '🚀 Projects', level: 2 },
    { id: 'skills', text: '🛠️ Skillset', level: 2 },
    { id: 'education', text: '🎓 Education & Awards', level: 2 },
  ];

  return (
    <AppLayout
      aside={
        <div className='border-border bg-card sticky top-28 rounded-xl border p-5 shadow-sm'>
          <p className='text-muted-foreground/50 mb-3 text-[11px] font-bold tracking-widest uppercase'>
            목차
          </p>
          <TableOfContents headings={headings} />
        </div>
      }
    >
      <ReadProgressBar />
      <BreadcrumbSetter title={title} />

      <div className='space-y-24 pb-32'>
        <SummarySection />
        <Separator className='opacity-50' />
        <CareerSection />
        <Separator className='opacity-50' />
        <StrengthSection />
        <Separator className='opacity-50' />
        <ProjectsSection />
        <Separator className='opacity-50' />
        <SkillsetSection />
        <Separator className='opacity-50' />
        <EducationSection />
      </div>
    </AppLayout>
  );
}
