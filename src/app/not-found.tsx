import { Action } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="page-intro error-page">
      <span className="eyebrow">404 / A frame out of place</span>
      <h1>
        Let’s find your way
        <br />
        <em>back to the story.</em>
      </h1>
      <p>This page could not be found.</p>
      <Action href="/">Return to the beginning</Action>
    </section>
  );
}
