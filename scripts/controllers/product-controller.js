import Product from './../models/product-model.js'

class ProductController {

    static createProduct = (require, response) => {
        const product = new Product(require.body)

         product.save( err => {
            if(!err) {
                response.status(201).send('Successfully create product')
            }

            else {
                response.status(500).send({message: err.message})
            }
         })
    }

    static getProducts = (require, response) => {
        Product.find()
            .populate('category')
            .exec((err, products) => {
                if(!err) {
                    response.status(200).send(products)
                }

                else {
                    response.status(400).send({message: err.message})
                }
            })
    }

    static searchProductsByCategory = (require, response) => {
        const category = require.params.id 

        Product.find({ 'category': category }, (err, products) => {
            if (!err) {
                response.status(200).send(products)
            }

            else {
                response.status(400).send({ message: err.message })
            }
        })
    }

    static searchProductByTitle = (require, response) => {
        const title = require.query.title

        Product.find({ 'title': title}, (err, products) => {
            if (!err) {
                response.status(200).send(products)
            }

            else {
                response.status(400).send({ message: err.message })
            }
        })
    }

    static getProduct = (require, response) => {
        const id = require.params.id
        
        Product.findById(id, (err, product)=> {
                if(!err) {
                    response.status(200).send(product)
                }

                else {
                    response.status(400).send({message: err.message})
                }
            })

    }

    static updateProduct = (require, response) => {
        const id = require.params.id 

        Product.findByIdAndUpdate(id, {$set: require.body}, err => {
            if(!err) {
                response.status(200).send({message: 'Successfully update product'})
            }

            else {
                response.status(500).send({message: err.message})
            }
        })
    }

    static deleteProduct = (require, response) => {
        const id = require.params.id

        Product.findByIdAndDelete(id, err => {

            if(!err) {
                response.status(200).send({ message: 'Successfully delete product' })
            }

            else {
                response.status(500).send({messagea: err.message})
            }
        })
    }
}

export default ProductController