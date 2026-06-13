import { HeroCarousel } from '@/features/hero/components/hero-carousel';
import { CategoriesSection } from '@/features/categories/components/categories-section';
import { FeaturedProductsSection } from '@/features/products/components/featured-products-section';
import { CatalogSection } from '@/features/products/components/catalog-section';
import { Seo } from '@/components/common/seo';
import { PageTransition } from '@/components/common/page-transition';
import { useWebsiteSettings } from '@/hooks/use-settings';

export function HomePage() {
  const { data: settings } = useWebsiteSettings();

  return (
    <PageTransition>
      <Seo
        title="Premium Gifting & Dry Fruits"
        description="Discover premium dry fruits, elegant hampers, and customized gifting collections crafted for memorable celebrations."
        path="/"
      />
      <HeroCarousel />
      <CategoriesSection />
      <FeaturedProductsSection />
      <CatalogSection />
      {settings ? (
        <section className="container mx-auto px-4 pb-16">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-secondary/80 to-card p-8 text-center md:p-12">
            <h2 className="font-heading text-2xl font-semibold md:text-3xl">Ready to place an order?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Connect with us on WhatsApp for personalized recommendations and swift assistance.
            </p>
          </div>
        </section>
      ) : null}
    </PageTransition>
  );
}
