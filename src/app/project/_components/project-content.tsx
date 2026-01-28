import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { ProjectStatus } from '@/generated/gql/graphql';
import { getClient } from '@/lib/apollo-client';

import { GET_PROJECTS } from '../page.queries';
import { ProjectCard } from './project-card';

interface ProjectContentProps {
  selectedStatus: string; // URL query에서 오는 값은 기본적으로 string입니다.
}

export async function ProjectContent({ selectedStatus }: ProjectContentProps) {
  // 🚀 'All'이 아니면 Enum 타입으로 캐스팅하여 타입 안전성 확보
  const statusVariable =
    selectedStatus === 'All' ? null : (selectedStatus as ProjectStatus);

  const { data } = await getClient().query({
    query: GET_PROJECTS,
    variables: {
      isFeatured: null,
      status: statusVariable,
      take: null,
    },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const allProjects = data?.allProjects || [];

  // 필터 탭 목록 정의
  const filterTabs = ['All', ...Object.values(ProjectStatus)];

  return (
    <div className='space-y-10'>
      {/* 상태 필터링 탭 */}
      <div className='flex flex-wrap gap-2'>
        {filterTabs.map((status) => (
          <Link
            key={status}
            href={status === 'All' ? '/project' : `/project?status=${status}`}
          >
            <Badge
              variant={selectedStatus === status ? 'default' : 'secondary'}
              className='cursor-pointer rounded-full px-4 py-1.5 text-[11px] font-bold transition-all hover:scale-105'
            >
              {status}
            </Badge>
          </Link>
        ))}
      </div>

      {/* 🚀 11열 커스텀 그리드: 6:5 비율 적용 */}
      <div className='grid grid-flow-row-dense grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-5 lg:grid-cols-[repeat(11,minmax(0,1fr))]'>
        {allProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            className={
              project.isFeatured
                ? 'md:col-span-3 lg:col-span-6'
                : 'md:col-span-2 lg:col-span-5'
            }
          />
        ))}
      </div>
    </div>
  );
}
