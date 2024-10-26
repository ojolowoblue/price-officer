import { useMutation } from '@tanstack/react-query';

import { reset_password } from '@/api/auth';

export default function useResetPassword(token: string) {
  const { isPending, data, mutate } = useMutation({
    mutationFn: (payload: { password: string }) => reset_password(payload, token),
  });

  return {
    isLoading: isPending,
    data,
    resetPassword: mutate,
  };
}
