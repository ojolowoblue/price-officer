import { Outlet } from 'react-router-dom';

import Header from './Header';

export default function AuthLayout() {
  return (
    <div>
      <Header />

      <div className="max-w-lg relative m-auto">
        <Outlet />
      </div>
    </div>
  );
}
