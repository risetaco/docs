import Link from "next/link";
import { HTMLProps } from "react";

export const H1 = ({ children, ...rest }: HTMLProps<HTMLHeadingElement>) => {
  const id = (children as string).replace(/\s+/g, "-");
  return (
    <a href={`#${id}`}>
      <h1 id={id} {...rest}>
        {children}
      </h1>
    </a>
  );
};

export const H2 = ({ children, ...rest }: HTMLProps<HTMLHeadingElement>) => {
  const id = (children as string).replace(/\s+/g, "-");
  return (
    <a href={`#${id}`}>
      <h2 id={id} {...rest}>
        {children}
      </h2>
    </a>
  );
};

export const H3 = ({ children, ...rest }: HTMLProps<HTMLHeadingElement>) => {
  const id = (children as string).replace(/\s+/g, "-");
  return (
    <a href={`#${id}`}>
      <h3 id={id} {...rest}>
        {children}
      </h3>
    </a>
  );
};
