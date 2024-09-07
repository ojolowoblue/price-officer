import { signin } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export default function useSignin() {
  const { isPending, data, mutate } = useMutation({
    mutationFn: signin,
  });

  return {
    isLoading: isPending,
    data,
    signin: mutate,
  };
}
