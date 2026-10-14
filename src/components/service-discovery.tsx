"use client";
import { services } from "@/data/site";
import { serviceItems } from "@/data/discovery";
import { discover } from "@/data/discovery-engine";
import {
  useDiscovery,
  DiscoveryControls,
  EmptyState,
  ResultCounter,
} from "./discovery-controls";
import { Picture, Action } from "./ui";
import { Film } from "./film";
const sorts = [
  ["featured", "Featured"],
  ["category", "Category"],
  ["az", "Alphabetical"],
];
export default function ServiceDiscovery() {
  const { state, update, reset } = useDiscovery(serviceItems, sorts),
    rows = discover(serviceItems, state);
  return (
    <section className="section services-full">
      <DiscoveryControls
        items={serviceItems}
        state={state}
        update={update}
        reset={reset}
        sorts={sorts}
        label="Search services"
      />
      <ResultCounter count={rows.length} />
      {rows.map((r) => {
        const s = services.find((s) => "service-" + s.number === r.id);
        return (
          <article id={r.id} className="service-detail" key={r.id}>
            {r.id === "service-05" ? (
              <Film id="the-preparation" title="Before the first look" />
            ) : r.id === "service-06" ? (
              <Film
                id="gathering-in-motion"
                title="The atmosphere of an evening"
              />
            ) : (
              <Picture name={s!.image} />
            )}
            <div>
              <span className="eyebrow">
                {r.category} / The signature offering
              </span>
              <h2>{r.title}</h2>
              <p className="lead">
                {s?.text || "Motion with a purpose. Stories made to connect."}
              </p>
              <ul>
                {(
                  s?.options || [
                    "Brand stories & creative campaigns",
                    "Corporate event highlight edits",
                    "Short social films",
                  ]
                ).map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <p>
                {s?.benefit ||
                  "A story-led edit, considered for the audience and format."}
              </p>
              <p className="fine-print">
                {s?.deliverable ||
                  "Illustrative offering. Licensed stock film, never presented as client work."}
              </p>
              <Action href={"/contact?service=" + encodeURIComponent(r.title)}>
                Inquire about this service
              </Action>
            </div>
          </article>
        );
      })}
      {!rows.length && <EmptyState reset={reset} />}
    </section>
  );
}
