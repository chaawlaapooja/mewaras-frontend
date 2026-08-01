import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageCarouselHero } from '@/components/ui/ai-image-generator-hero';
import { HeroVideoHero } from '@/features/hero/components/hero-video-hero';
import { Skeleton } from '@/components/ui/skeleton';
import { useWebsiteSettings } from '@/hooks/use-settings';
import { getOptimizedImageUrl, getVideoUrl } from '@/utils/cloudinary';

const HERO_FEATURES = [
  {
    title: 'Premium Quality',
    description: 'Handpicked dry fruits and gifting essentials sourced for excellence.',
  },
  {
    title: 'Custom Hampers',
    description: 'Personalized collections tailored to every celebration.',
  },
  {
    title: 'Easy Ordering',
    description: 'Connect on WhatsApp for quick recommendations and assistance.',
  },
];

export function HeroCarousel() {
  const navigate = useNavigate();
  const { data: settings, isLoading, isError } = useWebsiteSettings();

  const images = useMemo(
    () =>
      (settings?.heroImages ?? [])
        .filter((image) => Boolean(image?.url))
        .map((image, index) => ({
          id: image.documentId,
          src: getOptimizedImageUrl(image, 800),
          alt: image.alternativeText ?? settings?.heroTitle ?? 'Hero image',
          rotation: index % 2 === 0 ? -6 : 6,
        })),
    [settings?.heroImages, settings?.heroTitle],
  );

  console.log(settings);
  const heroVideoUrl = settings?.heroVideo ? getVideoUrl(settings.heroVideo) : null;

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-20">
        <Skeleton className="h-[420px] w-full rounded-3xl md:h-[520px]" />
      </section>
    );
  }

  if (isError || !settings) {
    return (
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-4xl font-semibold md:text-5xl">Premium Gifting</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Configure hero content in the CMS to showcase your premium catalog.
        </p>
      </section>
    );
  }

  if (heroVideoUrl && settings.heroVideo) {
    return (
      <HeroVideoHero
        title={settings.heroTitle}
        subtitle="Luxury Gifting"
        description={settings.heroSubtitle}
        ctaText={settings.heroCtaText}
        onCtaClick={() => navigate(settings.heroCtaLink)}
        heroVideo={settings.heroVideo}
        heroVideoPoster={settings.heroVideoPoster}
        fallbackPosterImage={settings.heroImages[0] ?? null}
        features={HERO_FEATURES}
      />
    );
  }

  if (images.length === 0) {
    return (
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-4xl font-semibold md:text-5xl">{settings.heroTitle}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{settings.heroSubtitle}</p>
      </section>
    );
  }

  return (
    <ImageCarouselHero
      title={settings.heroTitle}
      description={settings.heroSubtitle}
      ctaText={settings.heroCtaText}
      onCtaClick={() => navigate(settings.heroCtaLink)}
      images={images}
      features={HERO_FEATURES}
    />
  );
}
