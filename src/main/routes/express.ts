import { Request, Response, Router } from 'express';
import {
	GetCategoryProductsController,
	GetProductsController,
	GetUsersController,
	RegisterCategoryProductController,
	RegisterProductController,
	RegisterUserController,
} from '@app/controllers';
import { expressAdapter } from '@main/adapters';
import { response } from '@main/factories';

const routes = Router();

// User
routes.post('/user', expressAdapter.controller(new RegisterUserController()));
routes.get('/user', expressAdapter.controller(new GetUsersController()));

// CategoryProduct
routes.post('/product/category', expressAdapter.controller(new RegisterCategoryProductController()));
routes.get('/product/category', expressAdapter.controller(new GetCategoryProductsController()));

// Product
routes.post('/product', expressAdapter.controller(new RegisterProductController()));
routes.get('/product', expressAdapter.controller(new GetProductsController()));

routes.all('*', (req: Request, res: Response) => {
	return res.status(404).json(response.notFound());
});

export { routes };
