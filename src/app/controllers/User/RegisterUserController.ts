import { Controller } from '../Controller';
import { response, usecase } from '@main/factories';
import { TRequest, TResponse } from '../contracts';
import { RegisterUserSanitize, RegisterUserValidate } from '@app/validators';
import { TUserTypes } from '@main/contracts';

export type TRegisterUserRequest = {
	name: string;
	type: TUserTypes;
};

export class RegisterUserController extends Controller {
	constructor() {
		super();
		this.sanitizer(new RegisterUserSanitize());
		this.middleware(new RegisterUserValidate());
	}

	async execute(request: TRequest<TRegisterUserRequest>): Promise<TResponse> {
		const registerUser = usecase.registerUser();
		const result = await registerUser.execute({
			name: request.data.name,
			type: request.data.type,
		});

		return response.ok({ data: result });
	}
}
