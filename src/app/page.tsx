"use client";

import Link from "next/link";
import { allPackages, Package } from "contentlayer/generated";
import { useMemo, useState } from "react";
import { PakcageLogoIcon, RightArrowIcon } from "@/components/Icon";
import Image from "next/image";
import Hero from "@/components/Hero";

export default function Home() {
  const [search, setSearch] = useState("");

  const localSearch = useMemo<Package[]>(() => {
    const result = allPackages.filter((all) =>
      all.package.toLowerCase().includes(search.toLocaleLowerCase())
    );
    return result;
  }, [search]);

  return (
    <>
      <Hero
        title="Awesome Packages of ShopeePay Frontend"
        subtitle="Guidelines for the Selection and Effective Management of Curated
              Third-Party Libraries and Dependencies in Software Development
              Projects"
        search={{
          value: search,
          onChange: (e) => setSearch(e.currentTarget.value),
        }}
      />

      <div className="container">
        <div className="result">
          {localSearch.length === 0 ? (
            <div className="no-result">No result</div>
          ) : (
            <div className="result-list">
              {localSearch.map((pkg) => (
                <div className="card" key={pkg._id}>
                  <div className="info">
                    <PakcageLogoIcon />
                    <span>{pkg.library}</span>
                  </div>
                  <strong>{pkg.package}</strong>
                  <div className="description">{pkg.desc}</div>
                  <Link href={pkg.url} className="link-wrapper">
                    View Detail
                    <RightArrowIcon />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="contribute">
          <div className="content">
            <h2>How to Contribute?</h2>
            <p>
              Guide you on how to contribute to adding a package on this website
              & information on the best metrics for the library.
            </p>
            <Link className="link-wrapper" href="/contribute">
              Add Package to this Site
              <RightArrowIcon />
            </Link>
            <Link className="link-wrapper" href="/contribute">
              Third-Party Metrics <RightArrowIcon />
            </Link>
          </div>
          <div className="graphic">
            <Image
              src="/laptop.png"
              alt="laptop"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              width={500}
              height={300}
            />
          </div>
          <div className="clipping">
            <div className="balloon ballon-1" />
          </div>
          <div className="balloon ballon-2" />
        </div>
      </div>
    </>
  );
}
