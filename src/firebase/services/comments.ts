import { ref, set, remove, get, push } from 'firebase/database';

import { database } from '../config';
import { ProductComment } from './types';

export const addProductComment = ({
  productId,
  comment,
}: {
  productId: string;
  comment: Omit<ProductComment, 'id' | 'timestamp' | 'likes'>;
}) => {
  const commentsListRef = ref(database, `productComments/${productId}`);
  const newCommentRef = push(commentsListRef);
  return set(newCommentRef, {
    ...comment,
    id: newCommentRef.key,
    timestamp: Date.now(),
    likes: 0,
  });
};

export const getProductComments = (productId: string) => {
  const commentsRef = ref(database, `productComments/${productId}`);
  return get(commentsRef);
};

export const deleteComment = ({ productId, commentId }: { productId: string; commentId: string }) => {
  const commentRef = ref(database, `productComments/${productId}/${commentId}`);
  return remove(commentRef);
};

export const updateCommentLikes = ({
  productId,
  commentId,
  increment,
}: {
  productId: string;
  commentId: string;
  increment: boolean;
}) => {
  const commentRef = ref(database, `productComments/${productId}/${commentId}`);

  return get(commentRef).then((snapshot) => {
    const comment = snapshot.val();
    const currentLikes = comment?.likes || 0;
    const newLikes = increment ? currentLikes + 1 : currentLikes - 1;

    const likesRef = ref(database, `productComments/${productId}/${commentId}/likes`);
    return set(likesRef, newLikes);
  });
};
