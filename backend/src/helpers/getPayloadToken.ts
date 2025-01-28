import jwt, { JwtPayload } from "jsonwebtoken";

export const getPayloadToken = (token: string): string | JwtPayload | null => {
  const decoded = jwt.decode(token);
  return decoded;
};