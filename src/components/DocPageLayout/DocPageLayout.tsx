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
import NavLink from "../NavLink";
import Sidebar from "../Sidebar";

interface DocPageProps {
  params: { slug: string[] };
}

export const DocPageLayout = (props: DocPageProps) => {
  const { params } = props;
  const docPath = getDocPathFromDynamicSlug(params.slug);
  const docIndex = allPackages.findIndex(
    (pkg) => pkg._raw.flattenedPath === decodeURIComponent(docPath)
  );
  const doc = allPackages[docIndex];

  if (!params.slug) redirect("/"); // Index Page
  if (!doc) notFound(); // If not index page, but could find any

  return (
    <>
      <Hero title={doc.package} subtitle={doc.desc} />
      <div className="container" style={{ transform: "translateY(-8rem)" }}>
        <BundleInformation version="1.1.1" packageName={doc.package} />
        <ActiveAnchorProvider>
          <div className="row">
            <Sidebar
              index={docIndex}
              id={doc._id}
              list={allPackages.map(({ _id, package: title, url }) => ({
                _id,
                title,
                url,
              }))}
            />
            <div style={{ width: "100%" }}>
              <MDXContainer code={doc.body.code} />
              <NavLink
                index={docIndex}
                id={doc._id}
                list={allPackages.map(({ _id, package: title, url }) => ({
                  _id,
                  title,
                  url,
                }))}
              />
            </div>
            <TOC toc={doc.headings} />
          </div>
        </ActiveAnchorProvider>
      </div>
    </>
  );
};

export default DocPageLayout;
