import { Controller } from './Controller';
import { response, usecase } from '@main/factories';
import { TRequest, TResponse } from './contracts';

export class GetProductsController extends Controller {
	constructor() {
		super();
	}

	async execute(request: TRequest): Promise<TResponse> {
		const getProducts = usecase.getProducts();
		const result = await getProducts.execute(request.query);

		return response.ok({ data: result });
	}
}
