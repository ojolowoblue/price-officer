import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import AppWrapper from '@/components/AppWrapper';
import AuthWrapper from '@/components/AuthWrapper';
import AppLayout from '@/components/AppLayout';

const EntryPage = lazy(() => import('@/views/Entry'));
const ReportPrice = lazy(() => import('@/views/ReportPrice'));
const ViewPrices = lazy(() => import('@/views/ViewPrices'));
const PriceDetails = lazy(() => import('@/views/PriceDetails'));
const AboutPage = lazy(() => import('@/views/About'));
const Signup = lazy(() => import('@/views/Signup'));
const Signin = lazy(() => import('@/views/Signin'));

export const appRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthWrapper />,
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
        path: '*',
        element: <h1 className="text-center p-10">Page Not Found 👀</h1>,
      },
    ],
  },
  {
    element: <AppWrapper />,
    children: [
      {
        path: 'report-price',
        element: <ReportPrice />,
      },

      {
        path: 'view-prices',
        children: [
          { index: true, element: <ViewPrices /> },
          { path: ':id', element: <PriceDetails /> },
        ],
      },

      {
        path: '*',
        element: <h1 className="text-center p-10">Page Not Found 👀</h1>,
      },
    ],
  },
  {
    path: 'about',
    element: (
      <AppLayout>
        <AboutPage />
      </AppLayout>
    ),
  },
  {
    path: '/',
    element: (
      <AppLayout>
        <EntryPage />
      </AppLayout>
    ),
  },
  {
    path: '*',
    element: <h1 className="text-center p-10">Page Not Found 👀</h1>,
  },
];
