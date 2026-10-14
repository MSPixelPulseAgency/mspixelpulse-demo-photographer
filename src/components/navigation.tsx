"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Search,
  Images,
  Camera,
  UserRound,
  Sparkles,
  Diamond,
  BookOpen,
  House,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { Brand } from "./brand";
import dynamic from "next/dynamic";
const SearchOverlay = dynamic(() => import("./search-overlay"), { ssr: false });
import { nav } from "@/data/navigation";
const navigationIcons: Record<string, LucideIcon> = {
  Home: House,
  Portfolio: Images,
  Services: Camera,
  About: UserRound,
  Experience: Sparkles,
  Investment: Diamond,
  Journal: BookOpen,
  Contact: MessageCircle,
};
function NavigationIcon({ label }: { label: string }) {
  const Icon = navigationIcons[label];
  return (
    <Icon
      className="navigation-icon"
      size={17}
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
}
export default function Navigation() {
  const path = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
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
          <Brand />
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
              <NavigationIcon label={n} />
              {n}
            </Link>
          ))}
        </nav>
        <button
          className="header-search"
          aria-label="Open search"
          aria-haspopup="dialog"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen(true)}
        >
          <Search size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <Link prefetch={false} href="/contact" className="header-inquire">
          Inquire <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
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
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Site navigation"
        onCancel={close}
      >
        <div className="drawer-top">
          <span className="wordmark">
            <Brand compact />
          </span>
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
              aria-current={
                (i === 0 ? path === "/" : path.startsWith("/" + n.toLowerCase()))
                  ? "page"
                  : undefined
              }
            >
              <NavigationIcon label={n} />
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
