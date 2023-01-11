import express from 'express'
import productRouter from './product-router.js'
import categoryRouter from './category-router.js'

const routes = app => {
    app.route('/').get((req, res) => {
        res.status(200).send({message: 'Lets bora!'})
    })

    app
        .use(express.json())
        .use(productRouter)
        .use(categoryRouter)
}

export { routes }