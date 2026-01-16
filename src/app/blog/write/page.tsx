import { AppLayout } from '@/components/app-layout';

import { PostEditorContainer } from '../_components/post-editor-container';
import { createPostAction } from './page.actions';

export default function Page() {
  return (
    <AppLayout>
      <PostEditorContainer action={createPostAction} submitLabel='게시하기' />
    </AppLayout>
  );
}
