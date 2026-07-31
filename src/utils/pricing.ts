export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const getEffectivePrice = (
  mrp?: number | null,
  discountedPrice?: number | null,
): number | null => {
  if (discountedPrice != null) return discountedPrice;
  if (mrp != null) return mrp;
  return null;
};

export const hasDiscount = (mrp?: number | null, discountedPrice?: number | null): boolean =>
  mrp != null && discountedPrice != null && discountedPrice < mrp;

export const hasPrice = (mrp?: number | null, discountedPrice?: number | null): boolean =>
  getEffectivePrice(mrp, discountedPrice) != null;
