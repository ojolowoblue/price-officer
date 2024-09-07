import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { parseError } from '@/libs/error';
import { getUser } from '@/api/users';

export default function useGetUser(id: string) {
  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return {
    error: error ? parseError(error as AxiosError) : undefined,
    user: data?.data,
    isLoading,
    isFetching,
    getUser: refetch,
  };
}
