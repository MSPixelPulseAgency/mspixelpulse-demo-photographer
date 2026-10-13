"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "@/data/navigation";
export default function Navigation() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <header
        className={`site-header ${path === "/" ? "on-hero" : ""} ${scrolled ? "scrolled" : ""}`}
      >
        <Link
          prefetch={false}
          href="/"
          className="wordmark"
          title="Aurel Frame home"
        >
          <span>
            AUREL <i>FRAME</i>
          </span>
          <small>PHOTOGRAPHY & FILM</small>
        </Link>
        <nav aria-label="Main navigation">
          {nav.slice(1, -1).map((n) => (
            <Link
              prefetch={false}
              key={n}
              href={"/" + n.toLowerCase()}
              aria-current={
                path.startsWith("/" + n.toLowerCase()) ? "page" : undefined
              }
            >
              {n}
            </Link>
          ))}
        </nav>
        <Link prefetch={false} href="/contact" className="header-inquire">
          Inquire <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-trigger"
          ref={trigger}
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Open navigation"
        >
          <Menu />
        </button>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Site navigation"
        onCancel={close}
      >
        <div className="drawer-top">
          <span className="wordmark">AUREL FRAME</span>
          <button onClick={close} aria-label="Close navigation">
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {nav.map((n, i) => (
            <Link
              prefetch={false}
              key={n}
              href={i === 0 ? "/" : "/" + n.toLowerCase()}
              onClick={close}
            >
              <small>0{i + 1}</small>
              {n}
            </Link>
          ))}
        </nav>
        <p>Every Moment, Beautifully Remembered.</p>
        <span className="fine-print">
          An MSPixelPulse fictional studio concept.
        </span>
      </dialog>
    </>
  );
}
