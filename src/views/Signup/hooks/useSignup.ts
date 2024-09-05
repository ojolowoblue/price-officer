import { signup } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export default function useSignup() {
  const { isPending, data, mutate } = useMutation({
    mutationFn: signup,
  });

  return {
    isLoading: isPending,
    data,
    signup: mutate,
  };
}
