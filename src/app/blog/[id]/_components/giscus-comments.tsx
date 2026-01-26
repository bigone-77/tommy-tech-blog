'use client';

import { useTheme } from 'next-themes';

import Giscus from '@giscus/react';

export function GiscusComments() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo='bigone-77/tommy-tech-blog'
      repoId='R_kgDOQ3wkhw'
      category='comments'
      categoryId='DIC_kwDOQ3wkh84C1Sxf'
      mapping='pathname'
      strict='0'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme={resolvedTheme === 'dark' ? 'dark_dimmed' : 'light'}
      lang='ko'
    />
  );
}
