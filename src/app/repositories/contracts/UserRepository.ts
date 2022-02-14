import { TUserTypes } from '@main/contracts';
import { IRepository } from './IRepository';

export type TUserOutput = {
	id: string;
	name: string;
	type: TUserTypes;
};

export interface IUserRepository extends IRepository {
	registerUser(name: string, type: string): Promise<TUserOutput>;

	getUsers(): Promise<TUserOutput[]>;
}
