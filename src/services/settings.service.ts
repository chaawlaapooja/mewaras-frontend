import { apiClient } from '@/services/api-client';
import type { WebsiteSettings } from '@/types/settings';
import type { StrapiSingleResponse } from '@/types/strapi';

const normalizeWebsiteSettings = (settings: WebsiteSettings): WebsiteSettings => ({
  ...settings,
  heroImages: settings.heroImages ?? [],
  heroVideo: settings.heroVideo ?? null,
  heroVideoPoster: settings.heroVideoPoster ?? null,
});

export const settingsService = {
  async get(): Promise<WebsiteSettings | null> {
    const { data } = await apiClient.get<StrapiSingleResponse<WebsiteSettings>>(
      '/api/website-setting',
      {
        params: {
          populate: ['heroImages', 'heroVideo', 'heroVideoPoster'],
        },
      },
    );

    if (!data.data) return null;
    return normalizeWebsiteSettings(data.data);
  },
};
