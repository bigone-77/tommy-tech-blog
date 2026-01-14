'use client';

import { KeyboardEvent, useState } from 'react';

import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ value, onChange }: TagInputProps) {
  const [pendingTag, setPendingTag] = useState('');

  const addTag = () => {
    const trimmedTag = pendingTag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag]);
      setPendingTag('');
    } else {
      setPendingTag('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !pendingTag && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className='border-input bg-background focus-within:ring-ring flex w-full flex-wrap gap-2 rounded-md border px-3 py-2 focus-within:ring-2'>
      {value.map((tag) => (
        <Badge
          key={tag}
          variant='secondary'
          className='flex items-center gap-1'
        >
          {tag}
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag);
            }}
            className='hover:text-foreground text-muted-foreground outline-none'
          >
            <X className='h-3 w-3 cursor-pointer' />
          </button>
        </Badge>
      ))}

      <Input
        value={pendingTag}
        onChange={(e) => setPendingTag(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          value.length === 0 ? '태그를 입력하고 엔터를 누르세요...' : ''
        }
        className='h-7 flex-1 border-0 p-0 shadow-none focus-visible:ring-0'
      />
    </div>
  );
}
