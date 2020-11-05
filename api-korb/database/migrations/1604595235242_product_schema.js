'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.timestamps()
      table.string('title', 50).notNullable()
      table.string('description', 200)
      table.float('price').unsigned().notNullable()
      table.string('category', 50).notNullable()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
