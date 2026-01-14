import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  thumbnail: z.string().optional(),
  content: z.string().min(1, '내용을 입력해주세요.'),
  tags: z.array(z.string()),
});

export type PostInput = z.infer<typeof postSchema>;
