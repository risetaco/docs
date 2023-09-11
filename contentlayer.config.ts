import { defineDocumentType, makeSource } from "contentlayer/source-files";

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
  },
}));

export default makeSource({
  contentDirPath: "src/docs", // Source directory where the content is located
  documentTypes: [Package],
});
