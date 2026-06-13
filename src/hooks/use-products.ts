import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { productService } from '@/services/product.service';
import type { ProductFilters } from '@/types/product';

export const useProducts = (filters: ProductFilters = {}) =>
  useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.getAll(filters),
  });

export const useFeaturedProducts = () =>
  useQuery({
    queryKey: queryKeys.products.featured,
    queryFn: () => productService.getFeatured(),
  });

export const useProduct = (slug: string) =>
  useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => productService.getBySlug(slug),
    enabled: Boolean(slug),
  });
