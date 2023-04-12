import ProductService from './../services/product-service.js'

class ProductController {

    static createProduct = (require, response) => {
        ProductService.createProduct(require)
        .then(() => {
            response.status(201).send({message: 'Successfully create product'})
        })

        .catch(err => {
            response.status(500).send({message: err.message})
        })
    }

    static getProducts = (require, response) => {
        ProductService.getProducts(require)
        .then(products => {
            response.status(200).send(products)
        })

        .catch(err => {
            response.status(400).send({message: err.message})
        })
    }

    static searchProductsByCategory = (require, response) => {
        ProductService.searchProductsByCategory(require)
        .then(products => {
            response.status(200).send(products)
        })

        .catch(err => {
            response.status(400).send({message: err.message})
        })
    }

    static searchProductByTitle = (require, response) => {
        ProductService.searchProductByTitle(require)
        .then(product => {
            response.status(200).send(product)
        }) 

        .catch(err => {
            response.status(400).send({message: err.message})
        })
    }

    static getProduct = (require, response) => {

        ProductService.getProduct(require)
        .then(product => {
            response.status(200).send(product)
        })

        .catch(err => {
            response.status(400).send({message: err.message})
        })
    }

    static updateProduct = (require, response) => {

        ProductService.updateProduct(require) 
        .then( success => {
            response.status(200).send({message: 'Successfully update product'})
        })

        .catch(err => {
            response.status(500).send({message: err.message})
        })
    }

    static deleteProduct = (require, response) => {
        ProductService.deleteProduct(require)
        .then(() => {
            response.status(200).send({message: 'Successfully delete product'})
        })

        .catch(err => {
            response.status(500).send({message: err.message})
        }) 
    }
}

export default ProductController