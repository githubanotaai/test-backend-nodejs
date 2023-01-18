import express from 'express'
import CategoryController from '../controllers/category-controller.js'

const CategoryRouter = express.Router()

CategoryRouter
    .post('/categories', CategoryController.createCategory)
    .get('/categories', CategoryController.getCategories)
    .get('/categories/:id', CategoryController.getCategory)
    .put('/categories/:id', CategoryController.updateCategory)
    .delete('/categories/:id', CategoryController.deleteCategory)

export default CategoryRouter