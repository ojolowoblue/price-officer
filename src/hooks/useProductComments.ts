import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProductComments,
  addProductComment,
  deleteComment,
  updateCommentLikes,
} from '../firebase/services/comments';
import { ProductComment } from '../firebase/services/types';

export const useHasUserCommented = ({ productId, userId }: { productId: string; userId: string }) => {
  return useQuery({
    queryKey: ['userComment', productId, userId],
    queryFn: async () => {
      const snapshot = await getProductComments(productId);
      if (!snapshot.exists()) return false;

      const comments = Object.values(snapshot.val()) as ProductComment[];
      return comments.some((comment) => comment.userId === userId);
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};

export const useProductComments = (productId: string) => {
  return useQuery({
    queryKey: ['comments', productId],
    queryFn: async () => {
      const snapshot = await getProductComments(productId);
      if (!snapshot.exists()) return [];
      return Object.values(snapshot.val()).sort((a, b) => {
        const commentA = a as ProductComment;
        const commentB = b as ProductComment;
        return commentB.timestamp - commentA.timestamp;
      }) as ProductComment[];
    },
  });
};

// Mutation hooks
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allProductLikes'] });
      queryClient.invalidateQueries({ queryKey: ['allProductComments'] });
      queryClient.invalidateQueries({ queryKey: ['userComment'] });
      queryClient.invalidateQueries({ queryKey: ['comments', variables.productId] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allProductLikes'] });
      queryClient.invalidateQueries({ queryKey: ['allProductComments'] });
      queryClient.invalidateQueries({ queryKey: ['comments', variables.productId] });
    },
  });
};

export const useUpdateCommentLikes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommentLikes,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allProductLikes'] });
      queryClient.invalidateQueries({ queryKey: ['allProductComments'] });
      queryClient.invalidateQueries({ queryKey: ['comments', variables.productId] });
    },
  });
};
