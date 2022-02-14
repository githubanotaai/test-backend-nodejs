import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from '@main/routes/express';
import { log, response } from '@main/factories';
import { bootstrap } from './bootstrap';
import { config } from '@main/configs';

bootstrap(() => {
	const app: express.Application = express();

	app.use(express.json());
	app.use(cors());
	app.use(routes);
	app.use((error: any, req: Request, resp: Response, next: NextFunction) => {
		// development
		if (!config.app.production) {
			return resp
				.status(error.statusCode ?? 500)
				.json(response.error({ message: error.message ?? 'Error Server', data: error }));
		}

		// production
		log.error(error.message ?? 'Error Server!', error);
		return resp.status(500).json(response.internalServerError());
	});

	// initt server
	app.listen(config.app.httpServer.port, () =>
		log.info(`Server express is running ${config.app.httpServer.hostname}:${config.app.httpServer.port}`)
	);
});
