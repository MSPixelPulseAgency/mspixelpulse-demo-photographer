"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Search, ArrowUpRight } from "lucide-react";
import { searchIndex } from "@/data/discovery";
import {
  normalize,
  searchContent,
  searchTerms,
  nextSuggestion,
} from "@/data/discovery-engine";
export function MatchingText({ text, query }: { text: string; query: string }) {
  const terms = searchTerms(query);
  if (!terms.length) return <>{text}</>;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp("(" + escaped.join("|") + ")", "gi"));
  return (
    <>
      {parts.map((part, i) =>
        terms.includes(normalize(part)) ? <mark key={i}>{part}</mark> : part,
      )}
    </>
  );
}
const excerpt = (text: string) =>
  text.length > 105 ? text.slice(0, 105).replace(/\s+\S*$/, "") + "…" : text;
export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null),
    input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(""),
    [active, setActive] = useState(-1);
  const results = searchContent(searchIndex, query),
    suggestions = query
      ? results.slice(0, 8)
      : searchIndex
          .filter((i) => i.kind === "Collection" || i.kind === "Film")
          .slice(0, 6);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    input.current?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
      previous?.focus();
    };
  }, []);
  useEffect(() => {
    if (active >= 0)
      dialog.current
        ?.querySelector("#suggestion-" + active)
        ?.scrollIntoView({ block: "nearest", behavior: "auto" });
  }, [active]);
  function close() {
    dialog.current?.close();
    onClose();
  }
  return (
    <dialog
      ref={dialog}
      className="search-overlay glass-modal"
      aria-labelledby="search-heading"
      onCancel={close}
    >
      <div className="drawer-top">
        <div>
          <span className="eyebrow">An invitation to explore</span>
          <h2 id="search-heading">Find your inspiration.</h2>
        </div>
        <button aria-label="Close search" onClick={close}>
          <X />
        </button>
      </div>
      <div className="global-search-field">
        <Search size={22} aria-hidden />
        <label className="sr-only" htmlFor="global-search">
          Search stories, films, services
        </label>
        <input
          ref={input}
          id="global-search"
          role="combobox"
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-expanded="true"
          aria-activedescendant={
            active >= 0 ? "suggestion-" + active : undefined
          }
          value={query}
          maxLength={160}
          placeholder="Search stories, films, services…"
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          onKeyDown={(e) => {
            if (
              suggestions.length &&
              (e.key === "ArrowDown" || e.key === "ArrowUp")
            ) {
              e.preventDefault();
              setActive((i) =>
                nextSuggestion(
                  i,
                  e.key === "ArrowDown" ? 1 : -1,
                  suggestions.length,
                ),
              );
            }
            if (e.key === "Enter" && suggestions.length) {
              e.preventDefault();
              dialog.current
                ?.querySelector<HTMLAnchorElement>(
                  "#suggestion-" + Math.max(active, 0) + " a",
                )
                ?.click();
            }
          }}
        />
        {query && (
          <button
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setActive(-1);
              input.current?.focus();
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>
      <p className="search-count" role="status" aria-live="polite">
        {query
          ? `${results.length} ${results.length === 1 ? "match" : "matches"} · ${suggestions.length} suggestions`
          : "A few places to begin"}
        <span>↑ ↓ to explore · Enter to open</span>
      </p>
      <ul
        id="search-suggestions"
        role="listbox"
        aria-label="Search suggestions"
        className="search-suggestions"
      >
        {suggestions.map((r, i) => (
          <li
            key={r.id}
            id={"suggestion-" + i}
            role="option"
            aria-selected={active === i}
            className={active === i ? "selected" : ""}
          >
            <Link
              prefetch={false}
              href={r.href}
              onClick={close}
              tabIndex={0}
              onFocus={() => setActive(i)}
            >
              <img
                src={r.image.replace(".webp", "-small.webp")}
                alt=""
                width={80}
                height={80}
              />
              <div>
                <span className="eyebrow">
                  {r.kind} {r.category && " / " + r.category}
                </span>
                <h3>
                  <MatchingText text={r.title} query={query} />
                </h3>
                <p>
                  <MatchingText text={excerpt(r.description)} query={query} />
                </p>
              </div>
              <ArrowUpRight size={19} />
            </Link>
          </li>
        ))}
      </ul>
      {query && !suggestions.length && (
        <div className="discovery-empty">
          <h3>A different perspective?</h3>
          <p>Try “wedding film”, “pre-wedding” or “portrait”.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
          >
            Clear your search
          </button>
        </div>
      )}
      <p className="search-footnote">
        Collections, stock films, services, sample packages and journal notes.
        No search history is stored.
      </p>
    </dialog>
  );
}
