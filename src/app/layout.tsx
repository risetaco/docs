import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./normalize.scss";
import "./globals.scss";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({ subsets: ["latin"] });

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
      <body className={dmSans.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
