import mongoose from 'mongoose';
import 'dotenv/config';

try{
  mongoose.connect(
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.v68sj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to database.')

} catch{

  throw new Error('Could not connect to MongoDB.')
}

export default mongoose;