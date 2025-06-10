import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  userId: string;

  role: string;
}

export const createToken = (
  jwtPayload: CustomJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string,
): CustomJwtPayload => {
  return jwt.verify(token, secret) as CustomJwtPayload;
};
