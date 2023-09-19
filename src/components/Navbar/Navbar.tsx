"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IS_BROWSER } from "@/utils/browser";
import "./style.scss";

const MENU = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "How To Contribute",
    href: "/how-to-contribute",
  },
  {
    name: "Package List",
    href: "/docs",
  },
];

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const active = pathname.split("/")[1] || "";

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 48);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!IS_BROWSER) return;
    setSticky(window.scrollY > 48);
  }, []);

  return (
    <header className={`${sticky ? "sticky" : ""}`}>
      <nav>
        <div>Awsm.</div>
        <div className="nav-menu">
          {MENU.map((item) => (
            <Link
              className={`${active === item.href.slice(1) ? "active" : ""}`}
              href={item.href}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
