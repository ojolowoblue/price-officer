import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import AuthWrapper from '@/components/AuthWrapper';
import AppLayout from '@/components/AppLayout';
import AuthLayout from '@/components/AuthLayout';

const EntryPage = lazy(() => import('@/views/Entry'));
const ReportPrice = lazy(() => import('@/views/ReportPrice'));
const ViewPrices = lazy(() => import('@/views/ViewPrices'));
const PriceDetails = lazy(() => import('@/views/PriceDetails'));
const AboutPage = lazy(() => import('@/views/About'));
const Signup = lazy(() => import('@/views/Signup'));
const Signin = lazy(() => import('@/views/Signin'));
const ResetPassword = lazy(() => import('@/views/ResetPassword'));

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <EntryPage /> },
      {
        path: '/about',
        element: <AboutPage />,
      },
      { path: 'view-prices', element: <ViewPrices /> },
      { path: 'view-prices/:id', element: <PriceDetails /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
      {
        path: '*',
        element: <h1 className="text-center p-10">Page Not Found 👀</h1>,
      },
    ],
  },
  {
    path: '',
    element: (
      <AuthWrapper>
        <AppLayout />
      </AuthWrapper>
    ),
    children: [{ path: 'report-price', element: <ReportPrice /> }],
  },
];
