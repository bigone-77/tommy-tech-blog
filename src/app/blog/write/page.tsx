import { AppLayout } from '@/components/app-layout';
import { PostEditorContainer } from '@/components/post/post-editor-container';

import { createPostAction } from './page.actions';

export default function Page() {
  return (
    <AppLayout>
      <PostEditorContainer
        mode='blog'
        action={createPostAction}
        submitLabel='게시하기'
      />
    </AppLayout>
  );
}
