import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { listPriceReports } from '@/api/reports';
import { parseError } from '@/libs/error';

export default function useListPriceReports() {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ['pricr-reports'],
    queryFn: listPriceReports,
  });

  return {
    error: error ? parseError(error as AxiosError) : undefined,
    data: data?.data,
    isLoading,
    isFetching,
    listReports: refetch,
  };
}
