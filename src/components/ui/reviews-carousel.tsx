import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const FRAME_OFFSET = -36;
const FRAMES_VISIBLE_LENGTH = 3;

function clamp(val: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(val, min), max);
}

export interface Review {
  author: string;
  body: string;
  id: string | number;
  title: string;
}

interface ReviewCardProps {
  activeIndex: number;
  index: number;
  review: Review;
  totalCards: number;
}

function ReviewCard({ review, index, activeIndex, totalCards }: ReviewCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const offsetIndex = index - activeIndex;

  const blur = activeIndex > index ? 2 : 0;
  const opacity = activeIndex > index ? 0 : 1;
  const scale = shouldReduceMotion ? 1 : clamp(1 - offsetIndex * 0.08, [0.08, 2]);
  const y = shouldReduceMotion
    ? 0
    : clamp(offsetIndex * FRAME_OFFSET, [
        FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
        Number.POSITIVE_INFINITY,
      ]);

  const isActive = index === activeIndex;

  return (
    <motion.figure
      animate={{
        y,
        scale,
        transition: {
          type: 'spring',
          stiffness: 250,
          damping: 20,
          mass: 0.5,
        },
      }}
      className={cn(
        'absolute left-1/2 w-[calc(100%-1.5rem)] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg backdrop-blur-md sm:p-8',
      )}
      initial={false}
      style={{
        borderWidth: 1 / scale,
        willChange: 'opacity, filter, transform',
        filter: `blur(${blur}px)`,
        opacity,
        transitionProperty: 'opacity, filter',
        transitionDuration: shouldReduceMotion ? '0ms' : '250ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: totalCards - index,
        pointerEvents: isActive ? 'auto' : 'none',
        top: '50%',
      }}
    >
      <blockquote className="relative">
        <div className="absolute -left-2 -top-1 text-5xl leading-none text-foreground/10 sm:text-6xl">&ldquo;</div>
        <p className="relative text-base leading-relaxed text-muted-foreground sm:text-lg">{review.body}</p>
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-2 border-t border-border/40 pt-5 sm:mt-6 sm:pt-6">
        <div className="flex flex-col gap-0.5">
          <span className="font-heading text-sm font-semibold text-foreground sm:text-base">{review.author}</span>
          {review.title ? (
            <span className="text-sm text-muted-foreground">{review.title}</span>
          ) : null}
        </div>
      </figcaption>
    </motion.figure>
  );
}

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

  return (
    <button
      aria-label={direction === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
      className={cn(
        'group relative z-0 flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 backdrop-blur-sm transition-all duration-200 sm:h-10 sm:w-10',
        'cursor-pointer hover:border-primary/30 hover:bg-background/70 hover:shadow-lg',
      )}
      onClick={onClick}
      type="button"
    >
      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary sm:h-5 sm:w-5" />
    </button>
  );
}

export interface ReviewsCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  excludeIds?: (string | number)[];
  height?: string;
  loop?: boolean;
  reviews: Review[];
  showIndicators?: boolean;
  showNavigation?: boolean;
}

export function ReviewsCarousel({
  reviews,
  className = '',
  height = '380px',
  excludeIds = [],
  showIndicators = true,
  showNavigation = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
}: ReviewsCarouselProps) {
  const filteredReviews = useMemo(() => {
    if (excludeIds.length === 0) {
      return reviews;
    }

    const excludeSet = new Set(excludeIds);
    return reviews.filter((review) => !excludeSet.has(review.id));
  }, [reviews, excludeIds]);

  const maxIndex = filteredReviews.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || maxIndex < 0) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        if (loop) {
          return (prevIndex + 1) % filteredReviews.length;
        }
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, autoPlayInterval);

    return () => {
      clearInterval(interval);
    };
  }, [autoPlay, autoPlayInterval, maxIndex, loop, filteredReviews.length]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => {
          if (loop) {
            return (index - 1 + filteredReviews.length) % filteredReviews.length;
          }
          return clamp(index - 1, [0, maxIndex]);
        });
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((index) => {
          if (loop) {
            return (index + 1) % filteredReviews.length;
          }
          return clamp(index + 1, [0, maxIndex]);
        });
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loop, maxIndex, filteredReviews.length]);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => {
      if (loop) {
        return (prevIndex - 1 + filteredReviews.length) % filteredReviews.length;
      }
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => {
      if (loop) {
        return (prevIndex + 1) % filteredReviews.length;
      }
      const newIndex = prevIndex + 1;
      return newIndex <= maxIndex ? newIndex : prevIndex;
    });
  };

  if (filteredReviews.length === 0) {
    return null;
  }

  return (
    <div className={cn('relative mx-auto w-full max-w-5xl', className)} style={{ height }}>
      <div className="relative h-full w-full py-8">
        <div className="grid h-full w-full place-items-center">
          {filteredReviews.map((review, index) => (
            <ReviewCard
              activeIndex={activeIndex}
              index={index}
              key={review.id}
              review={review}
              totalCards={filteredReviews.length}
            />
          ))}
        </div>
      </div>

      {(showNavigation || showIndicators) && (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
          {showNavigation ? (
            <NavigationButton direction="prev" onClick={goToPrevious} />
          ) : null}
          {showIndicators ? (
            <div className="flex items-center gap-2">
              {filteredReviews.map((review, index) => (
                <button
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-200',
                    index === activeIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-primary/30 hover:bg-primary/50',
                  )}
                  key={review.id}
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  type="button"
                />
              ))}
            </div>
          ) : null}
          {showNavigation ? <NavigationButton direction="next" onClick={goToNext} /> : null}
        </div>
      )}
    </div>
  );
}

export default ReviewsCarousel;
