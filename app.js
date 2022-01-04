// app.js

const express = require('express');
const connectDB = require('./config/db');
let product = require('./routes/api/products');
let config = require('config');

const app = express();

//db options
let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

// Connect Database
connectDB();

// app.get('/', (req, res) => res.send('Hello world!'));
app.get("/", (req, res) => res.json({ message: "Welcome to our restaurant!" }));


app.route("/product")
    .get(product.getProducts)
    .post(product.postProduct);
app.route("/product/:id")
    .get(product.getProduct)
    .delete(product.deleteProduct)
    .put(product.updateProduct);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app; // for testing