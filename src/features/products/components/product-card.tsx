import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BuyNowButton } from '@/components/common/buy-now-button';
import { PriceDisplay } from '@/components/common/price-display';
import type { Product } from '@/types/product';
import { getOptimizedImageUrl } from '@/utils/cloudinary';
import { getProductPath } from '@/utils/product';
import { hasPrice } from '@/utils/pricing';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  whatsappNumber?: string;
}

export function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const image = product.images?.[0];
  const productPath = getProductPath(product);
  const showBuyNow = hasPrice(product.mrp, product.discountedPrice);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/10">
      <Link to={productPath} className="block overflow-hidden">
        <img
          src={getOptimizedImageUrl(image, 600)}
          alt={image?.alternativeText ?? product.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="space-y-3">
          {product.category?.name ? (
            <Badge variant="secondary" className="w-fit text-xs">
              {product.category.name}
            </Badge>
          ) : (
            <div className="h-5" aria-hidden />
          )}

          <h3 className="font-heading line-clamp-2 min-h-[1.25rem] text-lg font-medium leading-snug text-foreground">
            {product.name}
          </h3>

          <PriceDisplay
            mrp={product.mrp}
            discountedPrice={product.discountedPrice}
            className="text-base"
          />
        </div>

        <div className={cn('mt-auto grid grid-cols-2 gap-2 pt-5')}>
          <BuyNowButton
            productName={product.name}
            whatsappNumber={whatsappNumber}
            label={showBuyNow ? 'Buy Now' : 'Enquire'}
            size="sm"
            className="min-w-0"
          />
          <Button asChild variant="outline" size="sm" className="min-w-0">
            <Link to={productPath}>
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
