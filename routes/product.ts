import { Router } from "express";
import { ProductController } from "../controllers";
import { ProductService } from "../services";

const routes = Router();
const productController = new ProductController(new ProductService());

// CategoryProduct
routes.post('/product/category', async (req, res) => productController.registerCategoryProduct(req, res));
routes.get('/product/category', async (req, res) => productController.getCategoryProduct(req, res));

// Product
routes.post('/product', async (req, res) => productController.registerProduct(req, res));
routes.get('/product', async (req, res) => productController.getProducts(req, res));
routes.put('/product/:id', async (req, res) => productController.editProduct(req, res));
routes.delete('/product/:id', async (req, res) => productController.deleteProduct(req, res));

export { routes as productRoute };