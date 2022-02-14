import { IRepository } from './IRepository';

export type TProductOutput = {
	id: string;
	title: string;
	description?: string;
	price: number;
};

export type TRegisterProduct = {
	title: string;
	description?: string;
	price: number;
	categorys: string[];
};

export interface IProductRepository extends IRepository {
	getProducts(): Promise<TProductOutput[]>;

	registerProduct(data: TRegisterProduct): Promise<TProductOutput>;

	editProduct(id: string): Promise<TProductOutput>;

	deleteProduct(id: string): Promise<void>;
}
