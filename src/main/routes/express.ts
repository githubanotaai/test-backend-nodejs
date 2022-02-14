import { Request, Response, Router } from 'express';
import {
	GetCategoryProductsController,
	GetUsersController,
	RegisterCategoryProductController,
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

routes.all('*', (req: Request, res: Response) => {
	return res.status(404).json(response.notFound());
});

export { routes };
