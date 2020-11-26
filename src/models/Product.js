import { Schema, model, SchemaTypes } from 'mongoose';

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  category: {
    type: SchemaTypes.ObjectId,
    ref: 'Category',
  },
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