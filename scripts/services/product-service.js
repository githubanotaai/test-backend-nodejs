import Product from './../models/product-model.js'

class ProductService {
    static createProduct = require => {
        return new Product(require.body).save()
    }

    static getProducts = require => {
        return Product.find().populate('category')
    }

    static getProduct = require => {
        return Product.findById(require.params.id).lean()
    }

    static searchProductsByCategory = require => {
        return Product.find({category: require.params.id})
    }
    
    static searchProductByTitle = require => {
        return Product.find({title: require.query.title}).lean()
    }

    static deleteProduct = require => {
        return Product.findByIdAndDelete(require.params.id)
    }
}

export default ProductService