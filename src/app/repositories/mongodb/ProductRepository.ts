import CategoryProduct, { ICategorySchema } from '@main/databases/mongodb/schemas/CategoryProduct';
import Product, { IProductSchema } from '@main/databases/mongodb/schemas/Product';
import { MongoRepository } from '.';
import {
	IProductRepository,
	TCategoryProductOutput,
	TGetProductsFilter,
	TProductOutput,
	TRegisterProduct,
} from '../contracts';

export class MongoProductRepository extends MongoRepository implements IProductRepository {
	//----------------------------------------------------------------
	// PRODUCT

	mapProduct(item: IProductSchema): TProductOutput {
		return {
			_id: item.id,
			title: item.title,
			description: item.description,
			price: item.price,
			categorys: item.categorys,
		};
	}

	async getProducts(filter: TGetProductsFilter): Promise<TProductOutput[]> {
		let query: any = {};
		if (filter.title) query.title = { $regex: new RegExp('^' + filter.title.toLowerCase(), 'i') };
		if (filter.category)
			query.categorys = {
				$elemMatch: { title: { $regex: new RegExp('^' + filter.category.toLowerCase(), 'i') } },
			};

		const model = await Product.find(query).exec();

		return model.map((item) => this.mapProduct(item));
	}

	async registerProduct(data: TRegisterProduct): Promise<TProductOutput> {
		const model = await Product.create({
			title: data.title,
			description: data.description,
			price: data.price,
			categorys: data.categorys,
		});

		return this.mapProduct(model);
	}

	async editProduct(id: string, data: TRegisterProduct): Promise<TProductOutput | null> {
		try {
			let model = await Product.findOneAndUpdate({ _id: id }, data);
			model = await Product.findById(id);

			if (!model) return null;

			return this.mapProduct(model);
		} catch (error) {
			return null;
		}
	}

	async deleteProduct(id: string): Promise<boolean> {
		try {
			const model = await Product.findByIdAndDelete(id);
			return model ? true : false;
		} catch (error) {
			return false;
		}
	}

	//----------------------------------------------------------------
	//CATEGORY PRODUCT

	mapCategoryProduct(item: ICategorySchema): TCategoryProductOutput {
		return {
			_id: item.id,
			title: item.title,
		};
	}

	async getCategorysInIds(ids: string[]): Promise<TCategoryProductOutput[] | null> {
		const model = await CategoryProduct.find({ _id: { $in: ids } }).exec();
		if (!model) return null;

		return model.map((item) => this.mapCategoryProduct(item));
	}

	async getCategoryByTitle(title: string): Promise<TCategoryProductOutput | null> {
		const model = await CategoryProduct.findOne({ title }).exec();
		if (!model) return null;

		return this.mapCategoryProduct(model);
	}

	async getCategorys(): Promise<TCategoryProductOutput[]> {
		const model = await CategoryProduct.find();

		return model.map((item) => this.mapCategoryProduct(item));
	}

	async registerCategory(title: string): Promise<TCategoryProductOutput> {
		const model = await CategoryProduct.create({ title });

		return this.mapCategoryProduct(model);
	}
}
