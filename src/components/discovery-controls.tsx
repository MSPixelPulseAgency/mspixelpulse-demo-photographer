"use client";
import { useSyncExternalStore, useState, useRef } from "react";
import { Search, SlidersHorizontal, X, ArrowUpRight } from "lucide-react";
import type {
  ContentItem,
  DiscoveryState,
  FilterKey,
} from "@/data/discovery-engine";
import { defaultState, readState, writeState } from "@/data/discovery-engine";
export const standardSorts = [
  ["featured", "Featured first"],
  ["newest", "Newest first"],
  ["oldest", "Oldest first"],
  ["az", "Title A–Z"],
  ["za", "Title Z–A"],
];
const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  window.addEventListener("discoverychange", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("discoverychange", callback);
  };
};
const snapshot = () => window.location.search,
  serverSnapshot = () => "";
export function useDiscovery(
  items: ContentItem[],
  sorts: string[][] = standardSorts,
) {
  const query = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const state = readState(
    query,
    items,
    sorts.map((s) => s[0]),
  );
  function update(key: FilterKey, value: string, replace = false) {
    const next = {
      ...readState(
        window.location.search,
        items,
        sorts.map((s) => s[0]),
      ),
      [key]: value,
    };
    const params = writeState(next),
      url =
        window.location.pathname +
        (params ? "?" + params : "") +
        window.location.hash;
    window.history[replace ? "replaceState" : "pushState"](null, "", url);
    window.dispatchEvent(new Event("discoverychange"));
  }
  function reset() {
    window.history.pushState(
      null,
      "",
      window.location.pathname + window.location.hash,
    );
    window.dispatchEvent(new Event("discoverychange"));
  }
  return { state, update, reset };
}
export function SearchBar({
  value,
  onChange,
  label = "Search portfolio",
}: {
  value: string;
  onChange: (q: string) => void;
  label?: string;
}) {
  return (
    <div className="discovery-search">
      <Search size={19} aria-hidden />
      <label
        className="sr-only"
        htmlFor={"search-" + label.replaceAll(" ", "-")}
      >
        {label}
      </label>
      <input
        id={"search-" + label.replaceAll(" ", "-")}
        type="search"
        maxLength={160}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          label === "Search portfolio"
            ? "Search stories, films and frames…"
            : label + "…"
        }
      />
      {value && (
        <button
          aria-label={"Clear " + label.toLowerCase()}
          onClick={() => onChange("")}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
export function EmptyState({ reset }: { reset: () => void }) {
  return (
    <div className="discovery-empty">
      <Search size={30} aria-hidden />
      <h3>A different perspective?</h3>
      <p>No matches in this edit. Try a shorter search or remove a filter.</p>
      <button className="action" onClick={reset}>
        Explore everything <ArrowUpRight size={17} />
      </button>
    </div>
  );
}
export function ResultCounter({
  count,
  shown = count,
}: {
  count: number;
  shown?: number;
}) {
  return (
    <p className="result-counter" role="status" aria-live="polite">
      {shown < count ? `Showing ${shown} of ` : ""}
      {count} {count === 1 ? "result" : "results"}{" "}
      <span> / The Aurel edit</span>
    </p>
  );
}
export function DiscoveryControls({
  items,
  state,
  update,
  reset,
  sorts = standardSorts,
  label = "Search portfolio",
  advanced = false,
}: {
  items: ContentItem[];
  state: DiscoveryState;
  update: (key: FilterKey, value: string, replace?: boolean) => void;
  reset: () => void;
  sorts?: string[][];
  label?: string;
  advanced?: boolean;
}) {
  const [panel, setPanel] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  const unique = (
    key: "categories" | "styles" | "media" | "kind" | "location",
  ) =>
    [
      ...new Set(
        items.flatMap((i) =>
          key === "categories" || key === "styles"
            ? i[key]
            : i[key]
              ? [i[key] as string]
              : [],
        ),
      ),
    ].sort((a, b) => a.localeCompare(b));
  const categories = unique("categories"),
    active = (Object.keys(defaultState) as FilterKey[]).filter(
      (k) => state[k] && k !== "sort",
    );
  function closePanel() {
    dialog.current?.close();
    setPanel(false);
    trigger.current?.focus();
  }
  function openPanel() {
    dialog.current?.showModal();
    setPanel(true);
  }
  const select = (key: FilterKey, name: string, options: string[]) =>
    options.length > 1 ? (
      <label key={key} className="discovery-select">
        {name}
        <select
          value={state[key]}
          onChange={(e) => update(key, e.target.value)}
        >
          <option value="">All {name.toLowerCase()}</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
    ) : null;
  const options = (
    <>
      {select("style", "Styles", unique("styles"))}
      {select("media", "Media", unique("media"))}
      {select("type", "Content types", unique("kind"))}
      {unique("location").length > 0 &&
        select("location", "Locations", unique("location"))}
    </>
  );
  return (
    <div className="discovery-controls">
      <div className="discovery-toolbar">
        <SearchBar
          value={state.q}
          onChange={(q) => update("q", q, true)}
          label={label}
        />
        <label className="sort-control">
          Sort by
          <select
            value={state.sort || sorts[0][0]}
            onChange={(e) =>
              update(
                "sort",
                e.target.value === sorts[0][0] ? "" : e.target.value,
              )
            }
          >
            {sorts.map(([v, t]) => (
              <option key={v} value={v}>
                {t}
              </option>
            ))}
          </select>
        </label>
        {advanced && (
          <button
            className="filter-trigger glass-control"
            ref={trigger}
            onClick={openPanel}
            aria-haspopup="dialog"
            aria-expanded={panel}
          >
            <SlidersHorizontal size={18} /> Refine{" "}
            <span>
              {active.filter((k) => k !== "q" && k !== "category").length || ""}
            </span>
          </button>
        )}
      </div>
      {categories.length > 1 && (
        <div
          className="category-tabs"
          role="group"
          aria-label="Content categories"
        >
          <button
            aria-pressed={!state.category}
            onClick={() => update("category", "")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={state.category === c}
              onClick={() => update("category", c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      {active.length > 0 && (
        <div className="active-filters" aria-label="Active filters">
          {active.map((k) => (
            <button
              className="filter-chip"
              key={k}
              onClick={() => update(k, "")}
              aria-label={`Remove ${k === "q" ? "search" : k === "type" ? "content type" : k} filter: ${state[k]}`}
            >
              {state[k]}
              <X size={14} />
            </button>
          ))}
          <button className="clear-filters" onClick={reset}>
            Clear all
          </button>
        </div>
      )}
      {advanced && (
        <dialog
          ref={dialog}
          className="filter-dialog glass-modal"
          aria-label="Refine portfolio"
          onCancel={closePanel}
        >
          <div className="drawer-top">
            <h2>A considered edit.</h2>
            <button aria-label="Close filters" onClick={closePanel}>
              <X />
            </button>
          </div>
          <p>Find a feeling, a format or a favourite frame.</p>
          <div className="advanced-options">{options}</div>
          <div className="filter-actions">
            <button className="text-link" onClick={reset}>
              Clear all filters
            </button>
            <button className="action" onClick={closePanel}>
              View results <ArrowUpRight size={17} />
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}
