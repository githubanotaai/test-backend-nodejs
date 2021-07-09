/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { getMongoRepository } from 'typeorm'
import { Product } from '../models/Product'

class ProductController {
  async index(req: Request, res: Response) {
    const productRepository = getMongoRepository(Product)
    const { cotegory, description } = req.query

    const queryParams: any = {}

    if (cotegory) queryParams.where = { cotegory: { $eq: cotegory } }
    if (description) queryParams.where = { description: { $eq: description }, ...queryParams.where }

    const allProducts = await productRepository.find(queryParams)

    res.status(200).json(allProducts)
  }

  async findById(req: Request, res: Response) {
    const productRepository = getMongoRepository(Product)

    const productId = req.params.id

    const productFindId = await productRepository.findOne(productId)

    if (!productFindId) {
      return res.sendStatus(404)
    }

    return res.status(200).json(productFindId)
  }

  async delete(req: Request, res: Response) {
    const productRepository = getMongoRepository(Product)

    const productId = req.params.id

    await productRepository.delete(productId)

    return res.status(204)
  }
}
export const productController = new ProductController()
