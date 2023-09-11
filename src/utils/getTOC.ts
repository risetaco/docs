type TOCItem = {
  text: string;
  level: number;
};

const getTOC = (markdownContent: string) => {
  const headings = markdownContent.match(/^(#{1,6})\s+(.+)$/gm);
  const tocItems: TOCItem[] = [];

  if (headings) {
    headings.forEach((heading) => {
      const headingMatch = heading.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const [, level, text] = headingMatch;
        const item = {
          text,
          level: level.length,
        };
        tocItems.push(item);
      }
    });
  }

  return tocItems;
};

export type { TOCItem };
export { getTOC };
