import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    // Keep the default remark/rehype chain; the blueprint styling comes from
    // globals.css, not from a custom pipeline.
  },
});
