import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';

export default function AuthWrapper(props: PropsWithChildren) {
  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth/signin" />;
  }

  return props.children;
}
