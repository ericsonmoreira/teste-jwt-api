import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // bearer token

  try {
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) throw new Error('Jwt key is not defined');

    const payload = jwt.verify(token, JWT_SECRET);

    console.log(JSON.stringify(payload, null, 2));

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid Token' });
  }
};

export default authMiddleware;
