import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authMiddleware =  (request: Request, response: Response, next: any) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // bearer token

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '');

    console.log(JSON.stringify(payload, null, 2));

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid Token' });
  }
};

export default authMiddleware;
