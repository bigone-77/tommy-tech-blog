import { notFound } from 'next/navigation';

import { AppLayout } from '@/components/app-layout';
import { PostEditorContainer } from '@/components/post/post-editor-container';
import { prisma } from '@/lib/prisma';

// 🚀 경로 확인 필요
import { updateTilAction } from './page.actions';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. 수정할 TIL 데이터 조회
  const til = await prisma.til.findUnique({ where: { id } });
  if (!til) return notFound();

  // 2. 서버 액션에 ID를 미리 바인딩
  const boundAction = updateTilAction.bind(null, id);

  return (
    <AppLayout>
      <PostEditorContainer
        mode='til' // 🚀 모드를 'til'로 설정
        initialData={{
          title: til.title,
          content: til.content,
          tags: til.tags,
        }}
        action={boundAction}
        submitLabel='수정하기'
      />
    </AppLayout>
  );
}
