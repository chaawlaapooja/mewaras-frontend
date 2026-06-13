import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys';
import { settingsService } from '@/services/settings.service';

export const useWebsiteSettings = () =>
  useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: () => settingsService.get(),
  });
