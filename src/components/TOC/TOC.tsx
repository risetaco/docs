import React from "react";
import { useActiveAnchor } from "@/context/anchor";
import { nestTOC, TOCItem } from "@/utils/toc";
import "./style.scss";
import Anchor from "../Anchor";
import clsx from "clsx";

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
      <Anchor
        href={`#${item.slug}`}
        className={clsx({ active: activeSlug?.[0] === item.slug })}
      >
        {item.text}
      </Anchor>
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
  if (!toc?.length) return null;

  return (
    <div className="toc">
      <div className="toc-content">
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
