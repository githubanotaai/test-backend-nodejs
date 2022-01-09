const express = require('express');
const router = express.Router();
const productControls = require('../../controllers/productControllers');
const errHandler = require('../utils/errorHandler.js');



// @route GET api/products/test
// @description tests products route
// @access Public
router.get('/test', (req, res) => res.send('product route testing!'));

// @route GET api/products
// @description Get all products
// @access Public
router.get('/products/all', errHandler(productControls.getProducts));

// @route GET api/products/:id
// @description Get single product by id
// @access Public
router.get('/product/productId', errHandler(productControls.getProduct));

// @route GET api/products
// @description add/save product
// @access Public
router.post('/product/productId', errHandler(productControls.postProduct));

// @route GET api/products/:id
// @description Update product
// @access Public
router.put('/product/productId', errHandler(productControls.updateProduct));


// @route GET api/products/:id
// @description Delete product by id
// @access Public
router.delete('/product/productId', errHandler(productControls.deleteProduct));


module.exports = router;