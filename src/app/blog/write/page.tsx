'use client';

import { startTransition, useActionState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import {
  H1Typography,
  LargeTypography,
  MutedTypography,
  PTypography,
} from '@/components/ui/typography';
import { PostInput, postSchema } from '@/schema/write';

import { createPostAction } from './actions';

export default function WritePage() {
  const [state, formAction, isPending] = useActionState(createPostAction, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostInput) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);

      formAction(formData);
    });
  };

  return (
    <div className='mx-auto max-w-3xl p-10'>
      <H1Typography className='mb-10'>새 글 작성</H1Typography>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        {/* 제목 입력 필드 */}
        <div className='space-y-3'>
          <LargeTypography>제목</LargeTypography>
          <Input {...register('title')} placeholder='제목을 입력하세요' />
          {errors.title?.message && (
            <MutedTypography className='font-medium text-red-500'>
              {errors.title.message}
            </MutedTypography>
          )}
        </div>

        {/* 내용 입력 필드 */}
        <div className='space-y-3'>
          <LargeTypography>내용</LargeTypography>
          <Textarea
            {...register('content')}
            rows={12}
            placeholder='무슨 생각을 하고 계신가요?'
            className='resize-none text-base focus-visible:ring-blue-500'
          />
          {errors.content?.message && (
            <MutedTypography className='font-medium text-red-500'>
              {errors.content.message}
            </MutedTypography>
          )}
        </div>

        {/* 서버 측 에러 메시지 */}
        {state?.message && !state.success && (
          <div className='rounded-lg border border-red-100 bg-red-50 p-4'>
            <PTypography className='mt-0 font-medium text-red-600 italic'>
              {state.message}
            </PTypography>
          </div>
        )}

        {/* 게시하기 버튼 (shadcn Button) */}
        <Button type='submit' disabled={isPending}>
          {isPending ? (
            <div className='flex items-center gap-2'>
              <Spinner />
              <span>저장 중...</span>
            </div>
          ) : (
            '게시하기'
          )}
        </Button>
      </form>
    </div>
  );
}
