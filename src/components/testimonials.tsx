import { Heading } from "./ui";
import { testimonials, testimonialNotice } from "@/data/testimonials";
function SampleQuote({
  item,
  featured = false,
}: {
  item: (typeof testimonials)[number];
  featured?: boolean;
}) {
  return (
    <figure
      className={`sample-quote reveal ${featured ? "featured-quote" : ""}`}
      data-sample-testimonial={item.id}
    >
      <span className="quote-mark" aria-hidden>
        “
      </span>
      <span className="eyebrow">{item.chapter}</span>
      <blockquote>{item.quote}</blockquote>
      <figcaption>
        <span className="quote-rule" aria-hidden />
        {item.label}
        <small>Illustrative studio story</small>
      </figcaption>
    </figure>
  );
}
export function Testimonials() {
  return (
    <section
      className="section sample-testimonials"
      aria-labelledby="testimonials-heading"
    >
      <Heading
        eyebrow="The feeling, remembered"
        title={
          <span id="testimonials-heading">
            Words That <em>Stay With Us.</em>
          </span>
        }
        text="Stories of love, laughter and beautifully remembered moments."
      />
      <p className="testimonial-disclosure">{testimonialNotice}</p>
      <div className="testimonial-composition">
        <SampleQuote item={testimonials[0]} featured />
        <div className="supporting-quotes">
          {testimonials.slice(1, 3).map((item) => (
            <SampleQuote key={item.id} item={item} />
          ))}
        </div>
      </div>
      <details className="more-sample-stories">
        <summary>
          Two more sample stories <span aria-hidden>+</span>
        </summary>
        <div>
          {testimonials.slice(3).map((item) => (
            <SampleQuote key={item.id} item={item} />
          ))}
        </div>
      </details>
    </section>
  );
}
