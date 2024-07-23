import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import AppLayout from '@/components/AppLayout';

const EntryPage = lazy(() => import('@/views/Entry'));
const ReportPrice = lazy(() => import('@/views/ReportPrice'));

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
    ],
  },
];
