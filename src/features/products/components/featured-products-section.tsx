import { Link } from 'react-router-dom';
import { ProductGrid } from '@/features/products/components/product-grid';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { LoadingState } from '@/components/common/loading-state';
import { ErrorState } from '@/components/common/error-state';
import { Button } from '@/components/ui/button';
import { useFeaturedProducts } from '@/hooks/use-products';
import { useWebsiteSettings } from '@/hooks/use-settings';

export function FeaturedProductsSection() {
  const { data: products, isLoading, isError, refetch } = useFeaturedProducts();
  const { data: settings } = useWebsiteSettings();

  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollReveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Featured</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold md:text-4xl">Signature Selections</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Handpicked favorites for premium gifting and elevated snacking moments.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/products">View all products</Link>
        </Button>
      </ScrollReveal>

      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState onRetry={() => void refetch()} /> : null}
      {products ? <ProductGrid products={products} whatsappNumber={settings?.whatsappNumber} /> : null}
    </section>
  );
}
