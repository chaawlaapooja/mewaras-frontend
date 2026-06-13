import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/utils/whatsapp';
import { cn } from '@/utils/cn';

interface BuyNowButtonProps {
  productName: string;
  whatsappNumber?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
}

export function BuyNowButton({
  productName,
  whatsappNumber,
  className,
  size = 'default',
}: BuyNowButtonProps) {
  const handleClick = () => {
    if (!whatsappNumber) return;
    openWhatsApp(whatsappNumber, productName);
  };

  return (
    <Button
      type="button"
      size={size}
      className={cn('w-full', className)}
      onClick={handleClick}
      disabled={!whatsappNumber}
    >
      <MessageCircle className="h-4 w-4" />
      Buy Now
    </Button>
  );
}
