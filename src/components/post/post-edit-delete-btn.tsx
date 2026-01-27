'use client';

import { useTransition } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

interface EditDeleteBtnProps {
  id: string;
  basePath: 'blog' | 'til';
  deleteAction: (
    id: string,
  ) => Promise<{ success: boolean; message?: string } | undefined>;
  confirmMessage?: string;
}

export function EditDeleteBtn({
  id,
  basePath,
  deleteAction,
  confirmMessage = '정말로 삭제하시겠습니까?',
}: EditDeleteBtnProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm(confirmMessage)) return;

    startTransition(async () => {
      const result = (await deleteAction(id)) as any;

      if (result?.success) {
        router.push(`/${basePath}`);
        router.refresh();
      } else {
        alert(result?.message || '삭제 중 오류가 발생했습니다.');
      }
    });
  };

  return (
    <ButtonGroup>
      <Button variant='link' size='sm' asChild disabled={isPending}>
        <Link href={`/${basePath}/${id}/edit`}>수정</Link>
      </Button>

      <Button
        variant='link'
        size='sm'
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending && <Loader2 className='mr-1 h-3 w-3 animate-spin' />}
        삭제
      </Button>
    </ButtonGroup>
  );
}
