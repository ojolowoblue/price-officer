import { createPriceReport } from '@/api/reports';
import { useMutation } from '@tanstack/react-query';

export default function useCreateReport() {
  const { isPending, mutate } = useMutation({
    mutationFn: createPriceReport,
  });

  return {
    isLoading: isPending,
    createReport: mutate,
  };
}
