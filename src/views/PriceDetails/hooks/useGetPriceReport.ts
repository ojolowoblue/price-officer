import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getPriceReport } from '@/api/reports';
import { parseError } from '@/libs/error';

export default function useGetPriceReport(id: string) {
  const { isLoading, data, isFetching, error, refetch } = useQuery({
    queryKey: ['price-report'],
    queryFn: () => getPriceReport(id),
    enabled: !!id,
  });

  return {
    error: error ? parseError(error as AxiosError) : undefined,
    data: data?.data,
    isLoading,
    isFetching,
    getReport: refetch,
  };
}
