import request from '../request';
import { CreateProductPayload, CreateProductResponse, ListProductParams, ListProductsResponse } from './types';

export const listProducts = (params?: ListProductParams) => {
  return request.get<ListProductsResponse>('/products', {
    params,
  });
};

export const createProduct = (payload: CreateProductPayload) => {
  return request.post<CreateProductResponse>('/products', payload);
};
