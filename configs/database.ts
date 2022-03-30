import 'dotenv/config';

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_OPTIONS = {
	authSource: 'admin',
	user: MONGO_USERNAME,
	pass: MONGO_PASSWORD,
};

const database = {
	mongodb: {
		host: MONGO_HOST,
		username: MONGO_USERNAME,
		password: MONGO_PASSWORD,
		database: MONGO_DATABASE,
		options: MONGO_OPTIONS,
		url: `mongodb://${MONGO_HOST}/${MONGO_DATABASE}`,
	},
};

export { database };