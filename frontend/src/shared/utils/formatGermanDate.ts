// src/utils/formatGermanDate.ts
import { format } from "date-fns";
import { de } from "date-fns/locale";

/**
 * Format a given date string or Date object into "dd. MMMM yyyy" in German.
 */
export const formatGermanDate = (
  value: string | Date | null | undefined
): string => {
  if (!value) return "";
  try {
    const date = typeof value === "string" ? new Date(value) : value;
    return format(date, "dd. MMMM yyyy", { locale: de });
  } catch (error) {
    console.warn("Invalid date passed to formatGermanDate:", value);
    return "";
  }
};

// export const formatDate = (
//     value: string | Date | null | undefined,
//     pattern: string = "dd. MMMM yyyy",
//     locale: Locale = de
//   ): string => {
//     if (!value) return "";
//     try {
//       const date = typeof value === "string" ? new Date(value) : value;
//       return format(date, pattern, { locale });
//     } catch {
//       return "";
//     }
//   };
