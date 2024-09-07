import { PriceReport } from '@/model/report';
import { GenericPaginatedResponse } from '../types';

export type ListPriceReportsResponse = GenericPaginatedResponse<PriceReport>;

export type GetPriceReportResponse = PriceReport;
