import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import Header from './Header';

export default function AuthWrapper() {
  const navigate = useNavigate();

  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <Header />

      <div className="max-w-lg relative m-auto">
        <Outlet />
      </div>
    </>
  );
}
