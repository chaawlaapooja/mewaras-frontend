import { ProductGrid } from '@/features/products/components/product-grid';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { LoadingState } from '@/components/common/loading-state';
import { ErrorState } from '@/components/common/error-state';
import { useProducts } from '@/hooks/use-products';
import { useWebsiteSettings } from '@/hooks/use-settings';

export function CatalogSection() {
  const { data: products, isLoading, isError, refetch } = useProducts({ sort: 'newest' });
  const { data: settings } = useWebsiteSettings();

  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollReveal className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Catalog</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold md:text-4xl">Our Product Catalog</h2>
      </ScrollReveal>

      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState onRetry={() => void refetch()} /> : null}
      {products ? (
        <ProductGrid products={products.slice(0, 6)} whatsappNumber={settings?.whatsappNumber} />
      ) : null}
    </section>
  );
}
