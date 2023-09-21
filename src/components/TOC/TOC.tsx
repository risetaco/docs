import React from "react";
import { useActiveAnchor } from "@/context/anchor";
import { nestTOC, TOCItem } from "@/utils/toc";
import "./style.scss";

type ItemProps = {
  item: TOCItem;
};

function Item({ item }: ItemProps) {
  const activeAnchor = useActiveAnchor();
  const activeSlug = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive === true
  );

  return (
    <>
      <a
        href={`#${item.slug}`}
        className={activeSlug?.[0] === item.slug ? "active" : ""}
      >
        {item.text}
      </a>
      {item.children && item.children.length > 0 && (
        <ul>
          {item.children.map((childItem, index) => (
            <li key={index}>
              <Item item={childItem} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

const TOC = ({ toc }: { toc: TOCItem[] }) => {
  const activeAnchor = useActiveAnchor();
  const activeSlug = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive === true
  );

  if (!toc?.length) return null;

  const top = toc.findIndex((item) => item.slug === activeSlug?.[0]);
  const lineHeight = 1.5; // in rem

  return (
    <div className="toc">
      <div
        className="toc-content"
        style={{ "--line-height": `${lineHeight}rem` }}
      >
        <ul>
          {nestTOC(toc).map((item, index) => (
            <li key={index}>
              <Item item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TOC;
