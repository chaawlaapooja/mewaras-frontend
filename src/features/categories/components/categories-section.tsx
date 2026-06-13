import { CategoryCard } from '@/features/categories/components/category-card';
import { ScrollReveal } from '@/components/common/scroll-reveal';
import { LoadingState } from '@/components/common/loading-state';
import { ErrorState } from '@/components/common/error-state';
import { useCategories } from '@/hooks/use-categories';

export function CategoriesSection() {
  const { data: categories, isLoading, isError, refetch } = useCategories();

  return (
    <section className="container mx-auto px-4 py-16">
      <ScrollReveal className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-primary">Collections</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold md:text-4xl">Shop by Category</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Discover curated selections of premium dry fruits, elegant hampers, and bespoke gifting
          experiences.
        </p>
      </ScrollReveal>

      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState onRetry={() => void refetch()} /> : null}
      {categories ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <CategoryCard key={category.documentId} category={category} index={index} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
