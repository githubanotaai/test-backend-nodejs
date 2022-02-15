import { IProductRepository } from '@app/repositories/contracts';
import { IEditProductUseCase, TDataEditProductUseCase, TOutputEditProductUseCase } from './contracts';

export class EditProductUseCase implements IEditProductUseCase {
	constructor(private productRepository: IProductRepository) {}

	async execute(id: string, data: TDataEditProductUseCase): Promise<TOutputEditProductUseCase | null> {
		const categorys = await this.productRepository.getCategorysInIds(data.categorys);
		if (!categorys) return null;

		return await this.productRepository.editProduct(id, {
			...data,
			categorys,
		});
	}
}
