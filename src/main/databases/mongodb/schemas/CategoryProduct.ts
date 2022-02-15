import { Schema, model, Document } from 'mongoose';

export type ICategorySchema = Document & {
	title: string;
};

const ICategorySchema = new Schema<ICategorySchema>({
	title: {
		type: String,
		required: true,
		max: 250,
	},
});

export default model<ICategorySchema>('CategoryProducts', ICategorySchema);
