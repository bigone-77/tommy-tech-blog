'use client';

import { useTransition } from 'react';

import Link from 'next/link';

import { Loader2 } from 'lucide-react';

import { deletePost } from '@/app/blog/[id]/page.actions';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

export function EditDeleteBtn({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('정말로 이 글을 삭제하시겠습니까?')) return;

    startTransition(async () => {
      await deletePost(id);
    });
  };

  return (
    <ButtonGroup>
      <Button variant='link' size='sm' asChild disabled={isPending}>
        {/* 수정 페이지(예: /blog/[id]/edit)로 이동 */}
        <Link href={`/blog/${id}/edit`}>수정</Link>
      </Button>

      <Button
        variant='link'
        size='sm'
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? <Loader2 className='mr-1 h-3 w-3 animate-spin' /> : null}
        삭제
      </Button>
    </ButtonGroup>
  );
}
