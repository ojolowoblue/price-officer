import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import AppLayout from './AppLayout';

export default function AuthWrapper() {
  const navigate = useNavigate();

  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
