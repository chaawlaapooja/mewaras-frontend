import { apiClient } from '@/services/api-client';
import type { Category } from '@/types/category';
import type { StrapiListResponse, StrapiSingleResponse } from '@/types/strapi';

const categoryPopulate = {
  populate: {
    products: {
      filters: { active: true },
      populate: ['images'],
    },
  },
};

export const categoryService = {
  async getAll(activeOnly = true): Promise<Category[]> {
    const { data } = await apiClient.get<StrapiListResponse<Category>>('/api/categories', {
      params: {
        sort: 'name:asc',
        ...(activeOnly ? { filters: { active: true } } : {}),
      },
    });
    return data.data;
  },

  async getBySlug(slug: string): Promise<Category | null> {
    const { data } = await apiClient.get<StrapiListResponse<Category>>('/api/categories', {
      params: {
        filters: { slug, active: true },
        ...categoryPopulate,
      },
    });
    return data.data[0] ?? null;
  },

  async getByDocumentId(documentId: string): Promise<Category | null> {
    const { data } = await apiClient.get<StrapiSingleResponse<Category>>(
      `/api/categories/${documentId}`,
      { params: categoryPopulate },
    );
    return data.data ?? null;
  },
};
