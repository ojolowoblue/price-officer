import { ref, set, remove, get } from 'firebase/database';

import { database } from '../config';

export const likeProduct = (productId: string, userId: string) => {
  const likeRef = ref(database, `productLikes/${productId}/${userId}`);
  return set(likeRef, {
    userId,
    timestamp: Date.now(),
  });
};

export const unlikeProduct = (productId: string, userId: string) => {
  const likeRef = ref(database, `productLikes/${productId}/${userId}`);
  return remove(likeRef);
};

export const getProductLikes = (productId: string) => {
  const likesRef = ref(database, `productLikes/${productId}`);
  return get(likesRef);
};

export const getAllLikes = () => {
  const likesRef = ref(database, `productLikes`);
  return get(likesRef);
};

export const hasUserLikedProduct = (productId: string, userId: string) => {
  const likeRef = ref(database, `productLikes/${productId}/${userId}`);
  return get(likeRef);
};
