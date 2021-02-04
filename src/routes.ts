import { Router } from 'express';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/auth';

const routes = Router();

routes.post('/signin', UserController.signin);

routes.get('/user', authMiddleware, UserController.get);

export default routes;
