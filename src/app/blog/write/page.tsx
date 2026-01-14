'use client';

import { startTransition, useActionState, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { useImageHandler } from '@/hooks/use-image-handler';
import { PostInput, postSchema } from '@/schema/write';

import { PostEditor } from './_components/post-editor';
import { PostPreview } from './_components/post-preview';
import { createPostAction } from './actions';

export default function WritePage() {
  const [state, formAction, isPending] = useActionState(createPostAction, null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { register, control, setValue, handleSubmit } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: { title: '', content: '', tags: [] },
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
    <div className='flex h-screen flex-col overflow-hidden'>
      {/* 상단 에디터 & 프리뷰 영역 (50:50 분할) */}
      <div className='flex min-h-0 flex-1'>
        {/* 왼쪽: 에디터 패널 */}
        <div className='bg-background w-1/2 overflow-hidden border-r'>
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

        <div className='hidden w-1/2 overflow-hidden lg:block'>
          <PostPreview
            title={watchedValues.title || ''}
            content={watchedValues.content || ''}
          />
        </div>
      </div>

      {/* 하단 고정 푸터 (벨로그 스타일) */}
      <footer className='bg-background z-50 flex h-16 items-center justify-between border-t px-6 shadow-sm'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' onClick={() => window.history.back()}>
            ← 나가기
          </Button>
          {/* 서버 에러 메시지 표시 */}
          {state?.message && (
            <span className='text-destructive text-sm font-medium'>
              {state.message}
            </span>
          )}
        </div>

        <div className='flex gap-3'>
          <Button variant='outline' type='button'>
            임시저장
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending || isUploading}
            className='min-w-[100px]'
          >
            {isPending
              ? '게시 중...'
              : isUploading
                ? '이미지 전송 중...'
                : '게시하기'}
          </Button>
        </div>
      </footer>
    </div>
  );
}
