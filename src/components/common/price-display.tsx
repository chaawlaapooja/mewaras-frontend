import { formatCurrency, getEffectivePrice, hasDiscount, hasPrice } from '@/utils/pricing';
import { cn } from '@/utils/cn';

interface PriceDisplayProps {
  mrp?: number | null;
  discountedPrice?: number | null;
  className?: string;
}

export function PriceDisplay({ mrp, discountedPrice, className }: PriceDisplayProps) {
  if (!hasPrice(mrp, discountedPrice)) {
    return (
      <p className={cn('text-sm text-muted-foreground', className)}>Price on request</p>
    );
  }

  const effectivePrice = getEffectivePrice(mrp, discountedPrice)!;
  const showDiscount = hasDiscount(mrp, discountedPrice);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-medium text-foreground">{formatCurrency(effectivePrice)}</span>
      {showDiscount && mrp != null ? (
        <span className="text-sm text-muted-foreground line-through">{formatCurrency(mrp)}</span>
      ) : null}
    </div>
  );
}
