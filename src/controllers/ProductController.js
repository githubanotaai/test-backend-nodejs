import Product from '../models/Product';
import Category from '../models/Category';

class ProductController {
    async index(req, res){
        console.log("AAAA")
        const products = await Product.find();
        return res.json(products);
    }

    async show(req, res){
        const { id } = req.params;
        const product = await Product.findOne(id);

        if (!product) {
            return res.status(401).json({error: "Product not found!"})
        }

        return res.json(product);
    }

    async create(req, res){
        const { title, description, price, categoryId } = req.body;
        const created = new Date();
        const updated = new Date();
        
        const category = await Category.findById(categoryId);

        if (!category){
            return res.status(401).json({error: "Category not found!"})
        }

        const product = await Product.create({
            title,
            description,
            price,
            category,
            created,
            updated
        });

        return res.json(product);
    }
}

export default ProductController;