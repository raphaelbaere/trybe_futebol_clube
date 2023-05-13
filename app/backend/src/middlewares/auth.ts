import { NextFunction, Response, Request } from 'express';
import jwt = require('jsonwebtoken');

interface RequestAuth extends Request {
  userId?: string,
}

const { JWT_SECRET } = process.env || 'baereSegredo';
if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');

const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }
  try {
    const validatedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    req.userId = validatedToken.email;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default auth;
