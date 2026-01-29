import { TagFilter } from '@/components/tag-filter';
import { ProjectStatus } from '@/generated/gql/graphql';
import { getClient } from '@/lib/apollo-client';

import { GET_PROJECTS } from '../page.queries';
import { ProjectCard } from './project-card';

export async function ProjectContent({
  selectedStatus,
}: {
  selectedStatus: string;
}) {
  const { data } = await getClient().query({
    query: GET_PROJECTS,
    variables: { isFeatured: null, status: null, take: null },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const allProjects = data?.allProjects || [];

  const statusCounts: Record<string, number> = { All: allProjects.length };
  allProjects.forEach((p: any) => {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
  });

  const filterTabs = ['All', ...Object.values(ProjectStatus)];

  const filteredProjects =
    selectedStatus === 'All'
      ? allProjects
      : allProjects.filter((p: any) => p.status === selectedStatus);

  return (
    <div className='space-y-10'>
      <TagFilter
        tags={filterTabs}
        selectedTag={selectedStatus}
        tagCounts={statusCounts}
        paramName='status'
        label='상태'
      />

      <div className='grid grid-flow-row-dense grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-5 lg:grid-cols-[repeat(11,minmax(0,1fr))]'>
        {filteredProjects.map((project: any) => (
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
