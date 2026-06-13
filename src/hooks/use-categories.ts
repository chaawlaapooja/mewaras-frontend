import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { categoryService } from '@/services/category.service';

export const useCategories = (activeOnly = true) =>
  useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: () => categoryService.getAll(activeOnly),
  });

export const useCategory = (slug: string) =>
  useQuery({
    queryKey: queryKeys.categories.detail(slug),
    queryFn: () => categoryService.getBySlug(slug),
    enabled: Boolean(slug),
  });
