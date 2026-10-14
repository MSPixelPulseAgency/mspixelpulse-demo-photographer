"use client";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  createCurrencyStore,
  currencyStorageKey,
  type Currency,
} from "@/data/currency-store";
import {
  amountFor,
  formatPrice,
  pricingCatalog,
  pricingNotice,
  type PriceId,
} from "@/data/pricing";

const store = createCurrencyStore(
  () => (typeof window === "undefined" ? null : window.localStorage),
  (notify) => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === currencyStorageKey || event.key === null) notify();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  },
);
const CurrencyContext = createContext({
  currency: "CAD" as Currency,
  setCurrency: store.setCurrency,
});
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency: store.setCurrency }}
    >
      <span className="sr-only" role="status" aria-live="polite">
        Prices displayed in{" "}
        {currency === "CAD" ? "Canadian dollars (CAD)" : "US dollars (USD)"}.
      </span>
      {children}
    </CurrencyContext.Provider>
  );
}
export const useCurrency = () => useContext(CurrencyContext);
export function CurrencySelector({
  variant = "header",
}: {
  variant?: "header" | "drawer";
}) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    container.current
      ?.querySelector<HTMLButtonElement>(`[data-currency-option="${currency}"]`)
      ?.focus();
    const outside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", outside);
    return () => window.removeEventListener("pointerdown", outside);
  }, [open, currency]);
  return (
    <div
      ref={container}
      className={`currency-selector ${variant}-currency`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        ref={trigger}
        className="currency-trigger"
        aria-label={`Display currency: ${currency}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {variant === "drawer" && <span>Display currency</span>}
        <span>{currency}</span>
        <ChevronDown size={16} strokeWidth={1.8} aria-hidden />
      </button>
      {open && (
        <div
          className="currency-options"
          role="menu"
          aria-label="Display currency"
          onKeyDown={(e) => {
            const buttons = [
              ...e.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
            ];
            const index = buttons.indexOf(
              document.activeElement as HTMLButtonElement,
            );
            if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
              e.preventDefault();
              buttons[
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? 1
                    : (index + (e.key === "ArrowDown" ? 1 : -1) + 2) % 2
              ]?.focus();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              e.stopPropagation();
              close();
            }
          }}
        >
          {(["CAD", "USD"] as const).map((c) => (
            <button
              type="button"
              role="menuitemradio"
              tabIndex={-1}
              aria-checked={currency === c}
              data-currency-option={c}
              key={c}
              onClick={() => {
                setCurrency(c);
                close();
              }}
            >
              <span>
                {c}
                <small>{c === "CAD" ? "Canadian dollar" : "US dollar"}</small>
              </span>
              {currency === c && (
                <Check size={16} strokeWidth={1.8} aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export function CurrencySwitch() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="currency-switch" role="group" aria-label="Display currency">
      {(["CAD", "USD"] as const).map((c) => (
        <button
          type="button"
          key={c}
          aria-pressed={currency === c}
          onClick={() => setCurrency(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
export function Price({
  id,
  multiplier = 1,
  hourly = false,
}: {
  id: PriceId;
  multiplier?: number;
  hourly?: boolean;
}) {
  const { currency } = useCurrency(),
    amount = amountFor(id, currency, multiplier);
  return (
    <span
      key={currency}
      className="currency-price"
      data-price-id={id}
      data-currency={currency}
      data-amount={amount}
    >
      {formatPrice(amount, currency)}
      {hourly && pricingCatalog[id].unit === "hour" && <small> / hour</small>}
    </span>
  );
}
export function PricingNotice() {
  return (
    <p className="pricing-notice">
      {pricingNotice}
      <br />
      <span>
        Fictional studio · Separately configured CAD/USD examples, not live
        exchange rates. Taxes and destination travel excluded. No real booking
        is available.
      </span>
    </p>
  );
}
