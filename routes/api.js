const { Router } = require('express');
const express = require('express')

const router = express.Router();

const Product = require('../models/product');

//routers
router.get('/api', (req, res) => {

    Product.find({})
        .then(data => {
            console.log('Data: ', data);
            res.json(data)
        })
        .catch(error => {
            console.log('Error: ', error)
        });
});

router.post('/create', (req, res) => {
    const NewProduct = new Product(req.body);
    console.log(req.body)
    NewProduct.save(error => {
        if (error) {
            res.status('400').send(error);
            console.log('deu erro');
        } else {
            res.status('201').send('cadastro finalizado com sucesso!');
            console.log('deu certo');
        }
    });
})

module.exports = router;


//saving data to our mongoDB
//const data = {
//     title: 'motocicleta',
//     description: 'anda sobre duas rodas',
//     price: 1200,
//     category: 'veiculos'
// };

