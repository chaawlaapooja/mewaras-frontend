import { apiClient } from '@/services/api-client';
import type { WebsiteSettings } from '@/types/settings';
import type { StrapiSingleResponse } from '@/types/strapi';

export const settingsService = {
  async get(): Promise<WebsiteSettings | null> {
    const { data } = await apiClient.get<StrapiSingleResponse<WebsiteSettings>>(
      '/api/website-setting',
      {
        params: {
          populate: ['heroImages'],
        },
      },
    );
    return data.data ?? null;
  },
};
