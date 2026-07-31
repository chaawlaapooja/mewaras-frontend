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

const buildProductFilters = (filters: ProductFilters): Record<string, unknown> => {
  const conditions: Record<string, unknown>[] = [];

  if (filters.active !== undefined) {
    conditions.push({ active: filters.active });
  } else {
    conditions.push({ $or: [{ active: true }, { active: { $null: true } }] });
  }

  if (filters.featured !== undefined) {
    conditions.push({ featured: filters.featured });
  }

  if (filters.categorySlug) {
    conditions.push({ category: { slug: filters.categorySlug } });
  }

  if (filters.search) {
    conditions.push({
      $or: [
        { name: { $containsi: filters.search } },
        { description: { $containsi: filters.search } },
      ],
    });
  }

  if (conditions.length === 0) return {};
  if (conditions.length === 1) return conditions[0];
  return { $and: conditions };
};

export const productService = {
  async getAll(filters: ProductFilters = {}): Promise<Product[]> {
    const { data } = await apiClient.get<StrapiListResponse<Product>>('/api/products', {
      params: {
        filters: buildProductFilters(filters),
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
        filters: {
          $and: [
            { $or: [{ slug }, { documentId: slug }] },
            { $or: [{ active: true }, { active: { $null: true } }] },
          ],
        },
        ...productPopulate,
      },
    });
    return data.data[0] ?? null;
  },
};
