import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiJsonSchema from 'chai-json-schema'
import Product from '../models/product-model.js'

chai.use(chaiHttp)
chai.use(chaiJsonSchema)

const urlBase = 'http://localhost:3000'

describe('Product Router', () => {
    it('POST /products', done => {
        const product = { category: '63c179fef0992a4b3378dd8c', title: 'Fofura', description: 'Sabor pimenta', price: 4.00}

        chai.request(urlBase).post('/products').send(product).end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(201)
            chai.expect(response.body).to.include({ message: 'Successfully create product'})
        })
        
        done()
    })

    it('GET /products', done => {
        chai.request(urlBase).get('/products').end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(200)
            chai.expect(response.body).to.be.jsonSchema([Product])
        })

        done()
    })

    it('GET /products/:id', done => {
        const id = '63cfddd5c9ebca69f3fe1242'

        chai.request(urlBase).get(`/products/${id}`).end((err, response) => {
            chai.expect(err).to.be.null 
            chai.expect(response).to.have.status(200)
            chai.expect(response).to.be.jsonSchema(Product)
        })

        done()
    })

    it('GET /products/search', done => {
        chai.request(urlBase).get('/products/search').query({title: 'Coxinha'}).end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(200)
            chai.expect(response).to.be.jsonSchema(Product)
        })

        done()
    })

    if('GET /product/category/:id', done => {
        const id = '63c179fef0992a4b3378dd8c'            

        chai.request(urlBase).get(`products/category/${id}`).end((err, response) => {
          chai.expect(err).to.be.null
          chai.expect(response).to.have.status(200)
          chai.expect(response).to.be.jsonSchema(Product)  
        })

        done()
    })


    it('UPDATE /products/:id', done => {
        
        const id = '63cfddd5c9ebca69f3fe1242'
        const product = { category: '63c179fef0992a4b3378dd8c', title: 'Doritos', description: 'sabor primenta', price: 4.00}

        chai.request(urlBase).put(`/products/${id}`).send(product).end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(200)
            chai.expect(response).to.include({ message: 'Successfully update product' })

        })

        done()
    }) 

    it('DELETE /products/:id', done => {
        const id = '63cfd8955ca541cc45e67a64'
       
        chai.request(urlBase).delete(`/products/${id}`).end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(200)
            chai.expect(response).to.include({ message: 'Successfully delete product' })
        })

        done()
    })


})
