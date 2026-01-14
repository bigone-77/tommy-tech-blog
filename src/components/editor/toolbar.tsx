'use client';

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
  const handleAction = (type: MarkdownAction) => {
    if (type === 'image' && onImageClick) {
      onImageClick();
      return;
    }
    if (textareaRef.current) {
      insertMarkdown(textareaRef.current, type, onContentChange);
    }
  };

  const ToolbarButton = ({
    action,
    icon: Icon,
    label,
  }: {
    action: MarkdownAction;
    icon: any;
    label: string;
  }) => {
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
          {info?.shortcut && (
            <span className='text-muted-foreground text-[10px]'>
              {info.shortcut}
            </span>
          )}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className='bg-background sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b pb-2'>
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
