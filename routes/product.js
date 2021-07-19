const express = require('express');
const router = express.Router();

const ProductController = require('../controller/product_controller');

//Get a list of all products
router.get('/', ProductController.getAllProducts);

//Create a new product
router.post('/', ProductController.createNewProduct);

//Get a product by id
router.get('/:id', ProductController.findProductById);

//Update a product by id
router.patch('/:id', ProductController.updateAProduct);

//Delete a product by id
router.delete('/:id', ProductController.deleteAProduct);

module.exports = router;