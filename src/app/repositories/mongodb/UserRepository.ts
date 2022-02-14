import User from '@main/databases/mongodb/schemas/User';
import { TUserTypes } from '@main/contracts';
import { MongoRepository } from '.';
import { IUserRepository, TUserOutput } from '../contracts';

export class MongoUserRepository extends MongoRepository implements IUserRepository {
	async registerUser(name: string, type: TUserTypes): Promise<TUserOutput> {
		const userModel = await User.create({ name, type });

		return {
			id: userModel.id,
			name: userModel.name,
			type: userModel.type,
		};
	}

	async getUsers(): Promise<TUserOutput[]> {
		const userModel = await User.find();

		return userModel.map((item) => {
			return {
				id: item.id,
				name: item.name,
				type: item.type,
			};
		});
	}
}
