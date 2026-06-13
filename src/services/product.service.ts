import { apiClient } from '@/services/api-client';
import type { Product, ProductFilters } from '@/types/product';
import type { StrapiListResponse } from '@/types/strapi';
import { sortProducts } from '@/utils/sort-products';

const productPopulate = {
  populate: {
    images: true,
    video: true,
    category: true,
    composition: true,
  },
};

export const productService = {
  async getAll(filters: ProductFilters = {}): Promise<Product[]> {
    const strapiFilters: Record<string, unknown> = {
      active: filters.active ?? true,
    };

    if (filters.featured !== undefined) {
      strapiFilters.featured = filters.featured;
    }

    if (filters.categorySlug) {
      strapiFilters.category = { slug: filters.categorySlug };
    }

    if (filters.search) {
      strapiFilters.$or = [
        { name: { $containsi: filters.search } },
        { description: { $containsi: filters.search } },
      ];
    }

    const { data } = await apiClient.get<StrapiListResponse<Product>>('/api/products', {
      params: {
        filters: strapiFilters,
        ...productPopulate,
        pagination: { pageSize: 100 },
      },
    });

    const products = data.data;
    return filters.sort ? sortProducts(products, filters.sort) : products;
  },

  async getFeatured(): Promise<Product[]> {
    return this.getAll({ featured: true, sort: 'newest' });
  },

  async getBySlug(slug: string): Promise<Product | null> {
    const { data } = await apiClient.get<StrapiListResponse<Product>>('/api/products', {
      params: {
        filters: { slug, active: true },
        ...productPopulate,
      },
    });
    return data.data[0] ?? null;
  },
};
