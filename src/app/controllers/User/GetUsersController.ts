import { Controller } from '../Controller';
import { response, usecase } from '@main/factories';
import { TRequest, TResponse } from '../contracts';

export class GetUsersController extends Controller {
	constructor() {
		super();
	}

	async execute(request: TRequest): Promise<TResponse> {
		const getUsers = usecase.getUsers();
		const result = await getUsers.execute();

		return response.ok({ data: result });
	}
}
