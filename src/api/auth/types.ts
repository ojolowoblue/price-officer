import { User } from '@/model/user';

export type SignUpResponse = User;

export interface SignupPayload {
  name: string;
  username: string;
  identifier: string;
  email: string;
  password: string;
}
