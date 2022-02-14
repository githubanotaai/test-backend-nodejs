import { MongoCategoryProductRepository, MongoUserRepository } from '@app/repositories/mongodb';
import { GetUsersUserUseCase, RegisterCategoryProductUseCase, RegisterUserUseCase } from '@app/useCases';
import {
	IGetCategoryProductsUseCase,
	IGetUsersUserUseCase,
	IRegisterCategoryProductUseCase,
	IRegisterUserUseCase,
} from '@app/useCases/contracts';
import { GetCategoryProductsUseCase } from '@app/useCases/GetCategoryProductsUseCase';

class FactoryUseCases {
	registerUser(): IRegisterUserUseCase {
		const userRepository = new MongoUserRepository();
		return new RegisterUserUseCase(userRepository);
	}
	getUsers(): IGetUsersUserUseCase {
		const userRepository = new MongoUserRepository();
		return new GetUsersUserUseCase(userRepository);
	}
	registerCategoryProduct(): IRegisterCategoryProductUseCase {
		const categoryProductRepository = new MongoCategoryProductRepository();
		return new RegisterCategoryProductUseCase(categoryProductRepository);
	}
	getCategoryProducts(): IGetCategoryProductsUseCase {
		const categoryProductRepository = new MongoCategoryProductRepository();
		return new GetCategoryProductsUseCase(categoryProductRepository);
	}
}

export const usecase = new FactoryUseCases();
