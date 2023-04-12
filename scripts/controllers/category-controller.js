import CategoryService from './../services/category-services.js'

class CategoryController {

    static createCategory = (require, response) => {

        CategoryService.createCategory(require)
        .then(success => {
            response.status(201).send({message:'Successfully create category'})
        })

        .catch(err => {
            response.status(500).send({ message: err.message})
        })
    }

    static getCategories = (require, response) => {

        CategoryService.getCategories()
        .then(categories => {
            response.status(200).send(categories)
        })

        .catch(err => {
            response.status(400).send({ message: err.message })
        })
    }

    static getCategory = (require, response) => {

        CategoryService.getCategory(require)
        .then(category => {
            response.status(200).send(category)
        })

        .catch(err => {
            response.status(400).send({ message: err.message })
        })

    }

    static updateCategory = (require, response) => {

        CategoryService.updateCategory(require)
        .then(success => {
            response.status(200).send({ message: "Successfully update category" })
        })

        .catch(err => {
            response.status(500).send({message: err.message})
        })
    }

    static deleteCategory = (require, response) => {
        CategoryService.deleteCategory(require)
        .then(success => {
            response.status(200).send({message: "Successfully delete category"})
        })

        .catch(err => {
            response.status(500).send({message: err.message})
        })
    }
}

export default CategoryController