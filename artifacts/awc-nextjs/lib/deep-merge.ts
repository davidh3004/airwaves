/** Deep-merge `patch` into `base`. Arrays and primitives from patch replace entirely. */
export function deepMerge<T extends object>(base: T, patch: Partial<T>): T {
  const out = { ...base } as T;
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const pv = patch[key];
    if (pv === undefined) continue;
    const bv = base[key];
    if (
      pv !== null &&
      typeof pv === "object" &&
      !Array.isArray(pv) &&
      bv !== null &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      (out as Record<string, unknown>)[key as string] = deepMerge(
        bv as object,
        pv as object,
      );
    } else {
      (out as Record<string, unknown>)[key as string] = pv;
    }
  }
  return out;
}
