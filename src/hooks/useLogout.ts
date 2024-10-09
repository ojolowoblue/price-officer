import { signout } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export default function useLogout() {
  const { isPending, mutate } = useMutation({
    mutationFn: signout,
  });

  return {
    isLoading: isPending,
    logout: mutate,
  };
}
