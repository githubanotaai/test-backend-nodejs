import { TRequest, TResponse } from '@app/controllers/contracts';
import { TRegisterCategoryProductRequest } from '@app/controllers';
import { response } from '@main/factories';
import { ISanitize, IValidate } from './contracts';

/**
 * Sanitize
 */
export class RegisterCategoryProductSanitize implements ISanitize {
	async handle(
		request: TRequest<TRegisterCategoryProductRequest>
	): Promise<TRequest<TRegisterCategoryProductRequest>> {
		const req = {
			title: request.data.title,
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
export class RegisterCategoryProductValidate implements IValidate {
	async handle(request: TRequest<TRegisterCategoryProductRequest>): Promise<TResponse> {
		const { title } = request.data;
		let error: any[] = [];

		if (!title || typeof title !== 'string' || /^ *$/.test(title)) {
			error.push('Category invalid!');
		}

		if (error.length > 0) return response.errorValidation({ data: error });

		return response.ok({});
	}
}
