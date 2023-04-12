import Category from './../models/category-model.js'

class CategoryService {
    static createCategory = require => {
        return new Category(require.body).save()
    }
   
    static getCategories = () => {
        return Category.find().lean()
    }

    static getCategory = require => {
        return Category.findById(require.params.id).lean()
    }

    static updateCategory = require => {
        return Category.findByIdAndUpdate(require.params.id, {$set: require.body})
    }

    static deleteCategory = require => {
        return Category.findByIdAndDelete(require.params.id)
    }
}

export default CategoryService