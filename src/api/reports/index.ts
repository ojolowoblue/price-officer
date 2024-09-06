import request from '../request';
import { ListPriceReportsResponse } from './types';

export const listPriceReports = () => {
  return request.get<ListPriceReportsResponse>(`/price-reports?include=products`);
};
