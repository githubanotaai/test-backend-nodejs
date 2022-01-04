//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


let mongoose = require("mongoose");


let Product = require('../models/Product');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
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