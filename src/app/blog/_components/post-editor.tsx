'use client';

import { useRef } from 'react';
import { Controller, useWatch } from 'react-hook-form';

import { EditorToolbar } from '@/components/editor/editor-toolbar';
import { TagInput } from '@/components/editor/tag-input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function PostEditor({
  register,
  control,
  setValue,
  textareaRef,
  onImageUpload,
  isUploading,
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleValue = useWatch({ control, name: 'title', defaultValue: '' });

  return (
    <div className='bg-background relative flex h-full flex-col space-y-6 overflow-y-auto p-10'>
      <div
        className={cn(
          'grid text-4xl leading-[1.4] font-bold tracking-tight',
          'after:invisible after:wrap-break-word after:whitespace-pre-wrap',
          "after:content-[attr(data-cloned-val)_'_'] after:[grid-area:1/1/2/2]",
          '[&>textarea]:[grid-area:1/1/2/2]',
        )}
        data-cloned-val={titleValue || ''}
      >
        <Textarea
          {...register('title')}
          placeholder='제목을 입력하세요'
          rows={1}
          className='placeholder:text-muted-foreground/30 min-h-[1.4em] w-full resize-none overflow-hidden border-none bg-transparent px-0 py-0 !text-4xl leading-[1.4] font-bold tracking-tight shadow-none focus-visible:ring-0'
        />
      </div>

      <Controller
        control={control}
        name='tags'
        render={({ field }) => (
          <TagInput value={field.value} onChange={field.onChange} />
        )}
      />

      <EditorToolbar
        textareaRef={textareaRef}
        onContentChange={(val) => setValue('content', val)}
        activeStyles={[]}
        onImageClick={() => fileInputRef.current?.click()}
      />

      <div className='flex-1'>
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
