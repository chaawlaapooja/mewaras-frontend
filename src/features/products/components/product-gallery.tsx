import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StrapiMedia } from '@/types/strapi';
import { getOptimizedImageUrl, getVideoUrl } from '@/utils/cloudinary';
import { cn } from '@/utils/cn';

interface ProductGalleryProps {
  images?: StrapiMedia[] | null;
  video?: StrapiMedia | null;
  productName: string;
}

export function ProductGallery({ images, video, productName }: ProductGalleryProps) {
  const galleryImages = images?.filter((image) => image?.url) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryImages[activeIndex];
  const videoUrl = getVideoUrl(video);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage?.documentId ?? 'placeholder'}
            src={getOptimizedImageUrl(activeImage, 1000)}
            alt={activeImage?.alternativeText ?? productName}
            className="aspect-square w-full object-cover"
            loading="eager"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
      </div>

      {galleryImages.length > 1 ? (
        <div className="grid grid-cols-5 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.documentId}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                'overflow-hidden rounded-lg border',
                index === activeIndex ? 'border-primary ring-2 ring-primary/30' : 'border-border',
              )}
            >
              <img
                src={getOptimizedImageUrl(image, 160)}
                alt=""
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : null}

      {videoUrl ? (
        <div className="overflow-hidden rounded-2xl border border-border">
          <video controls className="w-full" preload="metadata">
            <source src={videoUrl} type={video?.mime ?? 'video/mp4'} />
          </video>
        </div>
      ) : null}
    </div>
  );
}
