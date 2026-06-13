import { formatCurrency, hasDiscount } from '@/utils/pricing';
import { cn } from '@/utils/cn';

interface PriceDisplayProps {
  mrp: number;
  discountedPrice: number | null;
  className?: string;
}

export function PriceDisplay({ mrp, discountedPrice, className }: PriceDisplayProps) {
  const showDiscount = hasDiscount(mrp, discountedPrice);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="font-medium text-foreground">
        {formatCurrency(showDiscount ? discountedPrice! : mrp)}
      </span>
      {showDiscount ? (
        <span className="text-sm text-muted-foreground line-through">{formatCurrency(mrp)}</span>
      ) : null}
    </div>
  );
}
