

import mongoose from 'mongoose';
import { config } from '../configs';

/**
 * MongoDb connection
 * 
 * @returns Promise
 */
export const mongodbConnection = () => {
    console.log("Mongose Version:", mongoose.version);
    
	return mongoose.connect(config.database.mongodb.url, config.database.mongodb.options);
};