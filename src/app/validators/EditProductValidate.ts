import { TRequestEditProduct } from '@app/controllers/Product';
import { TRequest, TResponse } from '@app/controllers/contracts';
import { response } from '@main/factories';
import { ISanitize, IValidate } from './contracts';

/**
 * Sanitize
 */
export class EditProductSanitize implements ISanitize {
	async handle(request: TRequest<TRequestEditProduct>): Promise<TRequest<TRequestEditProduct>> {
		const req = {
			title: request.data.title,
			description: request.data.description,
			price: request.data.price,
			categorys: request.data.categorys,
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
export class EditProductValidate implements IValidate {
	async handle(request: TRequest<TRequestEditProduct>): Promise<TResponse> {
		const { title, description, price, categorys } = request.data;
		let error: any[] = [];

		if (!title || typeof title !== 'string' || /^ *$/.test(title)) {
			error.push('Name Product invalid!');
		}
		if (!description || typeof description !== 'string' || /^ *$/.test(title)) {
			error.push('Description Product invalid!');
		}
		if (!price || typeof price !== 'number') {
			error.push('Price Product invalid!');
		}
		if (!categorys || typeof categorys !== 'object' || Object.keys(categorys).length === 0) {
			error.push('Categorys Product format invalid! Expected: array ids category');
		}

		if (error.length > 0) return response.errorValidation({ data: error });

		return response.ok({});
	}
}
