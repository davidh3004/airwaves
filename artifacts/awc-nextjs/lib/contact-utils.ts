/** Build a tel: href from a display phone string like (786) 362-3648 */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "tel:";
  return digits.length === 10 ? `tel:+1${digits}` : `tel:+${digits}`;
}
