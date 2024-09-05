import { User } from '@/model/user';
import { GenericResponse } from '../types';

export type SignUpResponse = GenericResponse<User>;

export interface SignupPayload {
  name: string;
  username: string;
  identifier: string;
  email: string;
  password: string;
}
