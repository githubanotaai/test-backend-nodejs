import { Controller } from './Controller';
import { response, usecase } from '@main/factories';
import { TRequest, TResponse } from './contracts';
import { RegisterProductSanitize, RegisterProductValidate } from '@app/validators';

export type TRegisterProductRequest = {
	title: string;
	description?: string;
	price: number;
	categorys: string[];
};

export class RegisterProductController extends Controller {
	constructor() {
		super();
		this.sanitizer(new RegisterProductSanitize());
		this.middleware(new RegisterProductValidate());
	}

	async execute(request: TRequest<TRegisterProductRequest>): Promise<TResponse> {
		const registerProduct = usecase.registerProduct();

		const result = await registerProduct.execute({
			title: request.data.title,
			description: request.data.description,
			price: request.data.price,
			categorys: request.data.categorys,
		});

		if (!result) return response.error({ message: 'Produto já cadastrado' });

		return response.ok({ data: result });
	}
}
