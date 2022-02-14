import { TUserOutput } from '@app/repositories/contracts';
import { IUseCase } from '.';

export interface IGetUsersUserUseCase extends IUseCase<any, TGetUsersUserUseCase.Output> {}

export namespace TGetUsersUserUseCase {
	export type Output = TUserOutput[];
}
