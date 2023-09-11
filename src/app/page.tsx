"use client";

import Link from "next/link";
import { allPackages, Package } from "contentlayer/generated";
import { useMemo, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const localSearch = useMemo<Package[]>(() => {
    const result = allPackages.filter((all) =>
      all.package.toLowerCase().includes(search.toLocaleLowerCase())
    );
    return result;
  }, [search]);

  return (
    <main>
      {/* HERO */}
      <div style={{ textAlign: "center", margin: 32, fontSize: 48 }}>
        Awesome Packages of ShopeePay Frontend
      </div>
      <div style={{ textAlign: "center", padding: 12 }}>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      {localSearch.length === 0 ? (
        "No result"
      ) : (
        <ul
          style={{
            listStyle: "none",
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {localSearch.map((pkg) => (
            <li className="pkg-list" key={pkg._id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Logo</div>
                <div>{pkg.library}</div>
              </div>
              <strong>{pkg.package}</strong>
              <div>{pkg.desc}</div>
              <Link href={pkg.url}>View Detail</Link>
            </li>
          ))}
        </ul>
      )}

      <div>How to Contribue Section</div>
    </main>
  );
}
