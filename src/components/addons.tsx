"use client";
import { optionalAddons } from "@/data/pricing";
import { Price } from "./currency";
export function Addons({ ids }: { ids?: string[] }) {
  return (
    <ul className="addon-prices">
      {optionalAddons
        .filter((a) => !ids || ids.includes(a.id))
        .map((a) => (
          <li key={a.id}>
            <span>{a.title}</span>
            <span>
              {a.priceId ? (
                <>
                  From <Price id={a.priceId} />
                </>
              ) : (
                "Custom Quote"
              )}
            </span>
          </li>
        ))}
    </ul>
  );
}
