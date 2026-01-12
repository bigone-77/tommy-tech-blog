import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  BlockquoteTypography,
  H1Typography,
  MutedTypography,
  PTypography,
} from '@/components/ui/typography';
import { getClient } from '@/lib/apollo-client';

import { GET_POST_BY_ID } from './page.queries';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  console.log('🔍 현재 조회 중인 ID:', id); // 1. ID가 주소창과 일치하는지 확인

  const { data, error } = await getClient().query({
    query: GET_POST_BY_ID,
    variables: { id },
  });

  console.log('📦 GraphQL 결과 데이터:', data); // 2. 데이터가 어떻게 넘어오는지 확인
  if (error) console.error('❌ GraphQL 에러:', error);

  const post = data?.post;

  if (!post) {
    console.log('⚠️ 게시글을 찾지 못해 404를 반환합니다.');
    return notFound();
  }

  return (
    <article className='mx-auto max-w-3xl space-y-10 p-10'>
      <header className='space-y-6'>
        <Link href='/'>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-3 gap-1 text-zinc-500'
          >
            <ChevronLeftIcon className='h-4 w-4' />
            목록으로
          </Button>
        </Link>
        <div className='space-y-2'>
          <H1Typography>{post.title}</H1Typography>
          <div className='flex items-center gap-3 border-b pb-6'>
            <MutedTypography>
              {`작성자:
              ${post.author.username}`}
            </MutedTypography>
            <MutedTypography>|</MutedTypography>
            <MutedTypography>
              {new Date(parseInt(post.createdAt)).toLocaleDateString()}
            </MutedTypography>
          </div>
        </div>
      </header>

      <div className='min-h-[400px]'>
        <PTypography className='whitespace-pre-wrap'>
          {post.content}
        </PTypography>
      </div>

      <footer className='border-t pt-10'>
        <BlockquoteTypography>
          본 게시글의 저작권은 작성자에게 있으며, 무단 전재를 금합니다.
        </BlockquoteTypography>
      </footer>
    </article>
  );
}
