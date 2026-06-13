import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductFilters } from '@/features/products/components/product-filters';
import { ProductGrid } from '@/features/products/components/product-grid';
import { Seo } from '@/components/common/seo';
import { PageTransition } from '@/components/common/page-transition';
import { LoadingState } from '@/components/common/loading-state';
import { ErrorState } from '@/components/common/error-state';
import { useCategories } from '@/hooks/use-categories';
import { useProducts } from '@/hooks/use-products';
import { useWebsiteSettings } from '@/hooks/use-settings';
import type { ProductSortOption } from '@/types/product';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const categorySlug = searchParams.get('category') ?? '';
  const sort = (searchParams.get('sort') as ProductSortOption) || 'newest';

  const filters = useMemo(
    () => ({
      search: search || undefined,
      categorySlug: categorySlug || undefined,
      sort,
    }),
    [search, categorySlug, sort],
  );

  const { data: categories = [] } = useCategories();
  const { data: products, isLoading, isError, refetch } = useProducts(filters);
  const { data: settings } = useWebsiteSettings();

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'all') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  return (
    <PageTransition>
      <Seo
        title="Products"
        description="Browse our premium dry fruits, hampers, and gifting collections. Filter, search, and order via WhatsApp."
        path="/products"
      />

      <section className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Catalog</p>
          <h1 className="mt-2 font-heading text-4xl font-semibold">All Products</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Search, filter, and sort through our complete collection of premium gifting products.
          </p>
        </div>

        <div className="mb-8">
          <ProductFilters
            search={search}
            categorySlug={categorySlug}
            sort={sort}
            categories={categories}
            onSearchChange={(value) => {
              setSearch(value);
              updateParam('q', value);
            }}
            onCategoryChange={(value) => updateParam('category', value)}
            onSortChange={(value) => updateParam('sort', value)}
          />
        </div>

        {isLoading ? <LoadingState /> : null}
        {isError ? <ErrorState onRetry={() => void refetch()} /> : null}
        {products ? <ProductGrid products={products} whatsappNumber={settings?.whatsappNumber} /> : null}
      </section>
    </PageTransition>
  );
}
