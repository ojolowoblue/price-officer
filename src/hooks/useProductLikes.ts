import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { likeProduct, unlikeProduct, getProductLikes, hasUserLikedProduct } from '../firebase/services/likes';

export const useProductLikes = (productId: string, userId: string) => {
  const queryClient = useQueryClient();

  const { data: likes } = useQuery({
    queryKey: ['productLikes', productId],
    queryFn: async () => {
      const snapshot = await getProductLikes(productId);
      if (!snapshot.exists()) return [];
      return Object.values(snapshot.val());
    },
  });

  const { data: hasLiked } = useQuery({
    queryKey: ['productLike', productId, userId],
    queryFn: async () => {
      const snapshot = await hasUserLikedProduct(productId, userId);
      return snapshot.exists();
    },
  });

  const { mutate: like, isPending: isLiking } = useMutation({
    mutationFn: () => likeProduct(productId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allProductLikes'] });
      queryClient.invalidateQueries({ queryKey: ['allProductComments'] });
      queryClient.invalidateQueries({ queryKey: ['productLikes', productId] });
      queryClient.invalidateQueries({ queryKey: ['productLike', productId, userId] });
    },
  });

  const { mutate: unlike, isPending: isUnliking } = useMutation({
    mutationFn: () => unlikeProduct(productId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allProductLikes'] });
      queryClient.invalidateQueries({ queryKey: ['allProductComments'] });
      queryClient.invalidateQueries({ queryKey: ['productLikes', productId] });
      queryClient.invalidateQueries({ queryKey: ['productLike', productId, userId] });
    },
  });

  return {
    loading: isLiking || isUnliking,
    likes,
    hasLiked,
    like,
    unlike,
  };
};
