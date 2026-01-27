import { AppLayout } from '@/components/app-layout';
import { PostEditorContainer } from '@/components/post/post-editor-container';

import { createTilAction } from './page.actions';

export default function Page() {
  return (
    <AppLayout>
      <PostEditorContainer
        mode='til'
        action={createTilAction}
        submitLabel='기록하기'
      />
    </AppLayout>
  );
}
