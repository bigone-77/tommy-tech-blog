'use client';

import { startTransition, useActionState, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { useImageHandler } from '@/hooks/use-image-handler';
import { blogSchema } from '@/schema/blog';
import { tilSchema } from '@/schema/til';

import { PostEditor } from './post-editor';
import { PostPreview } from './post-preview';

interface PostEditorContainerProps {
  mode: 'blog' | 'til';
  initialData?: any;
  action: (prevState: any, formData: FormData) => Promise<any>;
  submitLabel: string;
}

export function PostEditorContainer({
  mode,
  initialData = { title: '', content: '', tags: [] },
  action,
  submitLabel,
}: PostEditorContainerProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentSchema = mode === 'blog' ? blogSchema : tilSchema;

  const { register, control, setValue, handleSubmit } = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: initialData,
  });

  const watchedValues = useWatch({ control });

  const { handleImageUpload, isUploading } = useImageHandler({
    mode,
    textareaRef,
    setValue,
    content: watchedValues.content || '',
  });

  const onSubmit = (data: any) => {
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
        <div className='bg-background w-full overflow-hidden border-r lg:w-1/2'>
          <PostEditor
            mode={mode}
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

        <div className='hidden w-1/2 overflow-hidden lg:block'>
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
                ? '업로드 중...'
                : submitLabel}
          </Button>
        </div>
      </footer>
    </div>
  );
}
