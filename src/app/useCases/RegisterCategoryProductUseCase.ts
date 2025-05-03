import { IProductRepository } from '@app/repositories/contracts';
import { IRegisterCategoryProductUseCase, TRegisterCategoryProductUseCase } from './contracts';

export class RegisterCategoryProductUseCase implements IRegisterCategoryProductUseCase {
	constructor(private productRepository: IProductRepository) {}

	async execute(
		props: TRegisterCategoryProductUseCase.Input
	): Promise<TRegisterCategoryProductUseCase.Output | null> {
		if (await this.productRepository.getCategoryByTitle(props.title)) return null;

		return await this.productRepository.registerCategory(props.title);
	}
}
