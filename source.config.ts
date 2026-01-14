import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export default defineConfig({
  lastModifiedTime: 'git',
  mdxOptions: {
    providerImportSource: '@/mdx-components',
  },
});

export const { docs, meta } = defineDocs({
  dir: 'blog/content',
  docs: {
    schema: frontmatterSchema.extend({
      id: z.string(),
      date: z.coerce.date(),
      thumbnail: z.string().optional(),
      tags: z.array(z.string()),
    }),
  },
});
