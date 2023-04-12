import express from 'express'
import productRouter from './product-router.js'
import categoryRouter from './category-router.js'

import swaggerUI from 'swagger-ui-express'
import swaggerJson from './../swagger.json' assert { type: "json" }

const routes = app => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: 'Lets bora!'})
    })

    app
        .use(express.json())
        .use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson))
        .use(productRouter, categoryRouter)
}

export { routes }