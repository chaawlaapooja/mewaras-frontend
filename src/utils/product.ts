import type { Product } from '@/types/product';

export const getProductPath = (product: Pick<Product, 'slug' | 'documentId'>): string =>
  `/products/${product.slug ?? product.documentId}`;

export const isProductVisible = (product: Pick<Product, 'active'>): boolean =>
  product.active !== false;
