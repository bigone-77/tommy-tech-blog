import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(5, '내용은 최소 5자 이상 작성해주세요.'),
});

export type PostInput = z.infer<typeof postSchema>;
