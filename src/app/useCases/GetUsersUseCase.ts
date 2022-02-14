import { IUserRepository } from '@app/repositories/contracts';
import { IGetUsersUserUseCase, TGetUsersUserUseCase } from '.';

export class GetUsersUserUseCase implements IGetUsersUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(): Promise<TGetUsersUserUseCase.Output> {
		return await this.userRepository.getUsers();
	}
}
