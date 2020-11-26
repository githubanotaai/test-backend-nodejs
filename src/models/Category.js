import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
  title: String,
  created: Date,
  updated: Date,
}, {
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
          }
    },
    versionKey: false,   
}

);

export default model('Category', CategorySchema);