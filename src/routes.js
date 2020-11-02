const {Router} = require('express')

const routes = Router()

routes.get("/", (request, response) => {
  console.log('Teste')
  response.send("aaaaaaaaaaa")
})

module.exports = {
  routes
};