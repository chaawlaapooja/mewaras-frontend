import { Seo } from '@/components/common/seo';
import { PageTransition } from '@/components/common/page-transition';

export function AboutUsPage() {
  return (
    <PageTransition>
      <Seo
        title="About Us"
        description="Learn about Mewa Ras — premium dry fruits, elegant hampers, and bespoke gifting experiences."
        path="/about-us"
      />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Our Story</p>
        <h1 className="mt-2 font-heading text-4xl font-semibold md:text-5xl">About Mewa Ras</h1>
        <div className="mt-8 max-w-3xl space-y-4 text-muted-foreground">
          <p>
            Mewa Ras curates premium dry fruits, exotic snacks, and thoughtfully assembled hampers
            for celebrations that deserve something extraordinary.
          </p>
          <p>
            Every collection is handpicked for quality, presentation, and taste — whether you are
            gifting for a festival, a corporate occasion, or a personal milestone.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
