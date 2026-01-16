'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Image,
  Italic,
  Link,
  Quote,
  Strikethrough,
  Underline,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { EDITOR_SHORTCUTS, MarkdownAction } from '@/constants/editor-shortcuts';
import { insertMarkdown } from '@/lib/editor-utils';
import { cn } from '@/lib/utils';

interface ToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onContentChange: (value: string) => void;
  activeStyles: MarkdownAction[];
  onImageClick?: () => void;
}

export function EditorToolbar({
  textareaRef,
  onContentChange,
  activeStyles,
  onImageClick,
}: ToolbarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.intersectionRatio < 1);
      },
      {
        threshold: [1],
        rootMargin: '-41px 0px 0px 0px',
      },
    );

    if (toolbarRef.current) observer.observe(toolbarRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAction = (type: MarkdownAction) => {
    if (type === 'image' && onImageClick) {
      onImageClick();
      return;
    }
    if (textareaRef.current)
      insertMarkdown(textareaRef.current, type, onContentChange);
  };

  const ToolbarButton = ({ action, icon: Icon, label }: any) => {
    const info = Object.values(EDITOR_SHORTCUTS).find(
      (s) => s.action === action,
    );
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={activeStyles.includes(action) ? 'secondary' : 'ghost'}
            size='sm'
            onClick={() => handleAction(action)}
            type='button'
          >
            <Icon size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side='bottom'
          className='flex flex-col items-center gap-0.5 px-2 py-1.5'
        >
          <span className='text-xs font-medium'>{info?.label || label}</span>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div
        ref={toolbarRef}
        className={cn(
          'bg-background sticky top-[-40px] z-30 transition-all duration-300 ease-in-out',
          'mx-[-40px] !mt-0 mb-6 flex flex-wrap items-center gap-0.5 border-b px-[40px] pt-[40px] pb-3',
          isSticky
            ? 'border-b-primary/30 bg-background/95 py-4 shadow-lg backdrop-blur-sm'
            : 'border-b-transparent shadow-none',
        )}
      >
        <ToolbarButton action='h1' icon={Heading1} label='제목 1' />
        <ToolbarButton action='h2' icon={Heading2} label='제목 2' />
        <ToolbarButton action='h3' icon={Heading3} label='제목 3' />
        <ToolbarButton action='h4' icon={Heading4} label='제목 4' />
        <div className='bg-border mx-1 h-4 w-[1px]' />
        <ToolbarButton action='bold' icon={Bold} label='굵게' />
        <ToolbarButton action='italic' icon={Italic} label='기울임체' />
        <ToolbarButton action='underline' icon={Underline} label='밑줄' />
        <ToolbarButton action='strike' icon={Strikethrough} label='취소선' />
        <div className='bg-border mx-1 h-4 w-[1px]' />
        <ToolbarButton action='quote' icon={Quote} label='인용구' />
        <ToolbarButton action='link' icon={Link} label='링크' />
        <ToolbarButton action='image' icon={Image} label='이미지' />
        <ToolbarButton action='code' icon={Code} label='코드' />
      </div>
    </TooltipProvider>
  );
}
