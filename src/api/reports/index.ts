import request from '../request';
import {
  CreatePriceReportPayload,
  GetPriceReportResponse,
  ListPriceReportParams,
  ListPriceReportsResponse,
} from './types';

export const listPriceReports = (params?: ListPriceReportParams) => {
  return request.get<ListPriceReportsResponse>(`/price-reports`, {
    params,
  });
};

export const getPriceReport = (id: string) => {
  return request.get<GetPriceReportResponse>(`/price-reports/${id}`, {
    params: { include: 'user, product' },
  });
};

export const createPriceReport = (payload: CreatePriceReportPayload) => {
  return request.post<GetPriceReportResponse>(`/price-reports`, payload);
};
