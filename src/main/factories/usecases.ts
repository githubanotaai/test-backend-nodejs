import { MongoProductRepository, MongoUserRepository } from '@app/repositories/mongodb';
import {
	DeleteProductUseCase,
	GetProductsUseCase,
	GetUsersUserUseCase,
	RegisterCategoryProductUseCase,
	RegisterProductUseCase,
	RegisterUserUseCase,
} from '@app/useCases';
import {
	IDeleteProductUseCase,
	IGetCategoryProductsUseCase,
	IGetProductsUseCase,
	IGetUsersUserUseCase,
	IRegisterCategoryProductUseCase,
	IRegisterProductUseCase,
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
		const productRepository = new MongoProductRepository();
		return new RegisterCategoryProductUseCase(productRepository);
	}
	getCategoryProducts(): IGetCategoryProductsUseCase {
		const productRepository = new MongoProductRepository();
		return new GetCategoryProductsUseCase(productRepository);
	}
	registerProduct(): IRegisterProductUseCase {
		const productRepository = new MongoProductRepository();
		return new RegisterProductUseCase(productRepository);
	}
	getProducts(): IGetProductsUseCase {
		const productRepository = new MongoProductRepository();
		return new GetProductsUseCase(productRepository);
	}
	deleteProduct(): IDeleteProductUseCase {
		const productRepository = new MongoProductRepository();
		return new DeleteProductUseCase(productRepository);
	}
}

export const usecase = new FactoryUseCases();
