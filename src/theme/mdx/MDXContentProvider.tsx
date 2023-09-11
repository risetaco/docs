"use client";

import { useMDXComponent } from "next-contentlayer/hooks";

import { H1, H2, H3 } from "./shorcodes";

export const MDXContentProvider = (props: { code: string }) => {
  const { code } = props;
  const MDXContent = useMDXComponent(code);

  return (
    <div>
      <MDXContent
        components={{
          h1: H1,
          h2: H2,
          h3: H3,
        }}
      />
    </div>
  );
};
