import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
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

export default model('Product', ProductSchema);