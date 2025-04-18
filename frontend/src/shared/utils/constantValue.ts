export const CARD_HEIGHT = "416px";

export const sanitizeFormikValues = (obj: Record<string, any>) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = value ?? "";
    return acc;
  }, {} as Record<string, any>);
};

export const safe = <T>(val: T | null | undefined, fallback: T): T =>
  val != null ? val : fallback;
