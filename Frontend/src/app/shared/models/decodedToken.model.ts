export interface DecodedToken {
  access: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
  name: string;
  role: string;
  userId: string;
}
