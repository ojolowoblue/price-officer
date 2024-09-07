import request from '../request';
import { SignupPayload, SignUpResponse } from './types';

export const signup = (payload: SignupPayload) => {
  return request.post<SignUpResponse>(`/auth/register`, payload);
};

export const signin = (payload: Pick<SignupPayload, 'email' | 'password'>) => {
  return request.post<SignUpResponse>(`/auth/login`, payload);
};
