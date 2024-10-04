import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';

export const authenticateJWT = (req: Request & { user?: unknown }, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ success: false, error: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.status(403).json({ success: false, error: 'Invalid token' });
      return;
    }
    req.user = user;
    next();
  });
};