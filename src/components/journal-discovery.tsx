"use client";
import Link from "next/link";
import { articleItems } from "@/data/discovery";
import { discover } from "@/data/discovery-engine";
import {
  useDiscovery,
  DiscoveryControls,
  EmptyState,
  ResultCounter,
} from "./discovery-controls";
const sorts = [
  ["newest", "Newest first"],
  ["oldest", "Oldest first"],
  ["az", "Title A–Z"],
  ["za", "Title Z–A"],
];
export default function JournalDiscovery() {
  const { state, update, reset } = useDiscovery(articleItems, sorts),
    rows = discover(articleItems, { ...state, sort: state.sort || "newest" });
  return (
    <section className="section journal-discovery">
      <DiscoveryControls
        items={articleItems}
        state={state}
        update={update}
        reset={reset}
        sorts={sorts}
        label="Search journal"
      />
      <ResultCounter count={rows.length} />
      <div className="journal-grid">
        {rows.map((a) => (
          <Link
            prefetch={false}
            className="journal-card"
            href={a.href}
            key={a.id}
          >
            <div className="image-wrap">
              <img
                src={a.image}
                alt={a.title + " — stock editorial cover"}
                width={720}
                height={900}
                loading="lazy"
              />
            </div>
            <span className="eyebrow">{a.category} / Planning notes</span>
            <h2>{a.title}</h2>
            <p>{a.description}</p>
            <span className="text-link">Read the story ↗</span>
          </Link>
        ))}
      </div>
      {!rows.length && <EmptyState reset={reset} />}
    </section>
  );
}
