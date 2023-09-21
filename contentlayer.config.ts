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
      resolve: (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        return Array.from(doc.body.raw.matchAll(regXHeader)).map(
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
      },
    },
    paragraphs: {
      type: "json",
      resolve: (doc) => {
        const raw = doc.body.raw;
        const slugger = new GithubSlugger();
        const headings = raw.match(/^#{2,}\s+(?<content>.+)/gm);
        const contentSections = raw.split(/^#{2,}\s+/gm).slice(1);

        if (!headings || !contentSections) {
          return [];
        }

        return headings.map((heading, index) => {
          const slug = heading.replaceAll("#", "").trim();
          const content = contentSections[index].trim();
          return { slug: slugger.slug(slug), content };
        });
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
