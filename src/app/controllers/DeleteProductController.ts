import { Controller } from './Controller';
import { response, usecase } from '@main/factories';
import { TRequest, TResponse } from './contracts';

export class DeleteProductController extends Controller {
	constructor() {
		super();
	}

	async execute(request: TRequest): Promise<TResponse> {
		const deleteProduct = usecase.deleteProduct();
		const result = await deleteProduct.execute(request.params.id);

		if (!result) return response.error({ message: 'Erro ao deletar o produto' });

		return response.ok({ message: 'Produto deletado com sucesso' });
	}
}
