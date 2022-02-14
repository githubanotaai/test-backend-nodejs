import { MongoUserRepository } from '@app/repositories/mongodb';
import { GetUsersUserUseCase, IGetUsersUserUseCase, IRegisterUserUseCase, RegisterUserUseCase } from '@app/useCases';

class FactoryUseCases {
	registerUser(): IRegisterUserUseCase {
		const userRepository = new MongoUserRepository();
		return new RegisterUserUseCase(userRepository);
	}
	getUsers(): IGetUsersUserUseCase {
		const userRepository = new MongoUserRepository();
		return new GetUsersUserUseCase(userRepository);
	}
}

export const usecase = new FactoryUseCases();
