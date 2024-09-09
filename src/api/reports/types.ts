import { PriceReport } from '@/model/report';
import { GenericPaginatedResponse } from '../types';

export type ListPriceReportsResponse = GenericPaginatedResponse<PriceReport>;

export type GetPriceReportResponse = PriceReport;

export interface CreatePriceReportPayload {
  product: string;
  unit: string;
  price: number;
  currency: string;
  location: string;
  images: string[];
  description: string;
}
