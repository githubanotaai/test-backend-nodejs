import { TRequest, TResponse } from '@app/controllers/contracts';

export interface IValidate {
	handle(request: TRequest): Promise<TResponse>;
}
