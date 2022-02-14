import { TCategoryProductOutput } from '@app/repositories/contracts';
import { IUseCase } from '.';

export interface IRegisterCategoryProductUseCase
	extends IUseCase<TRegisterCategoryProductUseCase.Input, TRegisterCategoryProductUseCase.Output> {}

export namespace TRegisterCategoryProductUseCase {
	export type Input = {
		title: string;
	};
	export type Output = TCategoryProductOutput | null;
}
