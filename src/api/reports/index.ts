import request from '../request';
import { CreatePriceReportPayload, GetPriceReportResponse, ListPriceReportsResponse } from './types';

export const listPriceReports = () => {
  return request.get<ListPriceReportsResponse>(`/price-reports?include=products`);
};

export const getPriceReport = (id: string) => {
  return request.get<GetPriceReportResponse>(`/price-reports/${id}`, {
    params: { include: 'user' },
  });
};

export const createPriceReport = (payload: CreatePriceReportPayload) => {
  return request.post<GetPriceReportResponse>(`/price-reports`, payload);
};
