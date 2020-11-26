import { Router } from 'express';
import UserController from './controllers/UserController';

const routes = Router();

const userController = new UserController();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.create);

export default routes;