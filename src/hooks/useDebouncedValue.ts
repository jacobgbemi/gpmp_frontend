import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value`, updated `delayMs` after the
 * last change. Use for search inputs so we don't refetch on every
 * keystroke.
 */
export function useDebouncedValue<T>(value: T, delayMs = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
