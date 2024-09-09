import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { listPriceReports } from '@/api/reports';
import { parseError } from '@/libs/error';

export default function useListPriceReports(params?: { sortBy: 'desc' | 'asc'; include: string }) {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ['price-reports', params],
    queryFn: () => listPriceReports(params),
    staleTime: 0,
  });

  return {
    error: error ? parseError(error as AxiosError) : undefined,
    data: data?.data,
    isLoading,
    isFetching,
    listReports: refetch,
  };
}
