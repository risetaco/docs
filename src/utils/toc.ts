export type TOCItem = {
  level: number;
  text: string;
  slug: string;
  children?: TOCItem[];
};

export const nestTOC = (input: TOCItem[]) => {
  const result = [];
  const stack = [];

  for (const item of input) {
    const newItem = { ...item };
    newItem.children = [];

    while (stack.length > 0 && stack[stack.length - 1].level >= newItem.level) {
      stack.pop();
    }

    if (stack.length > 0) {
      stack[stack.length - 1].children?.push(newItem);
    } else {
      result.push(newItem);
    }

    stack.push(newItem);
  }

  return result;
};
