import { config } from '@main/configs';
import mongoose from 'mongoose';

export const mongodbConnection = () => {
	return mongoose.connect(config.app.dataBases.mongodb.url, config.app.dataBases.mongodb.options);
};
