import { createProduct } from '@/api/products';
import { useMutation } from '@tanstack/react-query';

export default function useCreateProduct() {
  const { isPending, mutate } = useMutation({
    mutationFn: createProduct,
  });

  return {
    isLoading: isPending,
    createProduct: mutate,
  };
}
