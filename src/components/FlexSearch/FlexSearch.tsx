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
import Link from "next/link";
import { useRouter } from "next/navigation";
import Highlighter from "react-highlight-words";
import clsx from "clsx";

import SearchInput from "../SearchInput";
import Modal from "../Modal";

import "./style.scss";
import Anchor from "../Anchor";

type DocumentSearchResult = {
  result: string[];
  field: string;
};

type SearchResult = {
  resultType: string;
  paragraph?: string;
  content?: string;
} & Package;

type ResultItemProps = {
  query?: string;
  result: SearchResult;
} & ComponentProps<typeof Link>;

type FlexSearchModalProps = Omit<ComponentProps<typeof Modal>, "children">;

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
  let searchResult: SearchResult[] = [];

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

const ResultItem = ({ result, query, ...rest }: ResultItemProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Anchor ref={ref} style={{ display: "block" }} {...rest}>
      <div>
        <div>{result.package}</div>
        <Highlighter
          searchWords={query?.split(" ") || []}
          textToHighlight={result.content || result.package}
        />
      </div>
    </Anchor>
  );
};

const FlexSearchModal = ({ show, onClose, ...rest }: FlexSearchModalProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const ulRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
          } else {
            inputRef.current?.focus();
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
    if (!show) finishSearch();
  }, [show, finishSearch]);

  return (
    <Modal show={show} onClose={onClose} {...rest}>
      <SearchInput
        block
        ref={inputRef}
        onKeyDown={handleKeyDown}
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      {results.length > 0 && (
        <ul className="search-result" ref={ulRef}>
          {results.map((result, i) => {
            return (
              <li
                key={`${result.url}-${i}`}
                className={clsx("search-result-item", { active: active === i })}
              >
                <ResultItem
                  data-index={i}
                  href={result.url}
                  result={result}
                  query={query}
                  onClick={finishSearch}
                  onKeyDown={handleKeyDown}
                  onFocus={handleActive}
                  onMouseMove={handleActive}
                />
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
};

export default FlexSearchModal;
