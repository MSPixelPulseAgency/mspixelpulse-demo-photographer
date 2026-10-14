"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
// Next Link can change the query without changing the route or firing popstate.
// Keep the browser-local discovery store in sync with that navigation too.
export function DiscoveryUrlObserver() {
  const query = useSearchParams().toString();
  useEffect(() => {
    window.dispatchEvent(new Event("discoverychange"));
  }, [query]);
  return null;
}
