import { TRequest } from '@app/controllers/contracts';

export interface ISanitize {
	handle(request: TRequest): Promise<TRequest>;
}
