import Category from '../models/Category';

class CategoryController {
    async index(req, res){
        const categories = await Category.find();
        return res.json(categories);
    }

    async show(req, res){
        const { id } = req.params;

        console.log(id);

        const category = await Category.findById(id);

        console.log(category);

        if (!category) {
            return res.status(401).json({error: "Category not found!"})
        }

        return res.json(category);
    }

    async create(req, res){
        const { title } = req.body;
        const created = new Date();
        const updated = new Date(); 

        const category = await Category.create({
            title,
            created,
            updated
        });

        return res.json(category);

    }
}

export default CategoryController;