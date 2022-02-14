import { Request, Response, Router } from 'express';
import { GetUsersController, RegisterUserController } from '@app/controllers';
import { expressAdapter } from '@main/adapters';
import { response } from '@main/factories';

const routes = Router();

routes.post('/user', expressAdapter.controller(new RegisterUserController()));
routes.get('/user', expressAdapter.controller(new GetUsersController()));

routes.all('*', (req: Request, res: Response) => {
	return res.status(404).json(response.notFound());
});

export { routes };
