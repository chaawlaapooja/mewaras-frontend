import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import { getImageUrl, getVideoUrl } from '@/utils/cloudinary';
import type { StrapiMedia } from '@/types/strapi';

interface HeroVideoHeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick?: () => void;
  heroVideo: StrapiMedia;
  heroVideoPoster?: StrapiMedia | null;
  fallbackPosterImage?: StrapiMedia | null;
  features?: Array<{
    title: string;
    description: string;
  }>;
}

export function HeroVideoHero({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  heroVideo,
  heroVideoPoster,
  fallbackPosterImage,
  features = [],
}: HeroVideoHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const videoUrl = getVideoUrl(heroVideo);
  const posterUrl =
    getImageUrl(heroVideoPoster, 1920) ?? getImageUrl(fallbackPosterImage, 1920) ?? undefined;
  const shouldAutoplay = !prefersReducedMotion;

  if (!videoUrl) return null;

  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        {shouldAutoplay ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl}
            className="h-full w-full object-cover"
            aria-hidden="true"
          >
            <source src={videoUrl} type={heroVideo.mime ?? 'video/mp4'} />
          </video>
        ) : (
          <img
            src={posterUrl ?? '/placeholder-product.svg'}
            alt=""
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background/90" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-between px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-balance text-4xl leading-tight font-semibold text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-balance text-lg text-muted-foreground sm:text-xl">{description}</p>
          <button
            type="button"
            onClick={onCtaClick}
            className={cn(
              'group mt-8 inline-flex items-center gap-2 rounded-full px-8 py-3',
              'bg-primary font-medium text-primary-foreground',
              'transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20',
              'active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            )}
          >
            {ctaText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {features.length > 0 ? (
          <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3 sm:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={cn(
                  'rounded-xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm',
                  'transition-all duration-300 hover:border-border hover:bg-card/80',
                  'group',
                )}
              >
                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
