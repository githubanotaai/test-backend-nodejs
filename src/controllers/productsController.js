const {products} = require('../../models/products')



module.exports = {
  createProduct: async function (request, response){
    
    console.log(request.body)

    const {
      title,
      description,
      price,
      category
    } = request.body

    products.create({
      title,
      description,
      price,
      category
    })

    response.status(200)
  }

  
}

 