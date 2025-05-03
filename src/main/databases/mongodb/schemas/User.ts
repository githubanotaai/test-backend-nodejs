import { TUserTypes } from '@main/contracts';
import { Schema, model, Document } from 'mongoose';

export type IUserSchema = Document & {
	name: string;
	type: TUserTypes;
};

const UserSchema = new Schema<IUserSchema>(
	{
		name: {
			type: String,
			required: true,
			max: 250,
		},
		type: {
			type: String,
			required: true,
			max: 100,
		},
	},
	{ timestamps: true }
);

export default model<IUserSchema>('Users', UserSchema);
