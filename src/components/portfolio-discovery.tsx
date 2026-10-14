"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { portfolioItems } from "@/data/discovery";
import { discover } from "@/data/discovery-engine";
import { photo } from "@/data/media";
import {
  useDiscovery,
  DiscoveryControls,
  EmptyState,
  ResultCounter,
} from "./discovery-controls";
import { usePhotoViewer } from "./gallery";
import { Picture } from "./ui";
import { Film } from "./film";
export default function PortfolioDiscovery() {
  const { state, update, reset } = useDiscovery(portfolioItems);
  const rows = discover(portfolioItems, state);
  const [limit, setLimit] = useState(24);
  const photos = rows
    .filter((r) => r.kind === "Frame")
    .map((r) => photo(r.photoName!));
  const { open, viewer } = usePhotoViewer(photos);
  const signature = JSON.stringify(state);
  const [previous, setPrevious] = useState(signature);
  if (previous !== signature) {
    setPrevious(signature);
    setLimit(24);
  }
  return (
    <section id="discovery" className="section portfolio-discovery">
      <div className="discovery-heading">
        <div>
          <span className="eyebrow">Stories. Still frames. Moving images.</span>
          <h2>
            Find what <em>moves you.</em>
          </h2>
        </div>
        <p>
          Licensed stock inspiration.
          <br />A fictional studio’s visual perspective.
        </p>
      </div>
      <DiscoveryControls
        items={portfolioItems}
        state={state}
        update={update}
        reset={reset}
        advanced
      />
      <ResultCounter count={rows.length} shown={Math.min(rows.length, limit)} />
      <div className="portfolio-grid" key={signature}>
        {rows.slice(0, limit).map((r, i) =>
          r.kind === "Film" ? (
            <div
              className="portfolio-film"
              id={
                i === rows.findIndex((x) => x.kind === "Film")
                  ? "films"
                  : undefined
              }
              key={r.id}
            >
              <Film id={r.filmId!} title={r.title} />
            </div>
          ) : r.kind === "Collection" ? (
            <Link
              prefetch={false}
              className="discovery-card story-card focus-frame"
              data-shutter="true"
              key={r.id}
              href={r.href}
            >
              <div className="image-wrap">
                <Picture name={r.photoName!} />
                <span className="focus-brackets" aria-hidden />
              </div>
              <span className="eyebrow">Collection / {r.category}</span>
              <h3>{r.title}</h3>
              <span className="text-link">
                Explore the story <ArrowUpRight size={16} />
              </span>
            </Link>
          ) : (
            <button
              className="discovery-card frame-card focus-frame"
              key={r.id}
              onClick={(e) => open(r.photoName!, e.currentTarget)}
              aria-label={"View " + r.title}
            >
              <div className="image-wrap">
                <Picture name={r.photoName!} />
                <span className="focus-brackets" aria-hidden />
                <Plus className="frame-plus" size={22} />
              </div>
              <span className="eyebrow">Frame / {r.category}</span>
              <h3>{r.title}</h3>
            </button>
          ),
        )}
      </div>
      {!rows.length && <EmptyState reset={reset} />}{" "}
      {rows.length > limit && (
        <div className="load-more">
          <button className="action" onClick={() => setLimit((n) => n + 24)}>
            Explore 24 more <Plus size={18} />
          </button>
        </div>
      )}
      {viewer}
    </section>
  );
}
