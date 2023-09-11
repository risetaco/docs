import { allPackages, Package } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { getDocPathFromDynamicSlug } from "@/utils/path";
import { DocPageLayout } from "./components/DocPageLayout";

export const generateStaticParams = async () =>
  allPackages.map((pkg: Package) => {
    const slug = pkg._raw.flattenedPath.split("/");
    if (!slug) notFound();
    return { slug };
  });

export const generateMetadata = ({
  params,
}: {
  params: { slug: string[] };
}) => {
  const docPath = getDocPathFromDynamicSlug(params.slug);
  const doc = allPackages.find((pkg) => pkg._raw.flattenedPath === docPath);
  return { title: doc?.package };
};

export default function DocPage(props: { params: { slug: string[] } }) {
  return <DocPageLayout {...props} />;
}