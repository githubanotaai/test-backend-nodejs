import { TRegisterUserRequest } from '@app/controllers';
import { TRequest, TResponse } from '@app/controllers/contracts';
import { response } from '@main/factories';
import { ISanitize, IValidate } from './contracts';

/**
 * Sanitize
 */
export class RegisterUserSanitize implements ISanitize {
	async handle(request: TRequest<TRegisterUserRequest>): Promise<TRequest<TRegisterUserRequest>> {
		const req = {
			name: request.data.name,
			type: request.data.type,
		};

		//se der tempo eu limpo os dados

		return {
			...request,
			data: req,
		};
	}
}

/**
 * Validate
 */
export class RegisterUserValidate implements IValidate {
	async handle(request: TRequest<TRegisterUserRequest>): Promise<TResponse> {
		const { name, type } = request.data;
		let error: any[] = [];

		if (!name || typeof name !== 'string' || /^ *$/.test(name)) {
			error.push('Name invalid!');
		}
		if (!type || typeof type !== 'string' || (type != 'admin' && type != 'client')) {
			error.push('Type invalid! Expected: admin or client');
		}

		if (error.length > 0) return response.errorValidation({ data: error });

		return response.ok({});
	}
}
