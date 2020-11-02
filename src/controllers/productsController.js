const {products} = require('../../models/products')



module.exports = {
  async createProduct (request, response){
    
    console.log(request.body)

    const {
      title,
      description,
      price,
      category
    } = request.body

    await products.create({
      title,
      description,
      price,
      category
    }).then( product => {
      product ? response.send(product) : response.status(400)
                
    })
    
  },

  async listProducts (request, response) {
    const conditions = {}
    const querys = request.query

    querys.title && (conditions.title = querys.title)
    querys.category && (conditions.category = querys.category)

    console.log(conditions)


    await products.findAll({
      where: conditions
    })
      .then(productInstance => JSON.stringify(productInstance, null, 2))
      .then(productList => response.send(productList))
      .catch(error => {
        response.status(500)
        response.send(error)
        console.log(error)
      })
    
  },

  async findProduct (request, response){
    const { id } = request.params;

    await products.findAll({
      where: {
        id
      }
    })
      .then(product => response.send(product))
  },

  async deleteProduct (request, response){
    const { id } = request.params;

    const product = await products.findAll({
      where: {
        id
      }
    })

    await products.destroy({
      where: {
        id
      }
    })
      .then(() => response.send(product))
      .catch(error => {
        response.send(error)
        response.status(500)
      })

  },

  async updateProduct (request, response){
    const productUpdates = request.body
    const { id } = request.params;

    await products.update(productUpdates, {
      where: {
        id
      }
    })
      .then(() => response.status(200))
      .catch(error => {
        response.send(error)
        response.status(500)
      })

    response.send("ok")

      
  }

  
  
  
}

 