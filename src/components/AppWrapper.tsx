import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import { navigateToLogin } from '@/libs/logout';
import Header from './Header';

export default function AppWrapper() {
  const isLoggedIn = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigateToLogin();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Header />

      <div className="max-w-screen-2xl relative m-auto">
        <Outlet />
      </div>
    </div>
  );
}
