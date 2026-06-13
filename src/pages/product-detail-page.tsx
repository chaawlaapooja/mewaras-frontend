import { useParams } from 'react-router-dom';
import { ProductGallery } from '@/features/products/components/product-gallery';
import { BuyNowButton } from '@/components/common/buy-now-button';
import { PriceDisplay } from '@/components/common/price-display';
import { Seo } from '@/components/common/seo';
import { PageTransition } from '@/components/common/page-transition';
import { LoadingState } from '@/components/common/loading-state';
import { ErrorState } from '@/components/common/error-state';
import { Badge } from '@/components/ui/badge';
import { useProduct } from '@/hooks/use-products';
import { useWebsiteSettings } from '@/hooks/use-settings';
import { SITE_URL } from '@/constants/config';
import { getOptimizedImageUrl } from '@/utils/cloudinary';
import { getEffectivePrice } from '@/utils/pricing';

export function ProductDetailPage() {
  const { slug = '' } = useParams();
  const { data: product, isLoading, isError, refetch } = useProduct(slug);
  const { data: settings } = useWebsiteSettings();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingState />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorState message="Product not found." />
      </div>
    );
  }

  const primaryImage = product.images[0];
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description?.replace(/<[^>]+>/g, '') ?? product.name,
    image: primaryImage ? getOptimizedImageUrl(primaryImage, 1200) : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: getEffectivePrice(product.mrp, product.discountedPrice),
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };

  return (
    <PageTransition>
      <Seo
        title={product.name}
        description={product.description?.replace(/<[^>]+>/g, '') ?? `Shop ${product.name}`}
        path={`/products/${product.slug}`}
        image={primaryImage ? getOptimizedImageUrl(primaryImage, 1200) : undefined}
        type="product"
        structuredData={structuredData}
      />

      <section className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-2">
        <ProductGallery images={product.images} video={product.video} productName={product.name} />

        <div className="space-y-6">
          {product.category ? <Badge>{product.category.name}</Badge> : null}
          <h1 className="font-heading text-4xl font-semibold">{product.name}</h1>
          <PriceDisplay
            mrp={product.mrp}
            discountedPrice={product.discountedPrice}
            className="text-2xl"
          />

          {product.description ? (
            <div
              className="prose prose-invert max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : null}

          {product.composition?.length ? (
            <div>
              <h2 className="font-heading text-xl font-medium">Composition</h2>
              <ul className="mt-3 space-y-2 rounded-xl border border-border bg-card/50 p-4">
                {product.composition.map((item, index) => (
                  <li key={`${item.name}-${index}`} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="text-muted-foreground">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <BuyNowButton
            productName={product.name}
            whatsappNumber={settings?.whatsappNumber}
            size="lg"
          />
        </div>
      </section>
    </PageTransition>
  );
}
