"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="page-intro error-page" role="alert">
      <span className="eyebrow">A moment to pause</span>
      <h1>
        This frame
        <br />
        didn’t quite load.
      </h1>
      <p>Please try again, or return to the beginning.</p>
      <button className="action" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
