export interface JwtPayload {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  userId: number;
  roles: string[]
}
