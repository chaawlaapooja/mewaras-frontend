import type { StrapiMedia } from './strapi';

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  products?: ProductRef[];
}

export interface ProductRef {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  active: boolean;
  featured: boolean;
  mrp: number;
  discountedPrice: number | null;
  images?: StrapiMedia[];
}
