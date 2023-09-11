import { MDXContentProvider } from "@/theme/mdx/MDXContentProvider";
import { getDocPathFromDynamicSlug } from "@/utils/path";
import { getTOC } from "@/utils/getTOC";
import { allPackages } from "contentlayer/generated";
import Link from "next/link";
import { notFound } from "next/navigation";
import TableOfContents from "./TableOfContent";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

export const DocPageLayout = (props: DocPageProps) => {
  const { params } = props;
  const docPath = getDocPathFromDynamicSlug(params.slug);
  const doc = allPackages.find((pkg) => pkg._raw.flattenedPath === docPath);

  // Index Page
  if (!params.slug) {
    return (
      <>
        <h1>List</h1>
        <ol>
          {allPackages.map((pkg) => (
            <li key={pkg._id}>
              <Link href={pkg.url}>{pkg.package}</Link>
            </li>
          ))}
        </ol>
      </>
    );
  }

  // If not index page, but could find any
  if (!doc) notFound();

  const tableOfContent = getTOC(doc?.body.raw);

  return (
    <>
      <article>
        <div>
          <h1 style={{ textAlign: "center", marginBlock: 32 }}>
            {doc.package}
          </h1>
        </div>

        {/* bundlephobia style */}
        <div>
          <div
            style={{
              marginBlock: 32,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            <div>
              <div>Version</div>
              <div>1.1.1</div>
            </div>
            <div>
              <div>Bundle Size</div>
              <div>1.1.1.</div>
            </div>
            <div>
              <div>Bundle Size</div>
              <div>1.1.1</div>
            </div>
            <div>
              <div>NPM Link</div>
              <div></div>
            </div>
          </div>
        </div>

        {/* markdown */}
        <div style={{ display: "flex" }}>
          <div style={{ width: 480 }}>
            <MDXContentProvider code={doc.body.code} />
          </div>
          <div>
            <div style={{ position: "fixed" }}>
              <div>TOC</div>
              <TableOfContents toc={tableOfContent} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
