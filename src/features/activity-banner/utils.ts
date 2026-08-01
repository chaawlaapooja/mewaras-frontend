import {
  ACTIVITY_BANNER_LOCATIONS,
  ACTIVITY_BANNER_MINUTES_AGO,
  ACTIVITY_BANNER_VISIBLE_MAX_MS,
  ACTIVITY_BANNER_VISIBLE_MIN_MS,
} from '@/features/activity-banner/constants';
import type { Product } from '@/types/product';
import { getImageUrl } from '@/utils/cloudinary';

export interface ActivityBannerMessage {
  id: string;
  text: string;
  minutesAgo: number;
  imageUrl?: string;
  imageAlt?: string;
}

const pickRandom = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const getVisibleDurationMs = (): number =>
  ACTIVITY_BANNER_VISIBLE_MIN_MS +
  Math.floor(Math.random() * (ACTIVITY_BANNER_VISIBLE_MAX_MS - ACTIVITY_BANNER_VISIBLE_MIN_MS + 1));

export const buildActivityBannerMessage = (products: Product[]): ActivityBannerMessage | null => {
  const location = pickRandom([...ACTIVITY_BANNER_LOCATIONS]);
  const minutesAgo = pickRandom([...ACTIVITY_BANNER_MINUTES_AGO]);
  const validProducts = products.filter((product) => product.name?.trim());

  const useExploringMessage = validProducts.length > 0 && Math.random() >= 0.5;

  if (useExploringMessage) {
    const product = pickRandom(validProducts);
    const imageUrl = getImageUrl(product.images?.[0], 120);

    return {
      id: `${location}-${product.documentId}-${Date.now()}`,
      text: `Someone in ${location} bought ${product.name.trim()}`,
      minutesAgo,
      ...(imageUrl ? { imageUrl, imageAlt: product.name.trim() } : {}),
    };
  }

  return {
    id: `${location}-popular-${Date.now()}`,
    text: `Mewa Ras products are popular with customers in ${location}`,
    minutesAgo,
  };
};
