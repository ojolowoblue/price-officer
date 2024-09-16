import { updateProduct } from '@/api/products';
import { useMutation } from '@tanstack/react-query';

export default function useUpdateProduct() {
  const { isPending, mutate } = useMutation({
    mutationFn: updateProduct,
  });

  return {
    isLoading: isPending,
    updateProduct: mutate,
  };
}
