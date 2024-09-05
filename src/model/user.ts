export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  identifier: string[];
  role: string;
}

export interface Token {
  token: string;
  expires: string;
}

export interface Tokens {
  access: Token;
  refresh: Token;
}

export interface User {
  user: UserProfile;
  tokens: Tokens;
}
