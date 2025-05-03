import { IRepository } from './IRepository';

export type TCategoryProductOutput = {
	_id: string;
	title: string;
};

type TProductCategorys = {
	_id: string;
	title: string;
};

export type TProductOutput = {
	_id: string;
	title: string;
	description?: string;
	price: number;
	categorys?: TProductCategorys[];
};

export type TRegisterProduct = {
	title: string;
	description?: string;
	price: number;
	categorys: TProductCategorys[];
};

export type TGetProductsFilter = {
	title?: string;
	category?: string;
};

export interface IProductRepository extends IRepository {
	// PRODUCT

	getProducts(filter: TGetProductsFilter): Promise<TProductOutput[]>;

	registerProduct(data: TRegisterProduct): Promise<TProductOutput | null>;

	editProduct(id: string, data: TRegisterProduct): Promise<TProductOutput | null>;

	deleteProduct(id: string): Promise<boolean>;

	// CATEGORY PRODUCT

	getCategorysInIds(ids: string[]): Promise<TCategoryProductOutput[] | null>;

	getCategoryByTitle(title: string): Promise<TCategoryProductOutput | null>;

	getCategorys(): Promise<TCategoryProductOutput[]>;

	registerCategory(title: string): Promise<TCategoryProductOutput>;
}
