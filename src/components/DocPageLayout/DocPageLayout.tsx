"use client";

import { getDocPathFromDynamicSlug } from "@/utils/path";
import { allPackages } from "contentlayer/generated";
import { notFound, redirect } from "next/navigation";
import { ActiveAnchorProvider } from "@/context/anchor";
import BundleInformation from "@/components/BundleInformation";
import MDXContainer from "@/components/MDXContainer";
import TOC from "@/components/TOC";
import Hero from "@/components/Hero";
import "./style.scss";

interface DocPageProps {
  params: { slug: string[] };
}

export const DocPageLayout = (props: DocPageProps) => {
  const { params } = props;
  const docPath = getDocPathFromDynamicSlug(params.slug);
  const doc = allPackages.find((pkg) => pkg._raw.flattenedPath === docPath);

  if (!params.slug) redirect("/"); // Index Page
  if (!doc) notFound(); // If not index page, but could find any

  return (
    <>
      <Hero title={doc.package} subtitle={doc.desc} />
      <article className="container" style={{ transform: "translateY(-8rem)" }}>
        <BundleInformation version="1.1.1" packageName={doc.package} />
        <ActiveAnchorProvider>
          <div className="row">
            <MDXContainer code={doc.body.code} />
            <TOC toc={doc.headings} />
          </div>
        </ActiveAnchorProvider>
      </article>
    </>
  );
};

export default DocPageLayout;
