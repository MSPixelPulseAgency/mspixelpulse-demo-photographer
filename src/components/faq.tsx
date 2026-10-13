"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/site";
export function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <div className="faqs">
      {faqs.map(([q, a], i) => (
        <div className="faq" key={q}>
          <h3>
            <button
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
              aria-controls={"faq-" + i}
            >
              {q}
              {active === i ? <Minus size={18} /> : <Plus size={18} />}
            </button>
          </h3>
          <div
            id={"faq-" + i}
            className={active === i ? "faq-answer expanded" : "faq-answer"}
          >
            <p>{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
