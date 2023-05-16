import { NextFunction, Response, Request } from 'express';
import jwt = require('jsonwebtoken');

interface RequestAuth extends Request {
  userId?: string,
}

const secret = process.env.JWT_SECRET || 'baereSegredo';
if (!secret) throw new Error('JWT_SECRET is not defined');

const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }
  try {
    const validatedToken = jwt.verify(token, secret) as jwt.JwtPayload;
    req.userId = validatedToken.email;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default auth;
