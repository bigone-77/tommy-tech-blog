'use client';

import { useRef } from 'react';
import { Controller } from 'react-hook-form';

import { TagInput } from '@/components/editor/tag-input';
import { EditorToolbar } from '@/components/editor/toolbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function PostEditor({
  register,
  control,
  setValue,
  textareaRef,
  onImageUpload,
  isUploading,
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='bg-background flex h-full flex-col space-y-6 overflow-y-auto p-10'>
      <Input
        {...register('title')}
        placeholder='제목을 입력하세요'
        className='placeholder:text-muted-foreground/50 border-none px-0 text-4xl font-bold shadow-none focus-visible:ring-0'
      />
      <Controller
        control={control}
        name='tags'
        render={({ field }) => (
          <TagInput value={field.value} onChange={field.onChange} />
        )}
      />
      <div className='flex-1 border-t pt-4'>
        <EditorToolbar
          textareaRef={textareaRef}
          onContentChange={(val) => setValue('content', val)}
          activeStyles={[]}
          onImageClick={() => fileInputRef.current?.click()}
        />
        <input
          type='file'
          ref={fileInputRef}
          className='hidden'
          accept='image/*'
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length > 0) onImageUpload(files);
            e.target.value = '';
          }}
        />
        <Textarea
          {...register('content')}
          ref={(e) => {
            register('content').ref(e);
            textareaRef.current = e;
          }}
          disabled={isUploading}
          placeholder={
            isUploading
              ? '이미지 업로드 중...'
              : '당신의 이야기를 적어보세요...'
          }
          className='min-h-[500px] w-full resize-none border-none px-0 text-lg leading-relaxed shadow-none focus-visible:ring-0'
        />
      </div>
    </div>
  );
}
