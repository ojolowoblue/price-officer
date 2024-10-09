import request from '../request';
import { SignupPayload, SignUpResponse } from './types';

export const signup = (payload: SignupPayload) => {
  return request.post<SignUpResponse>(`/auth/register`, payload);
};

export const signin = (payload: Pick<SignupPayload, 'email' | 'password'>) => {
  return request.post<SignUpResponse>(`/auth/login`, payload);
};

export const google_signin = (payload: { token: string }) => {
  return request.post<SignUpResponse>(`/auth/google`, payload);
};

export const signout = (payload: { refreshToken: string }) => {
  return request.post<SignUpResponse>(`/auth/logout`, payload);
};
