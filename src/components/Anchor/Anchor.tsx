import { ComponentProps, forwardRef } from "react";
import Link from "next/link";
import "./style.scss";

const Anchor = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(
  ({ href, children, ...rest }: ComponentProps<typeof Link>, ref) => {
    return (
      <Link className="anchor" href={href} ref={ref} {...rest}>
        {children}
      </Link>
    );
  }
);

Anchor.displayName = "Anchor";
export default Anchor;
