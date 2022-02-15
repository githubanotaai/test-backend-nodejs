import { TGetProductsFilter, TProductOutput } from '@app/repositories/contracts';
import { TClients } from '@main/contracts';

export interface IGetProductsUseCase {
	execute(dataInput: TGetProductsFilter, client?: TClients): Promise<TGetProductsUseCase.Output>;
}

export namespace TGetProductsUseCase {
	export type Input = TGetProductsFilter;
	export type Output = TProductOutput[];
}
