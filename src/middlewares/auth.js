import 'dotenv/config';
import jwt from 'jsonwebtoken';

const authMiddleware =  (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // bearer token

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log(JSON.stringify(payload, null, 2));

    request.payload = payload;

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid Token' });
  }
};

export default authMiddleware;
