import { Controller } from '../Controller';
import { response, usecase } from '@main/factories';
import { TRequest, TResponse } from '../contracts';
import { RegisterCategoryProductSanitize, RegisterCategoryProductValidate } from '@app/validators';

export type TRegisterCategoryProductRequest = {
	title: string;
};

export class RegisterCategoryProductController extends Controller {
	constructor() {
		super();
		this.sanitizer(new RegisterCategoryProductSanitize());
		this.middleware(new RegisterCategoryProductValidate());
	}

	async execute(request: TRequest<TRegisterCategoryProductRequest>): Promise<TResponse> {
		const registerCategoryProduct = usecase.registerCategoryProduct();

		const result = await registerCategoryProduct.execute({
			title: request.data.title,
		});

		if (!result) return response.error({ message: 'Categoria já cadastrada' });

		return response.ok({ data: result });
	}
}
