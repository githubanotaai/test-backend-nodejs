import { IProductRepository } from '@app/repositories/contracts';
import { IGetProductsUseCase, TGetProductsUseCase } from './contracts';

export class GetProductsUseCase implements IGetProductsUseCase {
	constructor(private productRepository: IProductRepository) {}

	async execute(props: TGetProductsUseCase.Input): Promise<TGetProductsUseCase.Output> {
		return await this.productRepository.getProducts(props);
	}
}
