import { Request, Response } from "express";
import { ProductService } from "../services";

export class ProductController {
    constructor(private productService: ProductService) {}

    //----------------------------------------------------------------
	// PRODUCT

    /**
     * Get products
     * 
     * @param req Request
     * @param res Response
     * @returns Promise
     */
    async getProducts(req: Request, res: Response) {
        const products = await this.productService.getProducts(req.query);
        return res.json(products);
    }

    /**
     * Register product
     * 
     * @param req Request
     * @param res Response
     * @returns Promise
     */
    async registerProduct(req: Request, res: Response) {
        const { title, description, price, categorys } = req.body;

        //validate
        let error = [];
		if (!title || typeof title !== 'string' || /^ *$/.test(title)) {
			error.push('Name Product invalid!');
		}
		if (!description || typeof description !== 'string' || /^ *$/.test(title)) {
			error.push('Description Product invalid!');
		}
		if (!price || typeof price !== 'number') {
			error.push('Price Product invalid!');
		}
		if (!categorys || typeof categorys !== 'object' || Object.keys(categorys).length === 0) {
			error.push('Categorys Product format invalid! Expected: array ids category');
		}
        if(error.length > 0) return res.status(422).json({ success: false, data: error });

        //get categorys by array ids
        const categorysComplete = await this.productService.getCategorysInIds(categorys);
		if (!categorysComplete) return null;

        //register
		const product = await this.productService.registerProduct({ title, description, price, categorys: categorysComplete});
        return res.json(product);
    }

    /**
     * Edit product
     * 
     * @param req Request
     * @param res Response
     * @returns Promise
     */
     async editProduct(req: Request, res: Response) {
        const { title, description, price, categorys } = req.body;

        //validate
        let error = [];
		if (!title || typeof title !== 'string' || /^ *$/.test(title)) {
			error.push('Name Product invalid!');
		}
		if (!description || typeof description !== 'string' || /^ *$/.test(title)) {
			error.push('Description Product invalid!');
		}
		if (!price || typeof price !== 'number') {
			error.push('Price Product invalid!');
		}
		if (!categorys || typeof categorys !== 'object' || Object.keys(categorys).length === 0) {
			error.push('Categorys Product format invalid! Expected: array ids category');
		}
        if(error.length > 0) return res.status(422).json({ success: false, data: error });

        //get categorys by array ids
        const categorysComplete = await this.productService.getCategorysInIds(categorys);
		if (!categorysComplete) return null;

        //edit 
		const product = await this.productService.editProduct(req.params.id, { title, description, price, categorys: categorysComplete});
        return res.json(product);
    }

    /**
     * Delete product
     * 
     * @param req Request
     * @param res Response
     * @returns Promise
     */
    async deleteProduct(req: Request, res: Response) {
        const result = await this.productService.deleteProduct(req.params.id);
        return res.json(result ? { success: true } : { success: false });
    }

    //----------------------------------------------------------------
	//CATEGORY PRODUCT

    /**
     * Get categorys product
     * 
     * @param req Request
     * @param res Response
     * @returns Promise
     */
    async getCategoryProduct(req: Request, res: Response) {
        const categoryProducts = await this.productService.getCategorys();
        return res.json(categoryProducts);
    }

    /**
     * Register category product
     * 
     * @param req Request
     * @param res Response
     * @returns Promise
     */
    async registerCategoryProduct(req: Request, res: Response) {
        const { title } = req.body;

        //validate
        let error = [];
        if (!title || typeof title !== 'string' || /^ *$/.test(title)) {
			error.push('Category invalid!');
		}
        if(error.length > 0) return res.status(422).json({ success: false, data: error });

        //validate category exists
        if (await this.productService.getCategoryByTitle(title)) {
            return res.status(400).json({ success: false });
        } 

        //register
		const category = await this.productService.registerCategory(title);
        return res.json(category);
    }
}