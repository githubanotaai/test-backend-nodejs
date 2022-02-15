import { Controller } from '..';
import { response, usecase } from '@main/factories';
import { TRequest, TResponse } from '../contracts';

export class GetCategoryProductsController extends Controller {
	constructor() {
		super();
	}

	async execute(request: TRequest): Promise<TResponse> {
		const getCategoryProducts = usecase.getCategoryProducts();
		const result = await getCategoryProducts.execute();

		return response.ok({ data: result });
	}
}
