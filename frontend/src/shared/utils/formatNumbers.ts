/**
 * Format number as currency (e.g., "1.000,00 €")
 */
export function formatCurrency(
  value: number | undefined | null,
  options?: Intl.NumberFormatOptions
): string {
  if (value === undefined || value === null) {
    return "-";
  }

  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });

  return formatter.format(value);
}

/**
 * Format number as regular number (e.g., "1.000,00" without currency)
 */
export function formatNumber(
  value: number | undefined | null,
  options?: Intl.NumberFormatOptions
): string {
  if (value === undefined || value === null) {
    return "-";
  }

  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  });

  return formatter.format(value);
}

export function parseGermanNumber(value: string): number | null {
  if (!value) return null;
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? null : parsed;
}
