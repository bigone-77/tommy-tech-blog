// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema
} from "fumadocs-mdx/config";
import z from "zod";
var { docs, meta } = defineDocs({
  dir: "blog/content",
  docs: {
    schema: frontmatterSchema.extend({
      id: z.string()
    })
  }
});
var source_config_default = defineConfig();
export {
  source_config_default as default,
  docs,
  meta
};
