import type { ProductFilters } from '@/types/product';

export const queryKeys = {
  categories: {
    all: ['categories'] as const,
    detail: (slug: string) => ['categories', slug] as const,
  },
  products: {
    all: ['products'] as const,
    list: (filters: ProductFilters) => ['products', 'list', filters] as const,
    detail: (slug: string) => ['products', slug] as const,
    featured: ['products', 'featured'] as const,
  },
  settings: {
    all: ['website-settings'] as const,
  },
} as const;
