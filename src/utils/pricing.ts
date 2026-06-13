export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export const getEffectivePrice = (mrp: number, discountedPrice: number | null): number =>
  discountedPrice != null ? discountedPrice : mrp;

export const hasDiscount = (mrp: number, discountedPrice: number | null): boolean =>
  discountedPrice != null && discountedPrice < mrp;
