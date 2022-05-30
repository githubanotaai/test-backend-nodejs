import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DatabaseConnection } from 'src/configurations/DatabaseConfiguration'
import { ProductModule } from 'src/modules/ProductModule'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'

let app: INestApplication
const jestLogger = console.log
console.log = () => {}
let futureId: number

describe('Product test suite', () => {
  beforeAll(async () => {
    jest.setTimeout(30000)
    const testModule = await Test.createTestingModule({ imports: [DatabaseConnection, ProductModule] }).compile()
    app = testModule.createNestApplication()

    await app.init()
  })

  describe('Base', () => {
    it('App is defined - Success', () => {
      return expect(app).toBeDefined()
    })
  })

  describe('Create', () => {
    it('Succesfully created product', async (done) => {
      const response = await request
        .agent(app.getHttpServer())
        .post('/products')
        .send({
          data: {
            title: `New title ${uuidv4()}`,
            price: '150.50',
            categoryId: 1,
          },
        })
        .expect(201)
      expect(response.body.data).toBeDefined()
      expect(response.body.statusCode).toBe(201)
      futureId = response.body.data.id
      done()
    })

    it('Joi failure to create product', async (done) => {
      const response = await request
        .agent(app.getHttpServer())
        .post('/products')
        .send({
          data: {
            price: '150.50',
            categoryId: 1,
          },
        })
        .expect(400)
      expect(response.body.reasons).toBeDefined()
      expect(response.body.statusCode).toBe(400)
      done()
    })
  })

  describe('Update', () => {
    it('Succesfully updated product', async (done) => {
      const response = await request
        .agent(app.getHttpServer())
        .put('/products')
        .send({
          data: {
            id: futureId,
            title: `New title ${uuidv4()}`,
            price: '150.50',
            categoryId: 1,
          },
        })
        .expect(200)
      expect(response.body.data).toBeDefined()
      expect(response.body.statusCode).toBe(200)

      done()
    })

    it('Succesfully updated product (partial)', async (done) => {
      const response = await request
        .agent(app.getHttpServer())
        .put('/products')
        .send({
          data: {
            id: futureId,
            categoryId: 1,
          },
        })
        .expect(200)
      expect(response.body.data).toBeDefined()
      expect(response.body.statusCode).toBe(200)
      done()
    })

    it('Joi failure to update product', async (done) => {
      const response = await request
        .agent(app.getHttpServer())
        .post('/products')
        .send({
          data: {
            id: futureId,
            price: 'abc',
            categoryId: 1,
          },
        })
        .expect(400)
      expect(response.body.reasons).toBeDefined()
      expect(response.body.statusCode).toBe(400)
      done()
    })
  })

  describe('Delete', () => {
    it('Succesfully deleted product', async (done) => {
      const response = await request
        .agent(app.getHttpServer())
        .delete('/products')
        .send({
          data: {
            id: futureId,
          },
        })
        .expect(200)
      expect(response.body.data).toBeDefined()
      expect(response.body.statusCode).toBe(200)

      done()
    })

    it('Failed to delete already removed product', async (done) => {
      const response = await request
        .agent(app.getHttpServer())
        .delete('/products')
        .send({
          data: {
            id: futureId,
          },
        })
        .expect(400)
      expect(response.body.reasons).toBeDefined()
      expect(response.body.statusCode).toBe(400)
      done()
    })
  })

  describe('List', () => {
    it('Succesfully listed products', async (done) => {
      const response = await request.agent(app.getHttpServer()).get('/products/list').expect(200)
      expect(response.body.data).toBeDefined()
      expect(response.body.statusCode).toBe(200)

      done()
    })

    it('Failed to list products', async (done) => {
      const response = await request.agent(app.getHttpServer()).get('/products/list').query({ page: 'b', pageSize: 20 }).expect(400)
      expect(response.body.reasons).toBeDefined()
      expect(response.body.statusCode).toBe(400)
      done()
    })
  })
})
