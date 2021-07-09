import { Router } from 'express'

import { productController } from '../controllers/ProductController'

const router = Router()
router.get('/products/:id', productController.findById)
router.delete('/products/:id', productController.delete)

export default router
