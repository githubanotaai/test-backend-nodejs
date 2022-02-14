import CategoryProduct from '@main/databases/mongodb/schemas/CategoryProduct';
import { MongoRepository } from '.';
import { ICategoryProductRepository, TCategoryProductOutput } from '../contracts';

export class MongoCategoryProductRepository extends MongoRepository implements ICategoryProductRepository {
	async getCategoryByTitle(title: string): Promise<TCategoryProductOutput | null> {
		const categoryModel = await CategoryProduct.findOne({ title }).exec();
		if (!categoryModel) return null;

		return {
			id: categoryModel.id,
			title: categoryModel.title,
		};
	}

	async getCategorys(): Promise<TCategoryProductOutput[]> {
		const categoryModel = await CategoryProduct.find();

		return categoryModel.map((item) => {
			return {
				id: item.id,
				title: item.title,
			};
		});
	}

	async registerCategory(title: string): Promise<TCategoryProductOutput> {
		const categoryModel = await CategoryProduct.create({ title });

		return {
			id: categoryModel.id,
			title: categoryModel.title,
		};
	}
}
