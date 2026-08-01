import type { StrapiMedia } from './strapi';

export interface WebsiteSettings {
  id: number;
  documentId: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroImages: StrapiMedia[];
  heroVideo?: StrapiMedia | null;
  heroVideoPoster?: StrapiMedia | null;
  businessPhone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  whatsappUrl: string;
  instagramUrl: string | null;
}
