import { IProductRepository } from '@app/repositories/contracts';
import { IDeleteProductUseCase } from './contracts';

export class DeleteProductUseCase implements IDeleteProductUseCase {
	constructor(private productRepository: IProductRepository) {}

	async execute(id: string): Promise<boolean> {
		return await this.productRepository.deleteProduct(id);
	}
}
