import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { find } from 'lodash';

const users = [
  { id: 1, name: 'nome1', email: 'email1@email.com', password: 'admin123' },
  { id: 2, name: 'nome2', email: 'email2@email.com', password: 'admin123' },
  { id: 3, name: 'nome3', email: 'email3@email.com', password: 'admin123' },
  { id: 4, name: 'nome4', email: 'email4@email.com', password: 'admin123' },
];

export default {
  signin(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = find(users, { email, password });

    if (!user) {
      return response
        .status(401)
        .send({ message: 'Email or password not valid' });
    }

    const userToSend = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: jwt.sign(userToSend, process.env.JWT_SECRET || '', {
        expiresIn: '7d',
      }),
    });
  },
  get(request: Request, response: Response) {
    const usersToSend = users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
    }));
    return response.json(usersToSend);
  },
  isAuthenticated(request: Request, response: Response) {
    return response.json({ message: ' authenticated'});
  },
};
