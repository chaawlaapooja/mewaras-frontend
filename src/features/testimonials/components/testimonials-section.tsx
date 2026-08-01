import { useMemo } from 'react';
import { ReviewsCarousel, type Review } from '@/components/ui/reviews-carousel';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { DEMO_TESTIMONIALS } from '@/features/testimonials/data/demo-testimonials';

export function TestimonialsSection() {
  const reviews = useMemo<Review[]>(
    () =>
      DEMO_TESTIMONIALS.map((testimonial) => ({
        id: testimonial.id,
        author: testimonial.name,
        title: '',
        body: testimonial.quote,
      })),
    [],
  );

  return (
    <section className="container mx-auto px-4 py-16 md:py-20" aria-labelledby="testimonials-heading">
      <ScrollReveal className="mb-6 text-center md:mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Testimonials</p>
        <h2 id="testimonials-heading" className="mt-2 font-heading text-3xl font-semibold md:text-4xl">
          Loved by Our Customers
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Hear what people enjoy about Mewa Ras — premium quality, thoughtful gifting, and a smooth
          ordering experience.
        </p>
      </ScrollReveal>

      <ReviewsCarousel reviews={reviews} height="400px" loop showNavigation showIndicators />
    </section>
  );
}
