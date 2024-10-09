import { google_signin } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export default function useGoogleSignin() {
  const { isPending, mutate } = useMutation({
    mutationFn: google_signin,
  });

  return {
    isLoading: isPending,
    googleSignin: mutate,
  };
}
