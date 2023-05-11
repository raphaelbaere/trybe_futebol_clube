import { JwtPayload, SignOptions } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env || 'theCenterWontHold';
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');

const options: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1 day',
};

const genToken = (payload: JwtPayload): string => {
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

const authToken = (token: string): JwtPayload => jwt.verify(token, JWT_SECRET) as JwtPayload;

export { authToken, genToken };
