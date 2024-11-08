import { useQuery } from '@tanstack/react-query';
import { get, ref } from 'firebase/database';

import { database } from '@/firebase/config';

export const useAllProductComments = () => {
  const { data: comments } = useQuery({
    queryKey: ['allProductComments'],
    queryFn: async () => {
      const likesRef = ref(database, 'productComments');
      const snapshot = await get(likesRef);

      if (!snapshot.exists()) return {};

      const likesData = snapshot.val();
      const productCommentsCount: Record<string, number> = {};

      Object.entries(likesData).forEach(([productId, productComments]) => {
        productCommentsCount[productId] = Object.keys(productComments as object).length;
      });

      return productCommentsCount;
    },
  });

  return { comments: comments || {} };
};
