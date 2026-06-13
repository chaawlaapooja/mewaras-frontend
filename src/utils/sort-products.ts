import type { Product, ProductSortOption } from '@/types/product';
import { getEffectivePrice } from '@/utils/pricing';

export const sortProducts = (products: Product[], sort: ProductSortOption): Product[] => {
  const sorted = [...products];

  switch (sort) {
    case 'price-asc':
      return sorted.sort(
        (a, b) =>
          getEffectivePrice(a.mrp, a.discountedPrice) - getEffectivePrice(b.mrp, b.discountedPrice),
      );
    case 'price-desc':
      return sorted.sort(
        (a, b) =>
          getEffectivePrice(b.mrp, b.discountedPrice) - getEffectivePrice(a.mrp, a.discountedPrice),
      );
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
};
