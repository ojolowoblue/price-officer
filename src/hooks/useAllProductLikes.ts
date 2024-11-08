import { database } from '@/firebase/config';
import { useQuery } from '@tanstack/react-query';
import { get, ref } from 'firebase/database';

export const useAllProductLikes = () => {
  const { data: likes } = useQuery({
    queryKey: ['allProductLikes'],
    queryFn: async () => {
      const likesRef = ref(database, 'productLikes');
      const snapshot = await get(likesRef);

      if (!snapshot.exists()) return {};

      // Transform the data into a map of productId -> likes count
      const likesData = snapshot.val();
      const productLikesCount: Record<string, number> = {};

      Object.entries(likesData).forEach(([productId, productLikes]) => {
        productLikesCount[productId] = Object.keys(productLikes as object).length;
      });

      return productLikesCount;
    },
  });

  return { likes: likes || {} };
};
