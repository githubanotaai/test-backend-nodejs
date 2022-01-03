const express = require('express');
const router = express.Router();

// Load Product model
const Product = require('../../models/product');

// @route GET api/products/test
// @description tests products route
// @access Public
router.get('/test', (req, res) => res.send('product route testing!'));

// @route GET api/products
// @description Get all products
// @access Public
router.get('/', (req, res) => {
    product.find()
        .then(products => res.json(products))
        .catch(err => res.status(404).json({ noproductsfound: 'No products found' }));
});

// @route GET api/products/:id
// @description Get single product by id
// @access Public
router.get('/:id', (req, res) => {
    product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(404).json({ noproductfound: 'No product found' }));
});

// @route GET api/products
// @description add/save product
// @access Public
router.post('/', (req, res) => {
    product.create(req.body)
        .then(product => res.json({ msg: 'product added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this product' }));
});

// @route GET api/products/:id
// @description Update product
// @access Public
router.put('/:id', (req, res) => {
    product.findByIdAndUpdate(req.params.id, req.body)
        .then(product => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

// @route GET api/products/:id
// @description Delete product by id
// @access Public
router.delete('/:id', (req, res) => {
    product.findByIdAndRemove(req.params.id, req.body)
        .then(product => res.json({ mgs: 'product entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a product' }));
});

module.exports = router;