const express = require('express');
const router = express.Router();

// Load Product model
const Product = require('../../models/Product');

// @route GET api/products/test
// @description tests products route
// @access Public
router.get('/test', (req, res) => res.send('product route testing!'));

// // @route GET api/products
// // @description Get all products
// // @access Public
// router.get('/', (req, res) => {
//     product.find()
//         .then(products => res.json(products))
//         .catch(err => res.status(404).json({ noproductsfound: 'No products found' }));
// });

// // @route GET api/products/:id
// // @description Get single product by id
// // @access Public
// router.get('/:id', (req, res) => {
//     product.findById(req.params.id)
//         .then(product => res.json(product))
//         .catch(err => res.status(404).json({ noproductfound: 'No product found' }));
// });

// // @route GET api/products
// // @description add/save product
// // @access Public
// router.post('/', (req, res) => {
//     product.create(req.body)
//         .then(product => res.json({ msg: 'product added successfully' }))
//         .catch(err => res.status(400).json({ error: 'Unable to add this product' }));
// });

// // @route GET api/products/:id
// // @description Update product
// // @access Public
// router.put('/:id', (req, res) => {
//     product.findByIdAndUpdate(req.params.id, req.body)
//         .then(product => res.json({ msg: 'Updated successfully' }))
//         .catch(err =>
//             res.status(400).json({ error: 'Unable to update the Database' })
//         );
// });

// // @route GET api/products/:id
// // @description Delete product by id
// // @access Public
// router.delete('/:id', (req, res) => {
//     product.findByIdAndRemove(req.params.id, req.body)
//         .then(product => res.json({ mgs: 'product entry deleted successfully' }))
//         .catch(err => res.status(404).json({ error: 'No such a product' }));
// });

// module.exports = router;/*


function getProducts(req, res) {
    //Query the DB and if no errors, send all the products
    let query = Product.find({});
    query.exec((err, products) => {
        if (err) res.send(err);
        //If no errors, send them back to the client
        res.json(products);
    });
}

/*
 * POST /book to save a new product.
 */
function postProduct(req, res) {
    //Creates a new book
    var newProduct = new Product(req.body);
    //Save it into the DB.
    newProduct.save((err, product) => {
        if (err) {
            res.send(err);
        } else { //If no errors, send it back to the client
            res.json({ message: "Product successfully added!", product });
        }
    });
}

/*
 * GET /product/:id route to retrieve a product given its id.
 */
function getProduct(req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err) res.send(err);
        //If no errors, send it back to the client
        res.json(product);
    });
}

/*
 * DELETE /product/:id to delete a product given its id.
 */
function deleteProduct(req, res) {
    Product.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Product successfully deleted!", result });
    });
}

/*
 * PUT /product/:id to updates a product given its id
 */
function updateProduct(req, res) {
    Product.findById({ _id: req.params.id }, (err, product) => {
        if (err) res.send(err);
        Object.assign(product, req.body).save((err, product) => {
            if (err) res.send(err);
            res.json({ message: 'Product updated!', product });
        });
    });
}

//export all the functions
module.exports = { getProducts, postProduct, getProduct, deleteProduct, updateProduct };