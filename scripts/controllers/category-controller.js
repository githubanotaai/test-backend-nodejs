import Category from './../models/category-model.js'

class CategoryController {

    static createCategory = (require, response) => {
        const category = new Category(require.body)

        category.save(err => {
            if (!err) {
                response.status(201).send('Successfully create category')
            }

            else {
                response.status(500).send({ message: err.message })
            }
        })
    }

    static getCategories = (require, response) => {
        Category.find((err, categories) => {
                if (!err) {
                    response.status(200).send(categories)
                }

                else {
                    response.status(400).send({ message: err.message })
                }
            })
    }

    static getCategory = (require, response) => {
        const id = require.params.id

        Category.findById(id, (err, category) => {
            if (!err) {
                response.status(200).send(category)
            }

            else {
                response.status(400).send({ message: err.message })
            }
        })

    }

    static updateCategory = (require, response) => {
        const id = require.params.id

        Category.findByIdAndUpdate(id, { $set: require.body }, err => {
            if (!err) {
                response.status(200).send({ message: 'Successfully update category' })
            }

            else {
                response.status(500).send({ message: err.message })
            }
        })
    }

    static deleteCategory = (require, response) => {
        const id = require.params.id

        Category.findByIdAndDelete(id, err => {

            if (!err) {
                response.status(200).send({ message: 'Successfully delete category' })
            }

            else {
                response.status(500).send({ messagea: err.message })
            }
        })
    }
}

export default CategoryController