import { ProductCard } from '@/features/products/components/product-card';
import type { Product } from '@/types/product';
import { StaggerContainer, StaggerItem } from '@/components/common/stagger-container';

interface ProductGridProps {
  products: Product[];
  whatsappNumber?: string;
}

export function ProductGrid({ products, whatsappNumber }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card/40 p-10 text-center text-muted-foreground">
        No products found matching your criteria.
      </div>
    );
  }

  return (
    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <StaggerItem key={product.documentId} className="h-full">
          <ProductCard product={product} whatsappNumber={whatsappNumber} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
