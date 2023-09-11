import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doc site",
  description: "Doc site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav
          style={{
            background: "red",
            paddingInline: "calc((100vw - 800px) / 2)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>Logo</div>
          <ul style={{ listStyle: "none", display: "flex", gap: 12 }}>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/how-to-contribute"}>How To Contribute</Link>
            </li>
            <li>
              <Link href={"/docs"}>Package List</Link>
            </li>
          </ul>
        </nav>
        <div
          className="container"
          style={{ maxWidth: 800, marginLeft: "auto", marginRight: "auto" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
