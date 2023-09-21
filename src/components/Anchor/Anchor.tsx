import { ComponentProps } from "react";
import Link from "next/link";
import "./style.scss";

const Anchor = ({ href, children, ...rest }: ComponentProps<typeof Link>) => {
  return (
    <Link className="anchor" href={href} {...rest}>
      {children}
    </Link>
  );
};

export default Anchor;
