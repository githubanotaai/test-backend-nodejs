import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    id: {type: String, required: false},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
})

export default mongoose.model('products', productSchema)