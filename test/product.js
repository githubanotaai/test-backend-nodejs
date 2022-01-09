//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


let mongoose = require("mongoose");


let Product = require('../models/Product');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let routes = require('./routes/api/products');
let should = chai.should();

mongoose.connect();


chai.use(chaiHttp);
//Our parent block
describe('Products', () => {
    beforeEach((done) => { //Before each test we empty the database
        Product.remove({}, (err) => {
            done();
        });
    });
    /*
     * Test the /GET route
     */
    describe('/GET product', () => {
        it('it should GET all the products', (done) => {
            chai.request(app)
                .get('/product')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});
/*
 * Test the /POST route
 */
describe('/POST product', () => {
    it('it should not POST a product without description field', (done) => {
        let product = {
            name: "Pizza",
            quantity: 3,
            price: 1954,
            description: "Tasty and Delicious",
            date_added: 2021,
            vendor: "Pizza Inn",
            updated_date: 2022

        }
        chai.request(app)
            .post('/product')
            .send(product)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('description');
                res.body.errors.pages.should.have.property('kind').eql('required');
                done();
            });
    });

});