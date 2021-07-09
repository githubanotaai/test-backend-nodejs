import { Router } from 'express'

import { productController } from '../controllers/ProductController'

const router = Router()
router.get('/products/:id', productController.findById)
router.delete('/products/:id', productController.delete)
router.get('/products', productController.index)
router.post('/products', productController.create)

export default router
