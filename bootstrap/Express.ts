import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from '../configs';
import { productRoute } from '../routes/product';
import { userRoute } from '../routes/user';

export class Express {
	private app: express.Application = express();

	constructor() {
		this.middewares();
		this.routes();
		this.handleError();
		const server = this.listen();
		server.timeout = 45000;
	}

	/**
	 * Register middlewares
	 */
	private middewares(): void {
		this.app.use(express.json());
		this.app.use(cors());
	}

	/**
	 * Register routes
	 */
	private routes(): void {
		this.app.use(userRoute);
		this.app.use(productRoute);

		this.app.get("/healthz", (req: Request, res: Response) => res.sendStatus(200));
		this.app.use((req: Request, res: Response) => {
            res.status(404);
            if (req.accepts("html")) {
                res.send("Not found");
                return;
            }
            if (req.accepts("json")) {
                res.send({ error: "Not found"});
                return;
            }
            res.type("txt").send("Not found");
        });
	}

	/**
	 * Handle error
	 */
	private handleError(): void {
		this.app.use((error: any, req: Request, resp: Response, next: NextFunction) => {
			if (!config.app.production) {
				resp.status(error.statusCode ?? 500).json({ success: false, data: { message: 'Error Server!' }});
			} else {
				console.log(error.message ?? 'Error Server!', error);
				resp.status(500).json({ success: false, data: error});
			}
		
			next();
		});
	}

	/**
	 * Init server
	 */
	private listen() {
		return this.app.listen(config.app.httpServer.port, () =>
			console.log(`Server express is running ${config.app.httpServer.hostname}:${config.app.httpServer.port}`)
		);
	}

	/**
	 * Get application express
	 * 
	 * @returns express.Application
	 */
	 public getApp(): express.Application {
		return this.app;
	}
}

