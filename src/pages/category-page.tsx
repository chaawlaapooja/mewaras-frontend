import { useParams } from 'react-router-dom';
import { ProductGrid } from '@/features/products/components/product-grid';
import { Seo } from '@/components/common/seo';
import { PageTransition } from '@/components/common/page-transition';
import { LoadingState } from '@/components/common/loading-state';
import { ErrorState } from '@/components/common/error-state';
import { useCategory } from '@/hooks/use-categories';
import { useProducts } from '@/hooks/use-products';
import { useWebsiteSettings } from '@/hooks/use-settings';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { data: category, isLoading: categoryLoading, isError: categoryError, refetch } = useCategory(slug);
  const { data: products, isLoading: productsLoading } = useProducts({ categorySlug: slug });
  const { data: settings } = useWebsiteSettings();

  const isLoading = categoryLoading || productsLoading;

  if (categoryError) {
    return <ErrorState onRetry={() => void refetch()} />;
  }

  if (!isLoading && !category) {
    return <ErrorState message="Category not found." />;
  }

  return (
    <PageTransition>
      {category ? (
        <Seo
          title={category.name}
          description={category.description ?? `Explore ${category.name} from our premium gifting catalog.`}
          path={`/category/${category.slug}`}
        />
      ) : null}

      <section className="container mx-auto px-4 py-12">
        {isLoading ? (
          <LoadingState />
        ) : category ? (
          <>
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.25em] text-primary">Category</p>
              <h1 className="mt-2 font-heading text-4xl font-semibold">{category.name}</h1>
              {category.description ? (
                <p className="mt-3 max-w-3xl text-muted-foreground">{category.description}</p>
              ) : null}
            </div>
            {products ? (
              <ProductGrid products={products} whatsappNumber={settings?.whatsappNumber} />
            ) : null}
          </>
        ) : null}
      </section>
    </PageTransition>
  );
}
