import categoryProduct, { ICategorySchema } from "../models/category-product";
import product, { IProductSchema } from "../models/product";

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
	categorys: TProductCategorys[] | null;
};

export type TGetProductsFilter = {
	title?: string;
	category?: string;
};

export class ProductService {
    //----------------------------------------------------------------
	// PRODUCT

    /**
     * Map return product
     * 
     * @param item IProductSchema
     * @returns object
     */
	mapProduct(item: IProductSchema): TProductOutput {
		return {
			_id: item.id,
			title: item.title,
			description: item.description,
			price: item.price,
			categorys: item.categorys,
		};
	}

    /**
     * Get products
     * 
     * @param filter TGetProductsFilter
     * @returns Promise
     */
	async getProducts(filter: TGetProductsFilter): Promise<TProductOutput[]> {
		let query: any = {};
		if (filter.title) query.title = { $regex: new RegExp('^' + filter.title.toLowerCase(), 'i') };
		if (filter.category)
			query.categorys = {
				$elemMatch: { title: { $regex: new RegExp('^' + filter.category.toLowerCase(), 'i') } },
			};

		const model = await product.find(query).exec();

		return model.map((item: IProductSchema) => this.mapProduct(item));
	}

    /**
     * Register new product
     * 
     * @param data TRegisterProduct
     * @returns Promise
     */
	async registerProduct(data: TRegisterProduct): Promise<TProductOutput> {
		const model = await product.create({
			title: data.title,
			description: data.description,
			price: data.price,
			categorys: data.categorys,
		});

		return this.mapProduct(model);
	}

    /**
     * Edit product
     * 
     * @param id string
     * @param data TRegisterProduct
     * @returns Promise
     */
	async editProduct(id: string, data: TRegisterProduct): Promise<TProductOutput | null> {
		try {
			let model = await product.findOneAndUpdate({ _id: id }, data);
			model = await product.findById(id);

			if (!model) return null;

			return this.mapProduct(model);
		} catch (error) {
			return null;
		}
	}

    /**
     * Delete product
     * 
     * @param id string
     * @returns Promise
     */
	async deleteProduct(id: string): Promise<boolean> {
		try {
			const model = await product.findByIdAndDelete(id);
			return model ? true : false;
		} catch (error) {
			return false;
		}
	}

	//----------------------------------------------------------------
	//CATEGORY PRODUCT

    /**
     * Map return category product
     * 
     * @param item 
     * @returns object
     */
	mapCategoryProduct(item: ICategorySchema): TCategoryProductOutput {
		return {
			_id: item.id,
			title: item.title,
		};
	}

    /**
     * Get category in ids
     * 
     * @param ids string[]
     * @returns Promise
     */
	async getCategorysInIds(ids: string[]): Promise<TCategoryProductOutput[] | null> {
		const model = await categoryProduct.find({ _id: { $in: ids } }).exec();
		if (!model) return null;

		return model.map((item: ICategorySchema) => this.mapCategoryProduct(item));
	}

    /**
     * Get category by title
     * 
     * @param title string
     * @returns Promise
     */
	async getCategoryByTitle(title: string): Promise<TCategoryProductOutput | null> {
		const model = await categoryProduct.findOne({ title }).exec();
		if (!model) return null;

		return this.mapCategoryProduct(model);
	}

    /**
     * Get categorys
     * 
     * @returns Promise
     */
	async getCategorys(): Promise<TCategoryProductOutput[]> {
		const model = await categoryProduct.find();

		return model.map((item: ICategorySchema) => this.mapCategoryProduct(item));
	}

    /**
     * Register new category
     * 
     * @param title string
     * @returns Promise
     */
	async registerCategory(title: string): Promise<TCategoryProductOutput> {
		const model = await categoryProduct.create({ title });

		return this.mapCategoryProduct(model);
	}
}