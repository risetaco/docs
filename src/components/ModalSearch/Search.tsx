"use client";

import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import FlexSearch from "flexsearch";
import { Package, allPackages } from "contentlayer/generated";
import SearchInput from "../SearchInput";
import Modal from "../Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Highlighter from "react-highlight-words";
import "./style.scss";

type DocumentSearchResult = {
  result: string[];
  field: string;
};

type SearchResultType = {
  resultType: string;
  paragraph?: string;
  content?: string;
} & Package;

// @ts-ignore
const index = new FlexSearch.Document({
  id: "id",
  index: ["package"],
});

// @ts-ignore
const document = new FlexSearch.Document({
  id: "id",
  index: ["document"],
});

allPackages.forEach((doc) => {
  index.add({ id: doc.url, package: doc.package, url: doc.url });

  // append each paragraph as a document
  doc.paragraphs.forEach(
    ({ slug, content }: { slug: string; content: string }) => {
      document.add({
        id: `${doc.url}#${slug}`,
        document: content,
        url: doc.url,
      });
    }
  );
});

const buildResult = (...results: DocumentSearchResult[][]) => {
  let searchResult: SearchResultType[] = [];

  results.forEach((res) => {
    res.forEach((item) => {
      item.result.forEach((result) => {
        const [url, paragraph] = result.split("#");

        const doc = allPackages.find((doc) => doc.url === url);
        if (doc) {
          searchResult.push({
            ...doc,
            resultType: item.field,
            paragraph: paragraph,
            url: result,
            content: doc.paragraphs.find((p: any) => p.slug === paragraph)
              ?.content,
          });
        }
      });
    });
  });

  return searchResult;
};

const ResultItem = ({
  result,
  selected,
  query,
  ...rest
}: ComponentProps<typeof Link> & {
  query?: string;
  result: SearchResultType;
  selected?: boolean;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      aria-selected={selected}
      style={{ display: "block" }}
      {...rest}
    >
      <div>
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={query?.split(" ") || []}
          textToHighlight={result.content || result.package}
        />
      </div>
    </Link>
  );
};

const ModalSearch = (props: Omit<ComponentProps<typeof Modal>, "children">) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    if (!query) return [];

    const result: DocumentSearchResult[] = index.search(query, 10);
    const sectionResult: DocumentSearchResult[] = document.search(query, 10);

    return buildResult(result, sectionResult);
  }, [query]);

  const handleActive = useCallback(
    (e: { currentTarget: { dataset: DOMStringMap } }) => {
      const { index } = e.currentTarget.dataset;
      setActive(Number(index));
    },
    []
  );

  const finishSearch = useCallback(() => {
    setQuery("");
    setActive(0);
    props.onClose();
  }, [props]);

  const handleKeyDown = useCallback(
    function <T>(e: KeyboardEvent<T>) {
      switch (e.key) {
        case "ArrowDown": {
          if (active + 1 < results.length) {
            const el = ulRef.current?.querySelector<HTMLAnchorElement>(
              `li:nth-of-type(${active + 2}) > a`
            );
            if (el) {
              e.preventDefault();
              handleActive({ currentTarget: el });
              el.focus();
            }
          }
          break;
        }
        case "ArrowUp": {
          if (active - 1 >= 0) {
            const el = ulRef.current?.querySelector<HTMLAnchorElement>(
              `li:nth-of-type(${active}) > a`
            );
            if (el) {
              e.preventDefault();
              handleActive({ currentTarget: el });
              el.focus();
            }
          }
          break;
        }
        case "Enter": {
          const result = results[active];
          if (result) {
            e.preventDefault();
            router.push(result.url);
            finishSearch();
          }
          break;
        }
      }
    },
    [active, results, router, handleActive, finishSearch]
  );

  useEffect(() => {
    if (!props.show) setQuery("");
  }, [query, props.show]);

  return (
    <Modal {...props}>
      <SearchInput
        onKeyDown={handleKeyDown}
        block
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value);
        }}
      />
      {results.length > 0 && (
        <ul className="search-result" ref={ulRef}>
          {results.map((result, i) => {
            return (
              <li
                key={`${result.url}-${i}`}
                className={`search-result-item ${active === i ? "active" : ""}`}
              >
                <ResultItem
                  data-index={i}
                  href={result.url}
                  result={result}
                  onClick={finishSearch}
                  onKeyDown={handleKeyDown}
                  onFocus={handleActive}
                  onMouseMove={handleActive}
                  query={query}
                />
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
};

export default ModalSearch;
