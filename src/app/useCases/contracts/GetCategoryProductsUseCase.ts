import { TCategoryProductOutput } from '@app/repositories/contracts';
import { IUseCase } from '.';

export interface IGetCategoryProductsUseCase extends IUseCase<any, TGetCategoryProductsUseCase.Output> {}

export namespace TGetCategoryProductsUseCase {
	export type Output = TCategoryProductOutput[];
}
