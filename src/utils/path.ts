/**
 * Refer to nextjs dynamic route
 *
 * https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments
 *
 * eg: /docs/[...slug].tsx
 *
 * if /docs, slug is undefined
 *
 * @param slugs string[]
 * @returns string
 */
export const getDocPathFromDynamicSlug = (slug?: string[]) => {
  if (!slug) return "";
  if (slug && slug.length === 1) return slug[0];
  return slug.join("/");
};
