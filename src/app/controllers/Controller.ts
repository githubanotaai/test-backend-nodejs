import { IMiddleware } from '@app/middlewares/contracts';
import { ISanitize } from '@app/validators/contracts';
import { IController, TRequest, TResponse } from './contracts';

export abstract class Controller implements IController {
	private middlewares: IMiddleware[] = [];

	private sanitizeRequest?: ISanitize;

	protected middleware(middleware: IMiddleware) {
		this.middlewares.push(middleware);
	}

	protected sanitizer(sanitize: ISanitize) {
		this.sanitizeRequest = sanitize;
	}

	async handle(request: TRequest): Promise<TResponse> {
		if (this.sanitizeRequest) request = await this.sanitizeRequest.handle(request);

		for (let middleware of this.middlewares) {
			const res = await middleware.handle(request);
			if (res.type == 'error') return res;
		}

		return await this.execute(request);
	}

	abstract execute(request: TRequest): Promise<TResponse>;
}
