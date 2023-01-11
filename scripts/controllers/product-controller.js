import Product from './../models/product-model'

class ProductController {
    static getProducts = (require, response) => {
        if(require.query.price) {
            Product.find({ price: { $lte: price }}, (err, products) => {
                response.status(200).send(products)
            })
        }

        else {
            Product.find((err, products) => {
                response.status(200).send(products)
            })
        }
    }
}

export default ProductController