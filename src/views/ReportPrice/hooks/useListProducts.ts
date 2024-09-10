import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { listProducts } from '@/api/products';
import { ListProductParams } from '@/api/products/types';
import { parseError } from '@/libs/error';

export default function useListProducts(params?: ListProductParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', params],
    queryFn: () => listProducts(params),
  });

  return {
    products: data?.data.results,
    isLoading,
    error: error ? parseError(error as AxiosError) : undefined,
    listProducts: refetch,
  };
}