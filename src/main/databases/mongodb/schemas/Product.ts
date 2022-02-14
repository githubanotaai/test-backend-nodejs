import { Schema, model, Document } from 'mongoose';

export type IProductSchema = Document & {
	title: string;
	description?: string;
	price: number;
	categorys?: IProductCategorySchema[];
};

type IProductCategorySchema = Document & {
	id: string;
};

const productCategorySchema = new Schema<IProductCategorySchema>({ id: 'string' });

const ProductSchema = new Schema<IProductSchema>(
	{
		title: {
			type: String,
			required: true,
			max: 250,
		},
		description: {
			type: String,
			required: false,
			max: 800,
		},
		price: {
			type: Number,
			required: true,
		},
		categorys: [productCategorySchema],
	},
	{ timestamps: true }
);

export default model<IProductSchema>('Products', ProductSchema);
