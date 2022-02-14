import { TUserTypes } from '@main/contracts';
import { IRepository } from './IRepository';

export type TCategoryProductOutput = {
	id: string;
	title: string;
};

export interface ICategoryProductRepository extends IRepository {
	getCategoryByTitle(title: string): Promise<TCategoryProductOutput | null>;

	getCategorys(): Promise<TCategoryProductOutput[]>;

	registerCategory(title: string): Promise<TCategoryProductOutput>;
}
