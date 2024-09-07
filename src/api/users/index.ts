import { UserProfile } from '@/model/user';

import request from '../request';

export const getUser = (id: string) => {
  return request.get<UserProfile>(`/users/${id}`);
};
