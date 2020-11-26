import Product from '../models/Product';
import Category from '../models/Category';

class ProductController {
    async index(req, res){
        const products = await Product.find();
        return res.json(products);
    }

    async show(req, res){
        const { title } = req.params;
        const product = await Product.findOne({title});

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


    async update(req, res) {
        const { productId } = req.params;
        const {
          title,
          description,
          price,
          categoryId,
        } = req.body;
        
        const category = await Category.findById(categoryId);
        const product = await Product.findById(productId);
        
        if (!category){
            return res.status(401).json({error: "Category not found!"})
        }
        
        if(!product){
            return res.status(401).json({error: "Product not found!"})
        }
        
        console.log(product);
        console.log(category);

        const updated = Date.now();
        
        const productUpdated = await Product.updateOne(
          { _id: productId },
          {title,
          description,
          price,
          categoryId,
          updated
          }
        );
    
        return res.send(productUpdated);
      }


      async delete(req, res) {
        const { productId } = req.params;

        try{
            await Product.findByIdAndDelete(productId);
            return res.json({ message: 'Product exclude successful' });

        }catch(err){
            return res.status(400).json({ message: err });

        }
      }

      async showByCategory(req, res) {
        const {categoryId} = req.params;
        const category = Category.findById({id: categoryId});

        if (!category){
            return res.status(401).json({error: "Category not found!"})
        }

        const products = await Product.find({category: categoryId}).populate('category');
        return res.json(products);
      }

}

export default ProductController;