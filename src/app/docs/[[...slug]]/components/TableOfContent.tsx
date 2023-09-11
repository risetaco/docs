import React from "react";
import { TOCItem } from "@/utils/getTOC";

const TableOfContents = ({ toc }: { toc: TOCItem[] }) => {
  if (!toc?.length) return null;

  return (
    <ul>
      {toc.map((item) => (
        <li key={item.text}>
          <a href={`#${item.text.replace(/\s+/g, "-")}`}>{item.text}</a>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;
