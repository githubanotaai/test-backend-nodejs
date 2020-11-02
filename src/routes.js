const {Router} = require('express')
const controller = require('./controllers/productsController')

const routes = Router()

routes.post("/products", controller.createProduct)

module.exports = {
  routes
};