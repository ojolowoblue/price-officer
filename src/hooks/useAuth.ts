import { useToken } from '@/providers/TokenProvider';

export default function useAuth() {
  const tokens = useToken();

  const isLoggedIn = !!tokens?.access_token;

  return isLoggedIn;
}
