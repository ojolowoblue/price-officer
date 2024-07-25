import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import AppLayout from '@/components/AppLayout';

const EntryPage = lazy(() => import('@/views/Entry'));
const ReportPrice = lazy(() => import('@/views/ReportPrice'));
const ViewPrices = lazy(() => import('@/views/ViewPrices'));

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <EntryPage />,
      },
      {
        path: 'report-price',
        element: <ReportPrice />,
      },
      {
        path: 'view-prices',
        element: <ViewPrices />,
      },
      {
        path: '*',
        element: <h1 className="text-center p-10">Page Not Found 👀</h1>,
      },
    ],
  },
];
