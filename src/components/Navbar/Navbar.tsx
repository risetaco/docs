"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import ModalSearch from "../FlexSearch";

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
  const [modal, setModal] = useState(false);
  const active = pathname.split("/")[1] || "";

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 48);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const downHandler = ({ key, metaKey, ctrlKey }: KeyboardEvent) => {
      if ((metaKey || ctrlKey) && key === "k") {
        setModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [modal]);

  return (
    <header className={clsx({ sticky })}>
      <nav>
        <div>Awsm.</div>
        <div className="nav-menu">
          {MENU.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className={clsx({ active: active === item.href.slice(1) })}
            >
              {item.name}
            </Link>
          ))}
          <div className="search-box">
            <button onClick={() => setModal(true)}>
              <span>Search</span>
              <kbd> ⌘K</kbd>
            </button>
          </div>
        </div>
      </nav>
      <ModalSearch show={modal} onClose={() => setModal(false)} />
    </header>
  );
};

export default Navbar;
