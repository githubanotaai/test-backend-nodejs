const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

const mongodbURI = 'mongodb+srv://andrei:andrei10@db-backend-test.v7lny.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongodbURI || 'mongodb://localhost/backend_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('banco de dados conectado');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan('tiny'));

app.use('/', routes);

app.listen(PORT, console.log(`rodando na porta ${PORT}`))