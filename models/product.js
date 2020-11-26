const mongoose = require('mongoose');

//schema
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category:{
        type: String
    }  
});

//model
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;