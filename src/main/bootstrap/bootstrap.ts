import { mongodbConnection } from '@main/databases/mongodb';
import { log } from '@main/factories';

export const bootstrap = async (fn: Function) => {
	try {
		await mongodbConnection();
		log.info(`Database mongodb is running`);

		await fn();
	} catch (error: any) {
		log.critical(error.message ?? 'Critical Error!', error);
	}
};
