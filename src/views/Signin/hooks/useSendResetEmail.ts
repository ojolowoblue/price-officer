import { useMutation } from '@tanstack/react-query';

import { send_reset_email } from '@/api/auth';

export default function useSendResetEmail() {
  const { isPending, data, mutate } = useMutation({
    mutationFn: send_reset_email,
  });

  return {
    isLoading: isPending,
    data,
    sendResetEmail: mutate,
  };
}
