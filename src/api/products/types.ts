import Product from '@/model/product';
import { GenericPaginatedResponse } from '../types';

export interface ListProductParams {
  name?: string;
  category?: string;
  user?: string;
  include?: string;
}

export type ListProductsResponse = GenericPaginatedResponse<Product>;
export type CreateProductResponse = Product;

export interface CreateProductPayload {
  name: string;
  unit: string[];
  images: string[];
  category: string;
  description: string;
}
