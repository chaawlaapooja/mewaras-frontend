import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { BuyNowButton } from '@/components/common/buy-now-button';
import { PriceDisplay } from '@/components/common/price-display';
import type { Product } from '@/types/product';
import { getOptimizedImageUrl } from '@/utils/cloudinary';
import { getProductPath } from '@/utils/product';

interface FlipProductCardProps {
  product: Product;
  whatsappNumber?: string;
}

export function FlipProductCard({ product, whatsappNumber }: FlipProductCardProps) {
  const image = product.images?.[0];
  const productPath = getProductPath(product);

  return (
    <motion.div
      className="group h-[380px] [perspective:1200px] sm:h-[400px]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card [backface-visibility:hidden]">
          <Link to={productPath} className="block h-full">
            <img
              src={getOptimizedImageUrl(image, 600)}
              alt={image?.alternativeText ?? product.name}
              className="h-[72%] w-full object-cover"
              loading="lazy"
            />
            <div className="space-y-2 p-4">
              {product.category?.name ? (
                <Badge variant="secondary">{product.category.name}</Badge>
              ) : null}
              <h3 className="font-heading text-lg font-medium">{product.name}</h3>
              <PriceDisplay mrp={product.mrp} discountedPrice={product.discountedPrice} />
            </div>
          </Link>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-secondary to-card p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="space-y-3">
            <h3 className="font-heading text-xl font-semibold">{product.name}</h3>
            {product.description ? (
              <p className="line-clamp-4 text-sm text-muted-foreground">
                {product.description.replace(/<[^>]+>/g, '')}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Premium gifting selection curated for elegant celebrations.
              </p>
            )}
            <PriceDisplay mrp={product.mrp} discountedPrice={product.discountedPrice} />
          </div>
          <div className="space-y-2">
            <BuyNowButton productName={product.name} whatsappNumber={whatsappNumber} />
            <Link to={productPath} className="block text-center text-sm text-primary hover:underline">
              View details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
