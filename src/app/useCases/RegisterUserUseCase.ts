import { IUserRepository } from '@app/repositories/contracts';
import { IRegisterUserUseCase, TRegisterUserUseCase } from './contracts/RegisterUserUseCase';

export class RegisterUserUseCase implements IRegisterUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(props: TRegisterUserUseCase.Input): Promise<TRegisterUserUseCase.Output> {
		return await this.userRepository.registerUser(props.name, props.type);
	}
}
