import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://admin:admin123@cluster.ovjsowh.mongodb.net/test-backend-nodejs')

export default mongoose.connection