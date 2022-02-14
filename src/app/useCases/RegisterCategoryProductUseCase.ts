import { ICategoryProductRepository } from '@app/repositories/contracts';
import { IRegisterCategoryProductUseCase, TRegisterCategoryProductUseCase } from './contracts';

export class RegisterCategoryProductUseCase implements IRegisterCategoryProductUseCase {
	constructor(private categoryProductRepository: ICategoryProductRepository) {}

	async execute(
		props: TRegisterCategoryProductUseCase.Input
	): Promise<TRegisterCategoryProductUseCase.Output | null> {
		if (await this.categoryProductRepository.getCategoryByTitle(props.title)) return null;

		return await this.categoryProductRepository.registerCategory(props.title);
	}
}
