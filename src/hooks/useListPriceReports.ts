import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { listPriceReports } from '@/api/reports';
import { parseError } from '@/libs/error';
import { ListPriceReportParams } from '@/api/reports/types';

export default function useListPriceReports(params?: ListPriceReportParams) {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ['price-reports', params],
    queryFn: () => listPriceReports(params),
  });

  return {
    error: error ? parseError(error as AxiosError) : undefined,
    data: data?.data,
    isLoading,
    isFetching,
    listReports: refetch,
  };
}
