import { IController } from '@app/controllers/contracts';
import { IMiddleware } from '@app/middlewares/contracts';
import { NextFunction, Request, Response } from 'express';

const resolvePromise = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
	Promise.resolve(fn(req, res, next)).catch(next);

class ExpressAdapter {
	controller(controller: IController) {
		return resolvePromise(async (req: Request, res: Response) => {
			const response = await controller.handle({
				client: 'rest',
				data: req.body || {},
				params: req.params || {},
				query: req.query || {},
				headers: req.headers || {},
				accessToken: req.headers?.['x-access-token'],
			});

			res.status(response.status).json(response);
		});
	}

	middleware(middleware: IMiddleware) {
		return resolvePromise(async (req: Request, res: Response, next: NextFunction) => {
			const response = await middleware.handle({
				client: 'rest',
				data: req.body || {},
				params: req.params || {},
				query: req.query || {},
				headers: req.headers || {},
				accessToken: req.headers?.['x-access-token'] || '',
			});

			if (response.type == 'success') {
				next();
			}
			if (response.type == 'error') {
				res.status(response.status).json(response);
			}
		});
	}
}

export const expressAdapter = new ExpressAdapter();
