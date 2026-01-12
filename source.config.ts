import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import z from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'blog/content',
  docs: {
    schema: frontmatterSchema.extend({
      id: z.string(),
    }),
  },
});

export default defineConfig();
