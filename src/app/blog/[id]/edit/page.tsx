import { notFound } from 'next/navigation';

import { AppLayout } from '@/components/app-layout';
import { prisma } from '@/lib/prisma';

import { PostEditorContainer } from '../../_components/post-editor-container';
import { updatePostAction } from './page.actions';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return notFound();

  const boundAction = updatePostAction.bind(null, id);

  return (
    <AppLayout>
      <PostEditorContainer
        initialData={{
          title: post.title,
          content: post.content,
          tags: post.tags,
        }}
        action={boundAction}
        submitLabel='수정하기'
      />
    </AppLayout>
  );
}
