// app.js

const express = require('express');
const connectDB = require('./config/db');

const app = express();

//db options
let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

// Connect Database
connectDB();


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app; // for testing