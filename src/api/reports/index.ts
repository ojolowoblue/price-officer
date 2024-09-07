import request from '../request';
import { GetPriceReportResponse, ListPriceReportsResponse } from './types';

export const listPriceReports = () => {
  return request.get<ListPriceReportsResponse>(`/price-reports?include=products`);
};

export const getPriceReport = (id: string) => {
  return request.get<GetPriceReportResponse>(`/price-reports/${id}`);
};
