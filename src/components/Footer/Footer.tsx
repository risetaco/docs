"use client";

import { HorizontalScroll } from "../Icon";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="container footer">
      <span>ShopeePay FE Team</span>
      <a
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <HorizontalScroll />
        Back to Top
      </a>
    </footer>
  );
};

export default Footer;
