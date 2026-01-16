'use client';

import { startTransition, useActionState, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { useImageHandler } from '@/hooks/use-image-handler';
import { PostInput, postSchema } from '@/schema/write';

import { PostEditor } from './post-editor';
import { PostPreview } from './post-preview';

interface PostEditorContainerProps {
  initialData?: PostInput;
  action: (prevState: any, formData: FormData) => Promise<any>;
  submitLabel: string;
}

export function PostEditorContainer({
  initialData = { title: '', content: '', tags: [] },
  action,
  submitLabel,
}: PostEditorContainerProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { register, control, setValue, handleSubmit } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData,
  });

  const watchedValues = useWatch({ control });

  const { handleImageUpload, isUploading } = useImageHandler({
    textareaRef,
    setValue,
    content: watchedValues.content || '',
  });

  const onSubmit = (data: PostInput) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('tags', JSON.stringify(data.tags));
      formAction(formData);
    });
  };

  return (
    <div className='bg-card flex h-[calc(100vh-200px)] flex-col overflow-hidden rounded-xl border shadow-sm'>
      <div className='flex min-h-0 flex-1'>
        <div className='bg-background w-full overflow-hidden border-r @[1024px]/post:w-1/2'>
          <PostEditor
            register={register}
            control={control}
            setValue={setValue}
            textareaRef={textareaRef}
            isUploading={isUploading}
            onImageUpload={async (files: File[]) => {
              await handleImageUpload(files);
            }}
          />
        </div>

        <div className='hidden w-1/2 overflow-hidden @[1024px]/post:block'>
          <PostPreview
            title={watchedValues.title || ''}
            content={watchedValues.content || ''}
          />
        </div>
      </div>

      <footer className='bg-background z-50 flex h-16 items-center justify-between border-t px-6'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' onClick={() => window.history.back()}>
            ← 나가기
          </Button>
          {state?.message && (
            <span className='text-destructive text-sm font-medium'>
              {state.message}
            </span>
          )}
        </div>
        <div className='flex gap-3'>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending || isUploading}
            className='min-w-[100px]'
          >
            {isPending
              ? `${submitLabel} 중...`
              : isUploading
                ? '이미지 전송 중...'
                : submitLabel}
          </Button>
        </div>
      </footer>
    </div>
  );
}
