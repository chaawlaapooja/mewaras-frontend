import type { Product, ProductSortOption } from '@/types/product';
import { getEffectivePrice } from '@/utils/pricing';

const getSortablePrice = (product: Product): number =>
  getEffectivePrice(product.mrp, product.discountedPrice) ?? Number.POSITIVE_INFINITY;

export const sortProducts = (products: Product[], sort: ProductSortOption): Product[] => {
  const sorted = [...products];

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => getSortablePrice(a) - getSortablePrice(b));
    case 'price-desc':
      return sorted.sort((a, b) => getSortablePrice(b) - getSortablePrice(a));
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      );
  }
};
