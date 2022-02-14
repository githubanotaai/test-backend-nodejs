import { TCategoryProductOutput } from '@app/repositories/contracts';
import { IUseCase } from '.';

export interface IRegisterProductUseCase
	extends IUseCase<TRegisterProductUseCase.Input, TRegisterProductUseCase.Output> {}

export namespace TRegisterProductUseCase {
	export type Input = {
		title: string;
		description?: string;
		price: number;
		categorys: string[];
	};
	export type Output = TCategoryProductOutput | null;
}
