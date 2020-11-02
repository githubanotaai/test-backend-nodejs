const {Router} = require('express')
const controller = require('./controllers/productsController')

const routes = Router()

routes.post("/products", controller.createProduct)
routes.put("/products/:id", controller.updateProduct)
routes.get("/products", controller.listProducts)
routes.get("/products/:id", controller.findProduct)
routes.delete("/products/:id", controller.deleteProduct)

module.exports = {
  routes
};