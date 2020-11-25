const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const mongodbURI = 'mongodb+srv://andrei:andrei10@db-backend-test.v7lny.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongodbURI || 'mongodb://localhost/backend_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('banco de dados conectado');
});

//schema
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    category: String  
});

//model
const Product = mongoose.model('Product', ProductSchema);

//saving data to our mongoDB
const data = {
    title: 'motocicleta',
    description: 'anda sobre duas rodas',
    price: 1200,
    category: 'veiculos'
};

// .save()
const NewProduct = new Product(data);

// NewProduct.save(error => {
//     if (error) {
//         console.log('deu erro');
//     } else {
//         console.log('deu certo');
//     }
// });

// HTTP request logger
app.use(morgan('tiny'));

//routers
app.get('/api', (req, res) => {

    Product.find({})
        .then(data => {
            console.log('Data: ', data);
        })
        .catch(error => {
            console.log('Error: ', error)
        });
    res.json(data)
});

// app.get('/api/name', (req, res) => {
//     const data = {
//         username: "carol majadinha",
//         age: 5,
        
//     }
    
//     res.json(data)
// })

app.listen(PORT, console.log(`rodando na porta ${PORT}`))