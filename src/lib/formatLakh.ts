import { formatInr, formatInt, formatPct } from "./format";

export { formatInr, formatInt, formatPct };

/** Compact Indian lakh label e.g. ₹4.2L */
export function formatLakhShort(n: number): string {
  const lakhs = n / 100000;
  const rounded = Math.round(lakhs * 10) / 10;
  return `₹${rounded}L`;
}
