import { env } from '@main/factories/env';

//------------------------------------------------
// DATABASE CONNECTIONS

const MONGO_HOST = env('MONGO_HOST', 'localhost:27017');
const MONGO_USERNAME = env('MONGO_USERNAME');
const MONGO_PASSWORD = env('MONGO_PASSWORD');
const MONGO_DATABASE = env('MONGO_DATABASE');
const MONGO_OPTIONS = {
	authSource: 'admin',
	user: MONGO_USERNAME,
	pass: MONGO_PASSWORD,
};

//------------------------------------------------

export const app = {
	production: env('PRODUCTION', false),

	// HTTP SERVER
	httpServer: {
		hostname: env('SERVER_HOSTNAME', 'localhost'),
		port: env('SERVER_PORT', 3000),
	},

	// DATABASE CONNECTIONS
	dataBases: {
		default: 'mongodb',

		mongodb: {
			host: MONGO_HOST,
			username: MONGO_USERNAME,
			password: MONGO_PASSWORD,
			database: MONGO_DATABASE,
			options: MONGO_OPTIONS,
			url: `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`,
		},
	},
};
