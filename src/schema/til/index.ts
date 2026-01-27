import { z } from 'zod';

export const tilSchema = z.object({
  title: z.string().min(1, '오늘의 학습 키워드를 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  tags: z.array(z.string()).min(1, '카테고리를 선택해주세요.'),
});

export type TilProps = z.infer<typeof tilSchema>;
