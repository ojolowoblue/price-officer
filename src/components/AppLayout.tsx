import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function AppLayout() {
  return (
    <div className="max-w-screen-2xl relative m-auto">
      <Header />

      <Outlet />
    </div>
  );
}
