"use client";
import { packages, homepagePackageIds } from "@/data/pricing";
import { Picture, Heading, Action } from "./ui";
import { Price, PricingNotice } from "./currency";
export function HomePricing() {
  return (
    <section
      className="section home-pricing"
      aria-labelledby="home-pricing-heading"
    >
      <div className="section-line">
        <Heading
          eyebrow="Collections / A thoughtful beginning"
          title={
            <span id="home-pricing-heading">
              An Investment <em>in Your Story.</em>
            </span>
          }
          text="Thoughtfully crafted collections for moments worth remembering."
        />
        <Action href="/investment">Explore all collections</Action>
      </div>
      <div className="home-pricing-composition">
        {homepagePackageIds.map((id, index) => {
          const p = packages.find((p) => p.id === id)!;
          return (
            <article
              key={p.id}
              className={`home-collection reveal home-collection-${index}`}
            >
              <div className="home-collection-image">
                <Picture name={p.image} />
                <span>
                  0{index + 1} / {p.tag}
                </span>
              </div>
              <div className="home-collection-copy">
                <h3>{p.title}</h3>
                <p className="home-collection-price">
                  Starting at <Price id={p.priceId} />
                </p>
                <p>
                  {p.duration} ·{" "}
                  {index === 2
                    ? "Edited gallery & highlight film"
                    : "Edited gallery & thoughtful guidance"}
                  .
                </p>
                <Action href={"/investment?q=" + encodeURIComponent(p.title)}>
                  Explore Packages
                </Action>
              </div>
            </article>
          );
        })}
      </div>
      <PricingNotice />
    </section>
  );
}
