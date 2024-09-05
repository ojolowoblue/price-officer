import request from '../request';
import { SignupPayload, SignUpResponse } from './types';

export const signup = (payload: SignupPayload) => {
  return request.post<SignUpResponse>(`/auth/register`, payload);
};
