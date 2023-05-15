import { JwtPayload, SignOptions } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'baereSegredo';
if (!secret) throw new Error('JWT_SECRET is not defined');

const options: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1 day',
};

const genToken = (payload: JwtPayload): string => {
  const token = jwt.sign(payload, secret, options);
  return token;
};

const authToken = (token: string): JwtPayload => jwt.verify(token, secret) as JwtPayload;

export { authToken, genToken };
