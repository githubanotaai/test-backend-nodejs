const { Router } = require('express');
const express = require('express')

const router = express.Router();

const Product = require('../models/product');

//routers
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

router.get('/list', (req, res) => {

    Product.find({})
        .then(data => {
            console.log('Data: ', data);
            res.json(data)
        })
        .catch(error => {
            console.log('Error: ', error)
        });
});

router.post('/edit/:id', (req, res) => {
    console.log("req", req.body)
    Product.findOne({_id:req.params.id})
    .then(data => {
        console.log('Data: ', data);
        data.title = req.body.title;
        data.description = req.body.description;
        data.price = req.body.price;
        data.category = req.body.category;
        data.save();
        res.json(data);
    })
    .catch(error => {
        console.log('Error: ', error)
        res.json(error);
    });
})

router.delete('/delete/:id', (req, res) => {
    console.log("req", req.body)
    Product.deleteOne({_id:req.params.id})
    .then(data => {
        res.json('produto excluido com sucesso!');
    })
    .catch(error => {
        console.log('Error: ', error)
        res.json(error);
    });
})

router.get('/searchName/:title', (req, res) => {

    Product.find({title:req.params.title})
        .then(data => {
            console.log('Data: ', data);
            res.json(data)
        })
        .catch(error => {
            console.log('Error: ', error)
        });
});

module.exports = router;

//saving data to our mongoDB
//const data = {
//     title: 'motocicleta',
//     description: 'anda sobre duas rodas',
//     price: 1200,
//     category: 'veiculos'
// };

