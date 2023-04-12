import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiJsonSchema from 'chai-json-schema'
import Category from '../models/category-model.js'

chai.use(chaiHttp)
chai.use(chaiJsonSchema)

const urlBase = 'http://localhost:3000'

describe('Category Router',  () => {
    it('POST /categories', done => {
        const category = {title: 'Doces'}

        chai.request(urlBase).post('/categories').send(category).end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(201)
            chai.expect(response.body).to.include({ message: 'Successfully create category'}) 
        })

        done()
    })

    it('GET /categories', done => {
        chai.request(urlBase).get('/categories').end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(200)
            chai.expect(response.body).to.be.jsonSchema([Category])
        })

        done()
    })
    
    it('GET /categories/:id', done => {
        const category = '63c179fef0992a4b3378dd8c'

        chai.request(urlBase).get(`/categories/${category}`).end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(200)
            chai.expect(response.body).to.be.jsonSchema(Category)
        })
        done()
    })

    it('UPDATE /categories/:id', done => {
        const category = '63c179fef0992a4b3378dd8c'

        chai.request(urlBase).put(`/categories/${category}`).send({title: "Salgadinhos"}).end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(200)
            chai.expect(response.body).to.include({message: 'Successfully update category'})
        })
        done()
    })

    it('REMOVE /categories:id', done => {
        const category = '63caac82a5ea9dfa1387524a'

        chai.request(urlBase).delete(`/categories/${category}`).end((err, response) => {
            chai.expect(err).to.be.null
            chai.expect(response).to.have.status(200)
            chai.expect(response.body).to.include({message: 'Successfully delete category'})
        }) 
        done()
    })
})
