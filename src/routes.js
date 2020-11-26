import { Router } from 'express';
import UserController from './controllers/UserController';
import ProductController from './controllers/ProductController';
import CategoryController from './controllers/CategoryController';

const routes = Router();

const userController = new UserController();
const productController = new ProductController();
const categoryController = new CategoryController();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.create);


routes.get('/products', productController.index);
routes.get('/products/:id', productController.show);
routes.post('/products', productController.create);

routes.get('/categories', categoryController.index);
routes.get('/categories/:id', categoryController.show);
routes.post('/categories', categoryController.create);

export default routes;