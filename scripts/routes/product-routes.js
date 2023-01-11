import express from 'express'
import ProductController from './../controllers/product-controller.js'

const productRouter = express.Router()
    .get('/products', ProductController.getProducts)

