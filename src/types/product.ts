import type { Category } from './category';
import type { StrapiMedia } from './strapi';

export interface CompositionItem {
  id?: number;
  name?: string;
  quantity?: number;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  mrp?: number | null;
  discountedPrice?: number | null;
  composition?: CompositionItem[] | null;
  images?: StrapiMedia[] | null;
  video?: StrapiMedia | null;
  featured?: boolean | null;
  active?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
  category?: Category | null;
}

export type ProductSortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

export interface ProductFilters {
  search?: string;
  categorySlug?: string;
  sort?: ProductSortOption;
  featured?: boolean;
  active?: boolean;
}
