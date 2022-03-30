import 'dotenv/config';

const app = {
	production: process.env.PRODUCTION,

	httpServer: {
		hostname: process.env.SERVER_HOSTNAME,
		port: process.env.SERVER_PORT,
	},
};

export { app };