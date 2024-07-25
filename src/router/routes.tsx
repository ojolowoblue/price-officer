import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import AppLayout from '@/components/AppLayout';

const EntryPage = lazy(() => import('@/views/Entry'));
const ReportPrice = lazy(() => import('@/views/ReportPrice'));
const ViewPrices = lazy(() => import('@/views/ViewPrices'));
const PriceDetails = lazy(() => import('@/views/PriceDetails'));

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
];
