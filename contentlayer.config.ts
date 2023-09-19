import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";

export const Package = defineDocumentType(() => ({
  name: "Package",
  filePathPattern: `**/*.mdx`, // Type of file to parse (every mdx in all subfolders)
  contentType: "mdx",
  fields: {
    package: {
      type: "string",
      required: true,
    },
    desc: {
      type: "string",
      required: true,
    },
    library: {
      type: "string", // external or internal
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/docs/${post._raw.flattenedPath}`,
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          }
        );
        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "src/docs", // Source directory where the content is located
  documentTypes: [Package],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
