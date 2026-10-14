export type Currency = "CAD" | "USD";
export const currencyStorageKey = "aurel-frame-currency";
export const parseCurrency = (value: unknown): Currency =>
  value === "USD" ? "USD" : "CAD";
type PreferenceStorage = Pick<Storage, "getItem" | "setItem">;

// The server always renders CAD. A failed/blocked storage write falls back to
// this session's preference, without breaking currency changes or the inquiry.
export function createCurrencyStore(
  storage: () => PreferenceStorage | null,
  watchStorage: (notify: () => void) => () => void = () => () => {},
) {
  let current: Currency = "CAD";
  let persistent = true;
  let unwatch: (() => void) | undefined;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());
  return {
    getServerSnapshot: (): Currency => "CAD",
    getSnapshot: (): Currency => {
      if (persistent) {
        try {
          const target = storage();
          if (target)
            current = parseCurrency(target.getItem(currencyStorageKey));
        } catch {
          persistent = false;
        }
      }
      return current;
    },
    setCurrency: (value: Currency) => {
      current = parseCurrency(value);
      try {
        storage()?.setItem(currencyStorageKey, current);
      } catch {
        persistent = false;
      }
      notify();
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      if (listeners.size === 1) unwatch = watchStorage(notify);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) {
          unwatch?.();
          unwatch = undefined;
        }
      };
    },
  };
}
