'use client';

import { useRef } from 'react';
import { Controller, useWatch } from 'react-hook-form';

import { EditorToolbar } from '@/components/editor/editor-toolbar';
import { TagInput } from '@/components/editor/tag-input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TIL_TEMPLATES, TITLE_SUFFIXES } from '@/constants/til-templates';
import { cn, getFormattedDate } from '@/lib/utils';

export function PostEditor({
  mode,
  register,
  control,
  setValue,
  textareaRef,
  onImageUpload,
  isUploading,
}: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const titleValue = useWatch({ control, name: 'title', defaultValue: '' });
  const watchedTags = useWatch({ control, name: 'tags', defaultValue: [] });
  const contentValue = useWatch({ control, name: 'content', defaultValue: '' });

  const handleTilTagClick = (
    tag: string,
    fieldOnChange: (val: string[]) => void,
  ) => {
    const newTemplate = TIL_TEMPLATES[tag];
    const suffix = TITLE_SUFFIXES[tag] || '학습 기록';
    const isSelected = watchedTags.includes(tag);

    if (isSelected) {
      fieldOnChange(watchedTags.filter((t: string) => t !== tag));
      return;
    }

    const isContentModified =
      contentValue.trim().length > 0 &&
      !Object.values(TIL_TEMPLATES).some(
        (template) => template.trim() === contentValue.trim(),
      );

    const isTitleModified =
      titleValue.trim().length > 0 && !titleValue.startsWith('[');

    if (isContentModified || isTitleModified) {
      if (!confirm('태그를 변경하면 작성 중인 제목과 내용이 대체됩니다.')) {
        return;
      }
    }

    fieldOnChange([tag]);

    const dateStr = getFormattedDate(new Date(), 'yyyy. MM. dd');
    const autoTitle = `[${tag}] ${dateStr} | ${suffix}`;
    setValue('title', autoTitle, { shouldDirty: true });

    if (typeof newTemplate === 'string') {
      setValue('content', newTemplate, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            newTemplate.length,
            newTemplate.length,
          );
        }
      }, 50);
    }
  };

  return (
    <div className='bg-background relative flex h-full flex-col space-y-6 overflow-y-auto p-10'>
      {/* 제목 영역 */}
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
          placeholder={
            mode === 'blog' ? '제목을 입력하세요' : '오늘의 학습 키워드'
          }
          rows={1}
          className='placeholder:text-muted-foreground/30 min-h-[1.4em] w-full resize-none border-none bg-transparent px-0 py-0 !text-4xl font-bold shadow-none focus-visible:ring-0'
        />
      </div>

      {/* 태그 영역 */}
      {mode === 'blog' ? (
        <Controller
          control={control}
          name='tags'
          render={({ field }) => (
            <TagInput value={field.value} onChange={field.onChange} />
          )}
        />
      ) : (
        <Controller
          control={control}
          name='tags'
          render={({ field }) => (
            <div className='flex flex-wrap gap-2'>
              {Object.keys(TIL_TEMPLATES).map((tag) => {
                const isSelected = field.value?.includes(tag);
                return (
                  <Button
                    key={tag}
                    type='button'
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => handleTilTagClick(tag, field.onChange)}
                    className={cn(
                      'rounded-full transition-all duration-200',
                      isSelected &&
                        'bg-primary text-primary-foreground shadow-sm',
                    )}
                  >
                    {tag}
                  </Button>
                );
              })}
            </div>
          )}
        />
      )}

      {/* 에디터 툴바 */}
      <EditorToolbar
        textareaRef={textareaRef}
        onContentChange={(val) => setValue('content', val)}
        activeStyles={[]}
        onImageClick={() => fileInputRef.current?.click()}
      />

      {/* 본문 입력 영역 */}
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
        <Controller
          control={control}
          name='content'
          render={({ field }) => (
            <Textarea
              {...field}
              value={field.value || ''}
              ref={(e) => {
                field.ref(e);
                textareaRef.current = e;
              }}
              disabled={isUploading}
              placeholder={
                isUploading
                  ? '이미지 업로드 중...'
                  : '오늘 배운 내용을 기록해 보세요...'
              }
              className='min-h-[500px] w-full resize-none border-none px-0 text-lg leading-relaxed shadow-none focus-visible:ring-0'
            />
          )}
        />
      </div>
    </div>
  );
}
