//import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

//load configuration from .env file
require('dotenv-flow').config();

// middleware defitions
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/artigo', require('./routes/artigo'));

// Handle CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//connect to the MongoDB using Mongoose ODM
const MONGO_OPTIONS = {
	authSource: 'admin',
	user: process.env.MONGO_USERNAME,
	pass: process.env.MONGO_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect (
  `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`, MONGO_OPTIONS
).catch(error => console.log("Error connecting to MongoDB: " + error));

mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

//routes definition
//Welcome route
app.get("/api/welcome", (req,res) => {
  res.status(200).send({message: "Welcome to the MEN-REST-API"});
}); 

//start up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("Server is running on port:  " + PORT);
});

module.exports = app;