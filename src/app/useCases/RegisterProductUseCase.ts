import { IProductRepository } from '@app/repositories/contracts';
import { IRegisterProductUseCase, TRegisterProductUseCase } from './contracts';

export class RegisterProductUseCase implements IRegisterProductUseCase {
	constructor(private productRepository: IProductRepository) {}

	async execute(props: TRegisterProductUseCase.Input): Promise<TRegisterProductUseCase.Output> {
		const categorys = await this.productRepository.getCategorysInIds(props.categorys);
		if (!categorys) return null;

		return await this.productRepository.registerProduct({
			...props,
			categorys,
		});
	}
}
