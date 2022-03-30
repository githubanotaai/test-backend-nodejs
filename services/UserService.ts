import user from "../models/user";

type TType = 'admin' | 'client'    

export type TUserOutput = {
	_id: string;
	name: string;
	type: TType;
};

export class UserService {
    /**
     * Register new user
     * 
     * @param name string
     * @param type TType admin | client
     * @returns Promise
     */
    async registerUser(name: string, type: TType): Promise<TUserOutput> {
		const userModel = await user.create({ name, type });

		return {
			_id: userModel.id,
			name: userModel.name,
			type: userModel.type,
		};
	}

    /**
     * Get users
     * 
     * @returns Promise
     */
	async getUsers(): Promise<TUserOutput[]> {
		const userModel = await user.find();

		return userModel.map((item) => {
			return {
				_id: item.id,
				name: item.name,
				type: item.type,
			};
		});
	}
}