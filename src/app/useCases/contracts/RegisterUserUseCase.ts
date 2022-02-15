import { TUserOutput } from '@app/repositories/contracts';
import { TUserTypes } from '@main/contracts';
import { IUseCase } from '.';

export interface IRegisterUserUseCase extends IUseCase<TRegisterUserUseCase.Input, TRegisterUserUseCase.Output> {}

export namespace TRegisterUserUseCase {
	export type Input = {
		name: string;
		type: TUserTypes;
	};
	export type Output = TUserOutput;
}
