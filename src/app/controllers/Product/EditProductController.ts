import { Controller } from '..';
import { response, usecase } from '@main/factories';
import { TRequest, TResponse } from '../contracts';
import { EditProductSanitize, EditProductValidate } from '@app/validators';
import { TDataEditProductUseCase } from '@app/useCases/contracts';

export type TRequestEditProduct = TDataEditProductUseCase;

export class EditProductController extends Controller {
	constructor() {
		super();
		this.sanitizer(new EditProductSanitize());
		this.middleware(new EditProductValidate());
	}

	async execute(request: TRequest<TRequestEditProduct>): Promise<TResponse> {
		const editProduct = usecase.editProduct();
		const result = await editProduct.execute(request.params.id, request.data);

		if (!result) return response.error({ message: 'Erro ao editar o produto' });

		return response.ok({ message: 'Produto editado com sucesso', data: result });
	}
}
