/**
 * Shared formatting utilities. Every place in the UI that renders
 * money, a percentage, a date or a status label goes through one of
 * these — never hardcode a currency symbol or a date format inline.
 */

/**
 * DRF `DecimalField`s serialize as strings. Every numeric field
 * coming off the API should be passed through this before use.
 */
export function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const num = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(num) ? num : 0;
}

const currencyFormatters = new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(currency: string): Intl.NumberFormat {
  const key = currency.toUpperCase();
  let formatter = currencyFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: key,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    currencyFormatters.set(key, formatter);
  }
  return formatter;
}

/**
 * Format a monetary amount. Defaults to NGN (the demo project's
 * currency) but always pass the project's actual `currency` field
 * when you have it, so multi-currency projects render correctly.
 */
export function formatCurrency(
  value: string | number | null | undefined,
  currency = "NGN",
): string {
  const amount = toNumber(value);
  try {
    return getCurrencyFormatter(currency).format(amount);
  } catch {
    // Unknown/unsupported ISO currency code — fall back to a plain
    // number with the raw currency code prefixed rather than throwing.
    return `${currency} ${amount.toLocaleString("en-NG")}`;
  }
}

/**
 * Compact form for tight spaces (KPI cards): ₦500M instead of
 * ₦500,000,000.
 */
export function formatCurrencyCompact(
  value: string | number | null | undefined,
  currency = "NGN",
): string {
  const amount = toNumber(value);
  const symbol = currency.toUpperCase() === "NGN" ? "₦" : `${currency} `;
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";

  if (abs >= 1_000_000_000)
    return `${sign}${symbol}${(abs / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000)
    return `${sign}${symbol}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${symbol}${(abs / 1_000).toFixed(1)}K`;
  return `${sign}${symbol}${abs.toFixed(0)}`;
}

/**
 * Format a percentage value. Backend percentages are plain numbers
 * (e.g. "62.00" meaning 62%), not fractions — do not multiply by 100.
 */
export function formatPercent(
  value: string | number | null | undefined,
  fractionDigits = 0,
): string {
  return `${toNumber(value).toFixed(fractionDigits)}%`;
}

/**
 * Format a variance value with an explicit sign, so "+3%" and "-3%"
 * are never ambiguous with a plain "3%".
 */
export function formatVariance(
  value: string | number | null | undefined,
  fractionDigits = 0,
): string {
  const num = toNumber(value);
  const sign = num > 0 ? "+" : "";
  return `${sign}${num.toFixed(fractionDigits)}%`;
}

export type VarianceTone = "positive" | "negative" | "neutral";

/**
 * Which way a variance should read visually. `favorable` controls
 * whether a positive number is good news (e.g. schedule ahead) or
 * bad news (e.g. cost overrun) — callers must specify it explicitly
 * rather than the util guessing from context.
 */
export function varianceTone(
  value: string | number | null | undefined,
  favorable: "positive" | "negative",
): VarianceTone {
  const num = toNumber(value);
  if (num === 0) return "neutral";
  const isPositive = num > 0;
  if (favorable === "positive") return isPositive ? "positive" : "negative";
  return isPositive ? "negative" : "positive";
}

/**
 * Format an ISO date string for display. Returns "—" for
 * null/undefined/invalid input rather than "Invalid Date".
 */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Relative "time ago" for last-update columns, falling back to a
 * plain date beyond 30 days so it doesn't read "2 months ago".
 */
export function formatRelativeDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? "s" : ""} ago`;
  return formatDate(value);
}

/**
 * Turn a backend status/health code (e.g. "ON_HOLD",
 * "attention_required") into a human label ("On hold", "Attention
 * required"). Unknown values still render sensibly instead of
 * "undefined" or the raw code.
 */
export function formatStatusLabel(value: string | null | undefined): string {
  if (!value) return "—";
  return value
    .toLowerCase()
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}