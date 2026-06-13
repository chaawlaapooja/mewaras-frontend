import type React from 'react';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCard {
  id: string;
  src: string;
  alt: string;
  rotation: number;
}

interface ImageCarouselHeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick?: () => void;
  images: ImageCard[];
  features?: Array<{
    title: string;
    description: string;
  }>;
}

export function ImageCarouselHero({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  images,
  features = [
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
  ],
}: ImageCarouselHeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotatingCards, setRotatingCards] = useState<number[]>([]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRotatingCards((prev) => prev.map((value) => (value + 0.5) % 360));
    }, 50);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (images.length === 0) {
      setRotatingCards([]);
      return;
    }

    setRotatingCards(images.map((_, index) => index * (360 / images.length)));
  }, [images.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-b from-background via-background to-background">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="relative mb-12 h-96 w-full max-w-6xl sm:mb-16 sm:h-[500px]"
          onMouseMove={handleMouseMove}
        >
          <div className="perspective-[1000px] absolute inset-0 flex items-center justify-center">
            {images.map((image, index) => {
              const angle = (rotatingCards[index] || 0) * (Math.PI / 180);
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const perspectiveX = (mousePosition.x - 0.5) * 20;
              const perspectiveY = (mousePosition.y - 0.5) * 20;

              return (
                <div
                  key={image.id}
                  className="absolute h-40 w-32 transition-all duration-300 sm:h-48 sm:w-40"
                  style={{
                    transform: `
                      translate(${x}px, ${y}px)
                      rotateX(${perspectiveY}deg)
                      rotateY(${perspectiveX}deg)
                      rotateZ(${image.rotation}deg)
                    `,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={cn(
                      'group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl shadow-2xl',
                      'transition-all duration-300 hover:scale-110 hover:shadow-primary/20',
                    )}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src={image.src || '/placeholder-product.svg'}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-20 mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">{subtitle}</p>
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

        <div className="relative z-20 mt-12 grid w-full max-w-4xl grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3 sm:gap-8">
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
      </div>
    </div>
  );
}
