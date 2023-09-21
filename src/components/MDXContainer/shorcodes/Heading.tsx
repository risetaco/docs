import { HTMLProps, useEffect, useRef } from "react";
import {
  useIntersectionObserver,
  useSetActiveAnchor,
  useSlugs,
} from "@/context/anchor";
import Link from "next/link";

type HeadingLinkType = {
  tag: `h${1 | 2 | 3 | 4 | 5 | 6}`;
  context: { index: number };
} & HTMLProps<HTMLHeadingElement>;

export const HeadingLink = ({
  tag: Tag,
  context,
  id,
  children,
  ...rest
}: HeadingLinkType) => {
  const setActiveAnchor = useSetActiveAnchor();
  const slugs = useSlugs();
  const observer = useIntersectionObserver();
  const obRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!id) return;
    const heading = obRef.current;
    if (!heading) return;
    slugs.set(heading, [id, (context.index += 1)]);
    observer?.observe(heading);

    return () => {
      observer?.disconnect();
      slugs.delete(heading);
      setActiveAnchor((f) => {
        const ret = { ...f };
        delete ret[id];
        return ret;
      });
    };
  }, [id, context, slugs, observer, setActiveAnchor]);

  return (
    <Tag id={id} {...rest}>
      {children}
      {id && <Link href={`#${id}`} ref={obRef} />}
    </Tag>
  );
};
