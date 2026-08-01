import { STRAPI_URL } from '@/constants/config';
import type { StrapiMedia } from '@/types/strapi';

const isCloudinaryUrl = (url: string): boolean => url.includes('res.cloudinary.com');

export const resolveMediaUrl = (url: string): string => {
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

export const getOptimizedImageUrl = (
  media: StrapiMedia | undefined | null,
  width = 800,
): string => {
  if (!media?.url) return '/placeholder-product.svg';

  const absoluteUrl = resolveMediaUrl(media.url);

  if (!isCloudinaryUrl(absoluteUrl)) {
    return absoluteUrl;
  }

  return absoluteUrl.replace('/upload/', `/upload/c_fill,w_${width},q_auto,f_auto/`);
};

export const getVideoUrl = (media: StrapiMedia | null | undefined): string | null => {
  if (!media?.url) return null;
  return resolveMediaUrl(media.url);
};

export const getImageUrl = (
  media: StrapiMedia | null | undefined,
  width = 800,
): string | null => {
  if (!media?.url) return null;
  return getOptimizedImageUrl(media, width);
};
