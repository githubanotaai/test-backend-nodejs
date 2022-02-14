import { IProductRepository } from '@app/repositories/contracts';
import { IGetCategoryProductsUseCase, TGetCategoryProductsUseCase } from './contracts';

export class GetCategoryProductsUseCase implements IGetCategoryProductsUseCase {
	constructor(private productRepository: IProductRepository) {}

	async execute(): Promise<TGetCategoryProductsUseCase.Output> {
		return await this.productRepository.getCategorys();
	}
}
