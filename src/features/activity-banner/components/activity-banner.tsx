import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ACTIVITY_BANNER_INITIAL_DELAY_MS,
  ACTIVITY_BANNER_INTERVAL_MS,
} from '@/features/activity-banner/constants';
import {
  buildActivityBannerMessage,
  getVisibleDurationMs,
  type ActivityBannerMessage,
} from '@/features/activity-banner/utils';
import { useProducts } from '@/hooks/use-products';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/utils/cn';

export function ActivityBanner() {
  const { data: products } = useProducts({ active: true });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<ActivityBannerMessage | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const initialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const hideBanner = useCallback(() => {
    clearHideTimer();
    setVisible(false);
  }, [clearHideTimer]);

  const showBanner = useCallback(() => {
    if (!products?.length) return;

    const nextMessage = buildActivityBannerMessage(products);
    if (!nextMessage) return;

    setMessage(nextMessage);
    setVisible(true);
    clearHideTimer();

    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, getVisibleDurationMs());
  }, [clearHideTimer, products]);

  useEffect(() => {
    if (!products?.length) return;

    initialTimerRef.current = setTimeout(() => {
      showBanner();
      intervalRef.current = setInterval(showBanner, ACTIVITY_BANNER_INTERVAL_MS);
    }, ACTIVITY_BANNER_INITIAL_DELAY_MS);

    return () => {
      if (initialTimerRef.current) clearTimeout(initialTimerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearHideTimer();
    };
  }, [clearHideTimer, products, showBanner]);

  if (!message) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-10 left-4 z-40 max-w-[calc(100vw-2rem)] sm:bottom-14 sm:left-6 sm:max-w-md"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {visible ? (
          <motion.aside
            key={message.id}
            role="status"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, x: -8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, x: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: 'easeOut' }}
            className={cn(
              'pointer-events-auto flex items-start gap-4 rounded-2xl border border-primary/20',
              'bg-card/95 p-4 shadow-xl backdrop-blur-md sm:gap-5 sm:p-5',
            )}
          >
            {message.imageUrl ? (
              <img
                src={message.imageUrl}
                alt={message.imageAlt ?? ''}
                className="h-14 w-14 shrink-0 rounded-xl border border-border/60 object-cover sm:h-16 sm:w-16"
                loading="lazy"
              />
            ) : null}

            <div className="min-w-0 flex-1 pr-1">
              <p className="text-sm leading-snug text-foreground sm:text-base">{message.text}</p>
              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                {message.minutesAgo} minutes ago
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground sm:h-9 sm:w-9"
              onClick={hideBanner}
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
