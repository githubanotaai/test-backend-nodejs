// app.js

const express = require('express');
const connectDB = require('./config/db');
let config = require('config');
const routes = require('./routes/api/products');


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
const productRoutes = require('./routers/api/product.js');
app.use(productRoutes)


// Handle errors.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app; // for testing