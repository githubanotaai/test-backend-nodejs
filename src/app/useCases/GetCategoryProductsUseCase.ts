import { ICategoryProductRepository } from '@app/repositories/contracts';
import { IGetCategoryProductsUseCase, TGetCategoryProductsUseCase } from './contracts';

export class GetCategoryProductsUseCase implements IGetCategoryProductsUseCase {
	constructor(private categoryProductRepository: ICategoryProductRepository) {}

	async execute(): Promise<TGetCategoryProductsUseCase.Output> {
		return await this.categoryProductRepository.getCategorys();
	}
}
