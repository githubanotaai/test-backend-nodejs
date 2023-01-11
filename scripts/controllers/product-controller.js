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
        if (require.query.price) {
            Product.find({ price: { $lte: price } }, (err, products) => {
                if(!err) {
                    response.status(200).send(products)
                }

                else {
                    response.status(500).send({message: err.message})
                }
            })
        }
        Product.find((err, products) => {
            if(!err) {
                response.status(200).send(products)
            }

            else {
                response.status(400).send({message: err.message})
            }
         })
    }

    static getProduct = (require, response) => {
        const id = require.body.id
        
        Product.findById((err, products)=> {
                if(!err) {
                    response.status(200).send(products)
                }

                else {
                    response.status(400).send({message: err.message})
                }
            })

    }

    static updateProduct = (require, response) => {
        const id = require.body.id 

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
        const id = req.params.id

        Product.findByIdAndDelete(id, err => {

            if(!err) {
                response.status(500).send({message: err.message})
            }

            else {
                response.status(200).send({messagea: 'Successfully delete product'})
            }
        })
    }
}

export default ProductController