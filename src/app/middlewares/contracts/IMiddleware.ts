import { TRequest, TResponse } from '@app/controllers/contracts';

export interface IMiddleware {
	handle(request: TRequest): Promise<TResponse>;
}
